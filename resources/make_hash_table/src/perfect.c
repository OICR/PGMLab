/*
------------------------------------------------------------------------------
perfect.c: code to generate code for a hash for perfect hashing.
(c) Bob Jenkins, September 1996, December 1999
You may use this code in any way you wish, and it is free.  No warranty.
I hereby place this in the public domain.
Source is http://burtleburtle.net/bob/c/perfect.c

This generates a minimal perfect hash function.  That means, given a
set of n keys, this determines a hash function that maps each of
those keys into a value in 0..n-1 with no collisions.

The perfect hash function first uses a normal hash function on the key
to determine (a,b) such that the pair (a,b) is distinct for all
keys, then it computes a^scramble[tab[b]] to get the final perfect hash.
tab[] is an array of 1-byte values and scramble[] is a 256-term array of 
2-byte or 4-byte values.  If there are n keys, the length of tab[] is a 
power of two between n/3 and n.

I found the idea of computing distinct (a,b) values in "Practical minimal 
perfect hash functions for large databases", Fox, Heath, Chen, and Daoud, 
Communications of the ACM, January 1992.  They found the idea in Chichelli 
(CACM Jan 1980).  Beyond that, our methods differ.

The key is hashed to a pair (a,b) where a in 0..*alen*-1 and b in
0..*blen*-1.  A fast hash function determines both a and b
simultaneously.  Any decent hash function is likely to produce
hashes so that (a,b) is distinct for all pairs.  I try the hash
using different values of *salt* until all pairs are distinct.

The final hash is (a XOR scramble[tab[b]]).  *scramble* is a
predetermined mapping of 0..255 into 0..smax-1.  *tab* is an
array that we fill in in such a way as to make the hash perfect.

First we fill in all values of *tab* that are used by more than one
key.  We try all possible values for each position until one works.

This leaves m unmapped keys and m values that something could hash to.
If you treat unmapped keys as lefthand nodes and unused hash values
as righthand nodes, and draw a line connecting each key to each hash
value it could map to, you get a bipartite graph.  We attempt to
find a perfect matching in this graph.  If we succeed, we have
determined a perfect hash for the whole set of keys.

*scramble* is used because (a^tab[i]) clusters keys around *a*.
------------------------------------------------------------------------------
*/

#include "lookupa.h"
#include "recycle.h"
#include "perfect.h"

#ifndef _MSC_VER
#include "inttypes.h" /* For PRI format specifiers */
#endif
#include "stdio.h"    /* For FILE, fopen() */
#include "stdlib.h"   /* For exit(), EXIT_SUCCESS */
#include "string.h"   /* For strlen(), memset() */

/*
------------------------------------------------------------------------------
Find the mapping that will produce a perfect hash
------------------------------------------------------------------------------
*/

/* return the ceiling of the log (base 2) of val */
uint32_t  mylog2(val)
uint32_t  val;
{
  uint32_t i;
  for (i=0; ((uint32_t)1<<i) < val; ++i)
    ;
  return i;
}

/* compute p(x), where p is a permutation of 0..(1<<nbits)-1 */
/* permute(0)=0.  This is intended and useful. */
static uint32_t  permute(x, nbits)
uint32_t x;                                       /* input, a value in some range */
uint32_t nbits;                                 /* input, number of bits in range */
{
  int i;
  int mask   = ((uint32_t)1<<nbits)-1;                                /* all ones */
  int const2 = 1+nbits/2;
  int const3 = 1+nbits/3;
  int const4 = 1+nbits/4;
  int const5 = 1+nbits/5;
  for (i=0; i<20; ++i)
  {
    x = (x+(x<<const2)) & mask; 
    x = (x^(x>>const3));
    x = (x+(x<<const4)) & mask;
    x = (x^(x>>const5));
  }
  return x;
}

/* initialize scramble[] with distinct random values in 0..smax-1 */
static void scrambleinit(scramble, smax)
uint32_t      *scramble;                            /* hash is a^scramble[tab[b]] */
uint32_t       smax;                    /* scramble values should be in 0..smax-1 */
{
  uint32_t i;

  /* fill scramble[] with distinct random integers in 0..smax-1 */
  for (i=0; i<SCRAMBLE_LEN; ++i)
  {
    scramble[i] = permute(i, mylog2(smax));
  }
}

/* 
 * Check if key1 and key2 are the same. 
 * We already checked (a,b) are the same.
 */
static void checkdup(key1, key2, form)
key      *key1;
key      *key2;
hashform *form;
{
  switch(form->hashtype)
  {
  case STRING_HT:
    if ((key1->len_k == key2->len_k) &&
	!memcmp(key1->name_k, key2->name_k, (size_t)key1->len_k))
    {
      fprintf(stderr, "perfect.c: Duplicates keys!  %.*s\n",
	      key1->len_k, key1->name_k);
      exit(EXIT_FAILURE);
    }
    break;
  case INT_HT:
    if (key1->hash_k == key2->hash_k)
    {
      fprintf(stderr, "perfect.c: Duplicate keys!  %.8" PRIx32 "\n", key1->hash_k);
      exit(EXIT_FAILURE);
    }
    break;
  case AB_HT:
    fprintf(stderr, "perfect.c: Duplicate keys!  %.8" PRIx32 " %.8" PRIx32 "\n",
	    key1->a_k, key1->b_k);
    exit(EXIT_FAILURE);
    break;
  default:
    fprintf(stderr, "perfect.c: Illegal hash type %" PRId32 "\n", (uint32_t)form->hashtype);
    exit(EXIT_FAILURE);
    break;
  }
}


/* 
 * put keys in tabb according to key->b_k
 * check if the initial hash might work 
 */
static int inittab(tabb, blen, keys, form, complete)
bstuff   *tabb;                     /* output, list of keys with b for (a,b) */
uint32_t       blen;                                            /* length of tabb */
key      *keys;                               /* list of keys already hashed */
hashform *form;                                           /* user directives */
int       complete;        /* TRUE means to complete init despite collisions */
{
  int  nocollision = TRUE;
  key *mykey;

  memset((void *)tabb, 0, (size_t)(sizeof(bstuff)*blen));

  /* Two keys with the same (a,b) guarantees a collision */
  for (mykey=keys; mykey; mykey=mykey->next_k)
  {
    key *otherkey;

    for (otherkey=tabb[mykey->b_k].list_b; 
         otherkey; 
         otherkey=otherkey->nextb_k)
    {
      if (mykey->a_k == otherkey->a_k)
      {
        nocollision = FALSE;
        checkdup(mykey, otherkey, form);
        if (!complete)
          return FALSE;
      }
    }
    ++tabb[mykey->b_k].listlen_b;
    mykey->nextb_k = tabb[mykey->b_k].list_b;
    tabb[mykey->b_k].list_b = mykey;
  }

  /* no two keys have the same (a,b) pair */
  return nocollision;
}


/* Do the initial hash for normal mode (use lookup and checksum) */
static void initnorm(keys, alen, blen, smax, salt, final, form)
key      *keys;                                          /* list of all keys */
uint32_t       alen;                    /* (a,b) has a in 0..alen-1, a power of 2 */
uint32_t       blen;                    /* (a,b) has b in 0..blen-1, a power of 2 */
uint32_t       smax;                   /* maximum range of computable hash values */
uint32_t       salt;                     /* used to initialize the hash function */
gencode  *final;                          /* output, code for the final hash */
hashform *form;
{
  key *mykey;
  if (mylog2(alen)+mylog2(blen) > UINT32_BITS)
  {
    uint32_t initlev = salt*0x9e3779b9;  /* the golden ratio; an arbitrary value */

    for (mykey=keys; mykey; mykey=mykey->next_k)
    {
      uint32_t i, state[CHECKSTATE];
      for (i=0; i<CHECKSTATE; ++i) state[i] = initlev;
      checksum( mykey->name_k, mykey->len_k, state);
      mykey->a_k = state[0]&(alen-1);
      mykey->b_k = state[1]&(blen-1);
    }
    final->used = 4;
    sprintf(final->line[0], 
            "  uint32_t i,state[CHECKSTATE],rsl;\n");
    sprintf(final->line[1], 
            "  for (i=0; i<CHECKSTATE; ++i) state[i]=0x%" PRIx32 ";\n",initlev);
    sprintf(final->line[2],
            "  checksum(key, len, state);\n");
    sprintf(final->line[3], 
            "  rsl = ((state[0]&0x%x)^scramble[tab[state[1]&0x%x]]);\n",
            alen-1, blen-1);
  }
  else
  {
    uint32_t loga = mylog2(alen);                            /* log based 2 of blen */
    uint32_t initlev = salt*0x9e3779b9;  /* the golden ratio; an arbitrary value */

    for (mykey=keys; mykey; mykey=mykey->next_k)
    {
      uint32_t hash = lookup(mykey->name_k, mykey->len_k, initlev);
      mykey->a_k = (loga > 0) ? hash>>(UINT32_BITS-loga) : 0;
      mykey->b_k = (blen > 1) ? hash&(blen-1) : 0;
    }
    final->used = 2;
    sprintf(final->line[0], 
	    "  uint32_t rsl, val = lookup(key, len, 0x%" PRIx32 ");\n", initlev);
    if (smax <= 1)
    {
      sprintf(final->line[1], "  rsl = 0;\n");
    }
    else if (mylog2(alen) == 0)
    {
      sprintf(final->line[1], "  rsl = tab[val&0x%x];\n", blen-1);
    }
    else if (blen < USE_SCRAMBLE)
    {
      sprintf(final->line[1], "  rsl = ((val>>%" PRId32 ") ^ tab[val&0x%x]);\n",
	      UINT32_BITS-mylog2(alen), blen-1);
    }
    else
    {
      sprintf(final->line[1], "  rsl = ((val>>%" PRId32 ")^scramble[tab[val&0x%x]]);\n",
	      UINT32_BITS-mylog2(alen), blen-1);
    }
  }
}



/* Do initial hash for inline mode */
static void initinl(keys, alen, blen, smax, salt, final, form)
key      *keys;                                          /* list of all keys */
uint32_t       alen;                    /* (a,b) has a in 0..alen-1, a power of 2 */
uint32_t       blen;                    /* (a,b) has b in 0..blen-1, a power of 2 */
uint32_t       smax;                           /* range of computable hash values */
uint32_t       salt;                     /* used to initialize the hash function */
gencode  *final;                            /* generated code for final hash */
hashform *form;                             /* user-provided options */
{
  key *mykey;
  uint32_t  amask = alen-1;
  uint32_t  blog  = mylog2(blen);
  uint32_t  initval = salt*0x9e3779b9;    /* the golden ratio; an arbitrary value */

  /* It's more important to have b uniform than a, so b is the low bits */
  for (mykey = keys;  mykey != (key *)0;  mykey = mykey->next_k)
  {
    uint32_t   hash = initval;
    uint32_t   i;
    for (i=0; i<mykey->len_k; ++i)
    {
      hash = (mykey->name_k[i] ^ hash) + ((hash<<(UINT32_BITS-6))+(hash>>6));
    }
    mykey->hash_k = hash;
    mykey->a_k = (alen > 1) ? (hash & amask) : 0;
    mykey->b_k = (blen > 1) ? (hash >> (UINT32_BITS-blog)) : 0;
  }
  final->used = 1;
  if (smax <= 1)
  {
    sprintf(final->line[0], "  uint32_t rsl = 0;\n");
  }
  else if (blen < USE_SCRAMBLE)
  {
    sprintf(final->line[0], "  uint32_t rsl = ((val & 0x%" PRIx32 ") ^ tab[val >> %" PRIx32 "]);\n",
            amask, UINT32_BITS-blog);
  }
  else
  {
    sprintf(final->line[0], "  uint32_t rsl = ((val & 0x%" PRIx32 ") ^ scramble[tab[val >> %" PRIx32 "]]);\n",
            amask, UINT32_BITS-blog);
  }
}


/* 
 * Run a hash function on the key to get a and b 
 * Returns:
 *   0: didn't find distinct (a,b) for all keys
 *   1: found distinct (a,b) for all keys, put keys in tabb[]
 *   2: found a perfect hash, no need to do any more work
 */
static uint32_t initkey(keys, nkeys, tabb, alen, blen, smax, salt, form, final)
key      *keys;                                          /* list of all keys */
uint32_t       nkeys;                                     /* total number of keys */
bstuff   *tabb;                                        /* stuff indexed by b */
uint32_t       alen;                    /* (a,b) has a in 0..alen-1, a power of 2 */
uint32_t       blen;                    /* (a,b) has b in 0..blen-1, a power of 2 */
uint32_t       smax;                           /* range of computable hash values */
uint32_t       salt;                     /* used to initialize the hash function */
hashform *form;                                           /* user directives */
gencode  *final;                                      /* code for final hash */
{
  uint32_t finished;

  /* Do the initial hash of the keys */
  switch(form->mode)
  {
  case NORMAL_HM:
    initnorm(keys, alen, blen, smax, salt, final, form);
    break;
  case INLINE_HM:
    initinl(keys, alen, blen, smax, salt, final, form);
    break;
  case HEX_HM:
  case DECIMAL_HM:
    finished = inithex(keys, nkeys, alen, blen, smax, salt, final, form); 
    if (finished) return 2;
    break;
  default:
    fprintf(stderr, "fatal error: illegal mode\n"); 
    exit(1);
  }

  if (nkeys <= 1)
  {
    final->used = 1;
    sprintf(final->line[0], "  uint32_t rsl = 0;\n");
    return 2;
  }

  return inittab(tabb, blen, keys, form, FALSE);
}
 

/* Print an error message and exit if there are duplicates */
static void duplicates(tabb, blen, keys, form)
bstuff   *tabb;                    /* array of lists of keys with the same b */
uint32_t       blen;                              /* length of tabb, a power of 2 */
key      *keys;
hashform *form;                                           /* user directives */
{
  uint32_t  i;
  key *key1;
  key *key2;

  (void)inittab(tabb, blen, keys, form, TRUE);

  /* for each b, do nested loops through key list looking for duplicates */
  for (i=0; i<blen; ++i)
    for (key1=tabb[i].list_b; key1; key1=key1->nextb_k)
      for (key2=key1->nextb_k; key2; key2=key2->nextb_k)
        checkdup(key1, key2, form);
}


/* Try to apply an augmenting list */
static int apply(tabb, tabh, tabq, blen, scramble, tail, rollback)
bstuff *tabb;
hstuff *tabh;
qstuff *tabq;
uint32_t     blen;
uint32_t    *scramble;
uint32_t     tail;
int     rollback;          /* FALSE applies augmenting path, TRUE rolls back */
{
  uint32_t     hash;
  key    *mykey;
  bstuff *pb;
  uint32_t     child;
  uint32_t     parent;
  uint32_t     stabb;                                         /* scramble[tab[b]] */

  /* walk from child to parent */
  for (child=tail-1; child; child=parent)
  {
    parent = tabq[child].parent_q;                    /* find child's parent */
    pb     = tabq[parent].b_q;             /* find parent's list of siblings */

    /* erase old hash values */
    stabb = scramble[pb->val_b];
    for (mykey=pb->list_b; mykey; mykey=mykey->nextb_k)
    {
      hash = mykey->a_k^stabb;
      if (mykey == tabh[hash].key_h)
      {                            /* erase hash for all of child's siblings */
	tabh[hash].key_h = (key *)0;
      }
    }

    /* change pb->val_b, which will change the hashes of all parent siblings */
    pb->val_b = (rollback ? tabq[child].oldval_q : tabq[child].newval_q);

    /* set new hash values */
    stabb = scramble[pb->val_b];
    for (mykey=pb->list_b; mykey; mykey=mykey->nextb_k)
    {
      hash = mykey->a_k^stabb;
      if (rollback)
      {
	if (parent == 0) continue;                  /* root never had a hash */
      }
      else if (tabh[hash].key_h)
      {
	/* very rare: roll back any changes */
	(void)apply(tabb, tabh, tabq, blen, scramble, tail, TRUE);
	return FALSE;                                  /* failure, collision */
      }
      tabh[hash].key_h = mykey;
    }
  }
  return TRUE;
}


/*
-------------------------------------------------------------------------------
augment(): Add item to the mapping.

Construct a spanning tree of *b*s with *item* as root, where each
parent can have all its hashes changed (by some new val_b) with 
at most one collision, and each child is the b of that collision.

I got this from Tarjan's "Data Structures and Network Algorithms".  The
path from *item* to a *b* that can be remapped with no collision is 
an "augmenting path".  Change values of tab[b] along the path so that 
the unmapped key gets mapped and the unused hash value gets used.

Assuming 1 key per b, if m out of n hash values are still unused, 
you should expect the transitive closure to cover n/m nodes before 
an unused node is found.  Sum(i=1..n)(n/i) is about nlogn, so expect
this approach to take about nlogn time to map all single-key b's.
-------------------------------------------------------------------------------
*/
static int augment(tabb, tabh, tabq, blen, scramble, smax, item, nkeys, 
                   highwater, form)
bstuff   *tabb;                                        /* stuff indexed by b */
hstuff   *tabh;  /* which key is associated with which hash, indexed by hash */
qstuff   *tabq;            /* queue of *b* values, this is the spanning tree */
uint32_t       blen;                                            /* length of tabb */
uint32_t      *scramble;                      /* final hash is a^scramble[tab[b]] */
uint32_t       smax;                                 /* highest value in scramble */
bstuff   *item;                           /* &tabb[b] for the b to be mapped */
uint32_t       nkeys;                         /* final hash must be in 0..nkeys-1 */
uint32_t       highwater;        /* a value higher than any now in tabb[].water_b */
hashform *form;               /* TRUE if we should do a minimal perfect hash */
{
  uint32_t  q;                      /* current position walking through the queue */
  uint32_t  tail;              /* tail of the queue.  0 is the head of the queue. */
  uint32_t  limit=((blen < USE_SCRAMBLE) ? smax : UINT8_MAX+1);
  uint32_t  highhash = ((form->perfect == MINIMAL_HP) ? nkeys : smax);
  int  trans = (form->speed == SLOW_HS || form->perfect == MINIMAL_HP);

  /* initialize the root of the spanning tree */
  tabq[0].b_q = item;
  tail = 1;

  /* construct the spanning tree by walking the queue, add children to tail */
  for (q=0; q<tail; ++q)
  {
    bstuff *myb = tabq[q].b_q;                        /* the b for this node */
    uint32_t     i;                              /* possible value for myb->val_b */

    if (!trans && (q == 1)) 
      break;                                  /* don't do transitive closure */

    for (i=0; i<limit; ++i)
    {
      bstuff *childb = (bstuff *)0;             /* the b that this i maps to */
      key    *mykey;                       /* for walking through myb's keys */

      for (mykey = myb->list_b; mykey; mykey=mykey->nextb_k)
      {
	key    *childkey;
	uint32_t hash = mykey->a_k^scramble[i];

	if (hash >= highhash) break;                        /* out of bounds */
	childkey = tabh[hash].key_h;

	if (childkey)
	{
	  bstuff *hitb = &tabb[childkey->b_k];

	  if (childb)
	  {
	    if (childb != hitb) break;            /* hit at most one child b */
	  }
	  else
	  {
	    childb = hitb;                        /* remember this as childb */
	    if (childb->water_b == highwater) break;     /* already explored */
	  }
	}
      }
      if (mykey) continue;             /* myb with i has multiple collisions */

      /* add childb to the queue of reachable things */
      if (childb) childb->water_b = highwater;
      tabq[tail].b_q      = childb;
      tabq[tail].newval_q = i;     /* how to make parent (myb) use this hash */
      tabq[tail].oldval_q = myb->val_b;            /* need this for rollback */
      tabq[tail].parent_q = q;
      ++tail;

      if (!childb)
      {                                  /* found an *i* with no collisions? */
	/* try to apply the augmenting path */
	if (apply(tabb, tabh, tabq, blen, scramble, tail, FALSE))
	  return TRUE;        /* success, item was added to the perfect hash */

	--tail;                    /* don't know how to handle such a child! */
      }
    }
  }
  return FALSE;
}


/* find a mapping that makes this a perfect hash */
static int perfect(tabb, tabh, tabq, blen, smax, scramble, nkeys, form, fp)
bstuff   *tabb;
hstuff   *tabh;
qstuff   *tabq;
uint32_t       blen;
uint32_t       smax;
uint32_t      *scramble;
uint32_t       nkeys;
hashform *form;
{
  uint32_t maxkeys;                           /* maximum number of keys for any b */
  uint32_t i, j;

  /* clear any state from previous attempts */
  memset((void *)tabh, 0, 
	 (size_t)(sizeof(hstuff)*
		  ((form->perfect == MINIMAL_HP) ? nkeys : smax)));
  memset((void *)tabq, 0, (size_t)(sizeof(qstuff)*(blen+1)));

  for (maxkeys=0,i=0; i<blen; ++i) 
    if (tabb[i].listlen_b > maxkeys) 
      maxkeys = tabb[i].listlen_b;

  /* In descending order by number of keys, map all *b*s */
  for (j=maxkeys; j>0; --j)
    for (i=0; i<blen; ++i)
      if (tabb[i].listlen_b == j)
	if (!augment(tabb, tabh, tabq, blen, scramble, smax, &tabb[i], nkeys, 
		     i+1, form))
	{
	  printf("fail to map group of size %" PRId32 " for tab size %" PRId32 "\n", j, blen);
	  return FALSE;
	}
  /* Success!  We found a perfect hash of all keys into 0..nkeys-1. */
  return TRUE;
}


/*
 * Simple case: user gave (a,b).  No more mixing, no guessing alen or blen. 
 * This assumes a,b reside in (key->a_k, key->b_k), and final->form == AB_HK.
 */
static int hash_ab(tabb, alen, blen, salt, final, 
            scramble, smax, keys, nkeys, form, fp)
bstuff  **tabb;           /* output, tab[] of the perfect hash, length *blen */
uint32_t      *alen;                 /* output, 0..alen-1 is range for a of (a,b) */
uint32_t      *blen;                 /* output, 0..blen-1 is range for b of (a,b) */
uint32_t      *salt;                         /* output, initializes initial hash */
gencode  *final;                                      /* code for final hash */
uint32_t      *scramble;                      /* input, hash = a^scramble[tab[b]] */
uint32_t      *smax;                           /* input, scramble[i] in 0..smax-1 */
key      *keys;                                       /* input, keys to hash */
uint32_t       nkeys;                       /* input, number of keys being hashed */
hashform *form;                                           /* user directives */
FILE     *fp;
{
  hstuff *tabh;
  qstuff *tabq;
  key    *mykey;
  uint32_t     i;
  int     used_tab;

  /* initially make smax the first power of two bigger than nkeys */
  *smax = ((uint32_t)1<<mylog2(nkeys));
  scrambleinit(scramble, *smax);

  /* set *alen and *blen based on max A and B from user */
  *alen = 1;
  *blen = 1;
  for (mykey = keys;  mykey != (key *)0;  mykey = mykey->next_k)
  {
    while (*alen <= mykey->a_k) *alen *= 2;
    while (*blen <= mykey->b_k) *blen *= 2;
  }
  if (*alen > 2**smax)
  {
    fprintf(fp, "perfect.c: Can't deal with (A,B) having A bigger than twice \n");
    fprintf(fp, "  the smallest power of two greater or equal to any legal hash.\n");
    return 1;
  }

  /* allocate working memory */
  *tabb = (bstuff *)malloc((size_t)(sizeof(bstuff)*(*blen))); 
  tabq  = (qstuff *)remalloc(sizeof(qstuff)*(*blen+1), "perfect.c, tabq");
  tabh  = (hstuff *)remalloc(sizeof(hstuff)*(form->perfect == MINIMAL_HP ? 
                                             nkeys : *smax),
                            "perfect.c, tabh");

  /* check that (a,b) are distinct and put them in tabb indexed by b */
  (void)inittab(*tabb, *blen, keys, form, FALSE);

  /* try with smax */
  if (!perfect(*tabb, tabh, tabq, *blen, *smax, scramble, nkeys, form, fp))
  {
    if (form->perfect == MINIMAL_HP)
    {
      fprintf(fp, "fatal error: Cannot find perfect hash for user (A,B) pairs\n");
      return 1;
    }
    else
    {
      free((void *)tabh);
      *smax = *smax * 2;
      scrambleinit(scramble, *smax);
      tabh = (hstuff *)remalloc(sizeof(hstuff)*(form->perfect == MINIMAL_HP ?
                                                nkeys : *smax),
                               "perfect.c, tabh");
      if (!perfect(*tabb, tabh, tabq, *blen, *smax, scramble, nkeys, form, fp))
      {
          fprintf(fp, "fatal error: Cannot find perfect hash for user (A,B) pairs\n");
          return 1;
      }
    }
  }

  /* check if tab[] was really needed */
  for (i=0; i<*blen; ++i)
  {
    if ((*tabb)[i].val_b != 0) break;            /* assumes permute(0) == 0 */
  }
  used_tab = (i < *blen);

  /* write the code for the perfect hash */
  *salt = 1;
  final->used = 1;
  if (!used_tab)
  {
    sprintf(final->line[0], "  uint32_t rsl = a;\n");
  }
  else if (*blen < USE_SCRAMBLE)
  {
    sprintf(final->line[0], "  uint32_t rsl = (a ^ tab[b]);\n");
  }
  else
  {
    sprintf(final->line[0], "  uint32_t rsl = (a ^ scramble[tab[b]]);\n");
  }

  fprintf(fp, "success, found a perfect hash\n");

  free((void *)tabq);
  free((void *)tabh);
}


/* guess initial values for alen and blen */
static void initalen(alen, blen, smax, nkeys, form)
uint32_t      *alen;                                      /* output, initial alen */
uint32_t      *blen;                                      /* output, initial blen */
uint32_t      *smax;    /* input, power of two greater or equal to max hash value */
uint32_t       nkeys;                              /* number of keys being hashed */
hashform *form;                                           /* user directives */
{
  /*
   * Find initial *alen, *blen
   * Initial alen and blen values were found empirically.  Some factors:
   *
   * If smax<256 there is no scramble, so tab[b] needs to cover 0..smax-1.
   *
   * alen and blen must be powers of 2 because the values in 0..alen-1 and
   * 0..blen-1 are produced by applying a bitmask to the initial hash function.
   *
   * alen must be less than smax, in fact less than nkeys, because otherwise
   * there would often be no i such that a^scramble[i] is in 0..nkeys-1 for
   * all the *a*s associated with a given *b*, so there would be no legal
   * value to assign to tab[b].  This only matters when we're doing a minimal
   * perfect hash.
   *
   * It takes around 800 trials to find distinct (a,b) with nkey=smax*(5/8)
   * and alen*blen = smax*smax/32.
   *
   * Values of blen less than smax/4 never work, and smax/2 always works.
   *
   * We want blen as small as possible because it is the number of bytes in
   * the huge array we must create for the perfect hash.
   *
   * When nkey <= smax*(5/8), blen=smax/4 works much more often with 
   * alen=smax/8 than with alen=smax/4.  Above smax*(5/8), blen=smax/4
   * doesn't seem to care whether alen=smax/8 or alen=smax/4.  I think it
   * has something to do with 5/8 = 1/8 * 5.  For example examine 80000, 
   * 85000, and 90000 keys with different values of alen.  This only matters
   * if we're doing a minimal perfect hash.
   *
   * When alen*blen <= 1<<UINT32_BITS, the initial hash must produce one integer.
   * Bigger than that it must produce two integers, which increases the
   * cost of the hash per character hashed.
   */
  if (form->perfect == NORMAL_HP)
  {
    if ((form->speed == FAST_HS) && (nkeys > *smax*0.8))
    {
      *smax = *smax * 2;
    }

    *alen = ((form->hashtype==INT_HT) && *smax>131072) ? 
      ((uint32_t)1<<(UINT32_BITS-mylog2(*blen))) :   /* distinct keys => distinct (A,B) */
      *smax;                         /* no reason to restrict alen to smax/2 */
    if ((form->hashtype == INT_HT) && *smax < 32)
      *blen = *smax;                      /* go for function speed not space */
    else if (*smax/4 <= (1<<14))
      *blen = ((nkeys <= *smax*0.56) ? *smax/32 :
	       (nkeys <= *smax*0.74) ? *smax/16 : *smax/8);
    else
      *blen = ((nkeys <= *smax*0.6) ? *smax/16 : 
	       (nkeys <= *smax*0.8) ? *smax/8 : *smax/4);

    if ((form->speed == FAST_HS) && (*blen < *smax/8))
      *blen = *smax/8;

    if (*alen < 1) *alen = 1;
    if (*blen < 1) *blen = 1;
  }
  else
  {
    switch(mylog2(*smax))
    {
    case 0:
      *alen = 1;
      *blen = 1;
    case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
      *alen = (form->perfect == NORMAL_HP) ? *smax : *smax/2;
      *blen = *smax/2;
      break;
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      if (form->speed == FAST_HS)
      {
	*alen = *smax/2;
	*blen = *smax/4;
      }
      else if (*smax/4 < USE_SCRAMBLE)
      {
	*alen = ((nkeys <= *smax*0.52) ? *smax/8 : *smax/4);
	*blen = ((nkeys <= *smax*0.52) ? *smax/8 : *smax/4);
      }
      else
      {
	*alen = ((nkeys <= *smax*(5.0/8.0)) ? *smax/8 : 
		 (nkeys <= *smax*(3.0/4.0)) ? *smax/4 : *smax/2);
	*blen = *smax/4;                /* always give the small size a shot */
      }
      break;
    case 18:
      if (form->speed == FAST_HS)
      {
	*alen = *smax/2;
	*blen = *smax/2;
      }
      else
      {
	*alen = *smax/8;                 /* never require the multiword hash */
	*blen = (nkeys <= *smax*(5.0/8.0)) ? *smax/4 : *smax/2;
      }
      break;
    case 19:
    case 20:
      *alen = (nkeys <= *smax*(5.0/8.0)) ? *smax/8 : *smax/2;
      *blen = (nkeys <= *smax*(5.0/8.0)) ? *smax/4 : *smax/2;
      break;
    default:
      *alen = *smax/2;              /* just find a hash as quick as possible */
      *blen = *smax/2;     /* we'll be thrashing virtual memory at this size */
      break;
    }
  }
}

/* 
** Try to find a perfect hash function.  
** Return the successful initializer for the initial hash. 
** Return 0 if no perfect hash could be found.
*/
int findhash(tabb, alen, blen, salt, final, 
             scramble, smax, keys, nkeys, form, fp)
bstuff  **tabb;           /* output, tab[] of the perfect hash, length *blen */
uint32_t      *alen;                 /* output, 0..alen-1 is range for a of (a,b) */
uint32_t      *blen;                 /* output, 0..blen-1 is range for b of (a,b) */
uint32_t      *salt;                         /* output, initializes initial hash */
gencode  *final;                                      /* code for final hash */
uint32_t      *scramble;                      /* input, hash = a^scramble[tab[b]] */
uint32_t      *smax;                           /* input, scramble[i] in 0..smax-1 */
key      *keys;                                       /* input, keys to hash */
uint32_t       nkeys;                       /* input, number of keys being hashed */
hashform *form;                                           /* user directives */
FILE     *fp;                                    /* for printing to log file */
{
  uint32_t bad_initkey;                       /* how many times did initkey fail? */
  uint32_t bad_perfect;                       /* how many times did perfect fail? */
  uint32_t trysalt;                        /* trial initializer for initial hash */
  uint32_t maxalen;
  hstuff *tabh;                       /* table of keys indexed by hash value */
  qstuff *tabq;    /* table of stuff indexed by queue value, used by augment */

  int exit_code;

  /* The case of (A,B) supplied by the user is a special case */
  if (form->hashtype == AB_HT)
     return hash_ab(tabb, alen, blen, salt, final,
                    scramble, smax, keys, nkeys, form);

  /* guess initial values for smax, alen and blen */
  *smax = ((uint32_t)1<<mylog2(nkeys));
  initalen(alen, blen, smax, nkeys, form);

  scrambleinit(scramble, *smax);

  maxalen = (form->perfect == MINIMAL_HP) ? *smax/2 : *smax;

  /* allocate working memory */
  *tabb = (bstuff *)remalloc((size_t)(sizeof(bstuff)*(*blen)), 
                             "perfect.c, tabb");
  tabq  = (qstuff *)remalloc(sizeof(qstuff)*(*blen+1), "perfect.c, tabq");
  tabh  = (hstuff *)remalloc(sizeof(hstuff)*(form->perfect == MINIMAL_HP ? 
                                             nkeys : *smax),
                            "perfect.c, tabh");

  /* Actually find the perfect hash */
  *salt = 0;
  bad_initkey = 0;
  bad_perfect = 0;
  for (trysalt=1; ; ++trysalt)
  {
    uint32_t rslinit;
    /* Try to find distinct (A,B) for all keys */
    


    rslinit = initkey(keys, nkeys, *tabb, *alen, *blen, *smax, trysalt,
                      form, final);

    if (rslinit == 2)
    {      /* initkey actually found a perfect hash, not just distinct (a,b) */
      *salt = 1;
      *blen = 0;
      break;
    }
    else if (rslinit == 0)
    {
      /* didn't find distinct (a,b) */
      if (++bad_initkey >= RETRY_INITKEY)
      {
        /* Try to put more bits in (A,B) to make distinct (A,B) more likely */
        if (*alen < maxalen)
        {
          *alen *= 2;
        } 
        else if (*blen < *smax)
        {
          *blen *= 2;
          free(tabq);
          free(*tabb);
          *tabb  = (bstuff *)malloc((size_t)(sizeof(bstuff)*(*blen)));
          tabq  = (qstuff *)malloc((size_t)(sizeof(qstuff)*(*blen+1)));
        }
        else
        {
          duplicates(*tabb, *blen, keys, form);      /* check for duplicates */
          fprintf(fp, "fatal error: Cannot perfect hash: cannot find distinct (A,B)\n");
          return 1;
        }
        bad_initkey = 0;
        bad_perfect = 0;
      }
      continue;                             /* two keys have same (a,b) pair */
    }

    fprintf(fp, "found distinct (A,B) on attempt %" PRId32 "\n", trysalt);
    /* Given distinct (A,B) for all keys, build a perfect hash */
    if (!perfect(*tabb, tabh, tabq, *blen, *smax, scramble, nkeys, form, fp))
    {
      if ((form->hashtype != INT_HT && ++bad_perfect >= RETRY_PERFECT) || 
          (form->hashtype == INT_HT && ++bad_perfect >= RETRY_HEX))
      {
        if (*blen < *smax)
        {
          *blen *= 2;
          free(*tabb);
          free(tabq);
          *tabb  = (bstuff *)malloc((size_t)(sizeof(bstuff)*(*blen)));
          tabq  = (qstuff *)malloc((size_t)(sizeof(qstuff)*(*blen+1)));
          --trysalt;               /* we know this salt got distinct (A,B) */
        }
        else
        {
          fprintf(fp, "fatal error: Cannot perfect hash: cannot build tab[]\n");
          return 1;
        }
        bad_perfect = 0;
      }
      continue;
    }
    
    *salt = trysalt;
    break;
  }

  fprintf(fp, "built perfect hash table of size %" PRId32 "\n", *blen);

  /* free working memory */
  free((void *)tabh);
  free((void *)tabq);

  return 0;
}

/*
------------------------------------------------------------------------------
Input/output type routines
------------------------------------------------------------------------------
*/

/* get the list of keys */
static void getkeys(keys, nkeys, textroot, keyroot, form, inputkeys, numkeys)
key      **keys;                                         /* list of all keys */
uint32_t       *nkeys;                                          /* number of keys */
reroot    *textroot;                          /* get space to store key text */
reroot    *keyroot;                                    /* get space for keys */
hashform  *form;                                          /* user directives */
char** inputkeys;                                 /* input file containing keys */
int numkeys;
{
  key  *mykey;
  char *mytext;
  mytext = (char *)renew(textroot);
  *keys = 0;
  *nkeys = 0;
  int i;
  
  for(i=0;i<numkeys;i++)
  {     
    mykey = (key *)renew(keyroot);
    strcpy(mytext,inputkeys[i]);

    mykey->name_k = (uint8_t *)mytext;
        
    mytext = (char *)renew(textroot);
    mykey->len_k  = (uint32_t)(strlen((char *)mykey->name_k));
      
    mykey->next_k = *keys;
    *keys = mykey;
    ++*nkeys;
  }
  redel(textroot, mytext);
   
}

/* make the .h file */
static void make_h(blen, smax, nkeys, salt, form, hash_folder)
uint32_t  blen;
uint32_t  smax;
uint32_t  nkeys;
uint32_t  salt;
char* hash_folder;
hashform *form;
{
  char* header_filename = "/phash.h";
  char* phash_header_path;

  int phash_header_path_size = strlen(hash_folder)+1+strlen(header_filename);
  phash_header_path = malloc(phash_header_path_size);
  strcpy(phash_header_path, hash_folder);
  strcat(phash_header_path, header_filename);

  FILE *f;
  f = fopen(phash_header_path, "w");
  fprintf(f, "/* Perfect hash definitions */\n");
  fprintf(f, "#ifndef MPH\n");
  fprintf(f, "#define MPH\n");
  fprintf(f, "\n");  
  fprintf(f, "#include \"stdint.h\"\n");
  fprintf(f, "\n");
  if (blen > 0)
  {
    if (smax <= UINT8_MAX+1 || blen >= USE_SCRAMBLE)
      fprintf(f, "extern uint8_t tab[];\n");
    else
    {
      fprintf(f, "extern uint16_t tab[];\n");
      if (blen >= USE_SCRAMBLE)
      {
	if (smax <= UINT16_MAX+1)
	  fprintf(f, "extern uint16_t scramble[];\n");
	else
	  fprintf(f, "extern uint32_t scramble[];\n");
      }
    }
    fprintf(f, "#define MPH_LEN 0x%" PRIx32 "  /* length of hash mapping table */\n",
	     blen);
  }
  fprintf(f, "#define MPH_NKEYS %" PRId32 "  /* How many keys were hashed */\n",
             nkeys);
  fprintf(f, "#define MPH_RANGE %" PRId32 "  /* Range any input might map to */\n",
          smax);
  fprintf(f, "#define MPH_SALT 0x%.8" PRIx32 " /* internal, initialize normal hash */\n",
           salt*0x9e3779b9);
  fprintf(f, "\n");
  fprintf(f, "uint32_t phash();\n");
  fprintf(f, "\n");
  fprintf(f, "#define mph(key) phash((key), strlen((key)))\n");
  fprintf(f, "\n");
  fprintf(f, "#endif  /* MPH */\n");
  fprintf(f, "\n");
  fclose(f);

  free(phash_header_path);
}

/* make the .c file */
static void make_c(tab, smax, blen, scramble, final, form, hash_folder)
bstuff   *tab;                                         /* table indexed by b */
uint32_t       smax;                                       /* range of scramble[] */
uint32_t       blen;                                /* b in 0..blen-1, power of 2 */
uint32_t      *scramble;                                    /* used in final hash */
gencode  *final;                                  /* code for the final hash */
hashform *form;                                           /* user directives */
char*     hash_folder;
{
  char* src_filename = "/phash.c";
  char* phash_src_path;

  int phash_src_path_size = strlen(hash_folder)+1+strlen(src_filename);
  phash_src_path = malloc(phash_src_path_size);
  strcpy(phash_src_path, hash_folder);
  strcat(phash_src_path, src_filename);

  uint32_t   i;
  FILE *f;
  f = fopen(phash_src_path, "w");

  fprintf(f, "/* table for the mapping for the perfect hash */\n");
  fprintf(f, "#include \"phash.h\"\n");
  fprintf(f, "#include \"lookupa.h\"\n");
  fprintf(f, "\n");
  if (blen >= USE_SCRAMBLE)
  {
    fprintf(f, "/* A way to make the 1-byte values in tab bigger */\n");
    if (smax > UINT16_MAX+1)
    {
      fprintf(f, "uint32_t scramble[] = {\n");
      for (i = 0; i <= UINT8_MAX; i+=4)
        fprintf(f, "0x%.8" PRIx32 ", 0x%.8" PRIx32 ", 0x%.8" PRIx32 ", 0x%.8" PRIx32 ",\n",
                scramble[i+0], scramble[i+1], scramble[i+2], scramble[i+3]);
    }
    else
    {
      fprintf(f, "uint16_t scramble[] = {\n");
      for (i = 0; i <= UINT8_MAX; i+=8)
        fprintf(f, 
"0x%.4" PRIx32 ", 0x%.4" PRIx32 ", 0x%.4" PRIx32 ", 0x%.4" PRIx32 ", 0x%.4" PRIx32 ", 0x%.4" PRIx32 ", 0x%.4" PRIx32 ", 0x%.4" PRIx32 ",\n",
                scramble[i+0], scramble[i+1], scramble[i+2], scramble[i+3],
                scramble[i+4], scramble[i+5], scramble[i+6], scramble[i+7]);
    }
    fprintf(f, "};\n");
    fprintf(f, "\n");
  }
  if (blen > 0)
  {
    fprintf(f, "/* small adjustments to _a_ to make values distinct */\n");

    if (smax <= UINT8_MAX+1 || blen >= USE_SCRAMBLE)
      fprintf(f, "uint8_t tab[] = {\n");
    else
      fprintf(f, "uint16_t tab[] = {\n");

    if (blen < 16)
    {
      for (i=0; i<blen; ++i) fprintf(f, "%3d,", scramble[tab[i].val_b]);
    }
    else if (blen <= 1024)
    {
      for (i=0; i<blen; i+=16)
	fprintf(f, "%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",\n",
		scramble[tab[i+0].val_b], scramble[tab[i+1].val_b], 
		scramble[tab[i+2].val_b], scramble[tab[i+3].val_b], 
		scramble[tab[i+4].val_b], scramble[tab[i+5].val_b], 
		scramble[tab[i+6].val_b], scramble[tab[i+7].val_b], 
		scramble[tab[i+8].val_b], scramble[tab[i+9].val_b], 
		scramble[tab[i+10].val_b], scramble[tab[i+11].val_b], 
		scramble[tab[i+12].val_b], scramble[tab[i+13].val_b], 
		scramble[tab[i+14].val_b], scramble[tab[i+15].val_b]); 
    }
    else if (blen < USE_SCRAMBLE)
    {
      for (i=0; i<blen; i+=8)
	fprintf(f, "%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",\n",
		scramble[tab[i+0].val_b], scramble[tab[i+1].val_b], 
		scramble[tab[i+2].val_b], scramble[tab[i+3].val_b], 
		scramble[tab[i+4].val_b], scramble[tab[i+5].val_b], 
		scramble[tab[i+6].val_b], scramble[tab[i+7].val_b]); 
    }
    else 
    {
      for (i=0; i<blen; i+=16)
	fprintf(f, "%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",%" PRId32 ",\n",
		tab[i+0].val_b, tab[i+1].val_b, 
		tab[i+2].val_b, tab[i+3].val_b, 
		tab[i+4].val_b, tab[i+5].val_b, 
		tab[i+6].val_b, tab[i+7].val_b, 
		tab[i+8].val_b, tab[i+9].val_b, 
		tab[i+10].val_b, tab[i+11].val_b, 
		tab[i+12].val_b, tab[i+13].val_b, 
		tab[i+14].val_b, tab[i+15].val_b); 
    }
    fprintf(f, "};\n");
    fprintf(f, "\n");
  }
  fprintf(f, "/* The hash function */\n");
  switch(form->mode)
  {
  case NORMAL_HM:
    fprintf(f, "uint32_t phash(key, len)\n");
    fprintf(f, "char *key;\n");
    fprintf(f, "int   len;\n");
    break;
  case INLINE_HM:
  case HEX_HM:
  case DECIMAL_HM:
    fprintf(f, "uint32_t phash(val)\n");
    fprintf(f, "uint32_t val;\n");
    break;
  case AB_HM:
  case ABDEC_HM:
    fprintf(f, "uint32_t phash(a,b)\n");
    fprintf(f, "uint32_t a;\n");
    fprintf(f, "uint32_t b;\n");
    break;
  }
  fprintf(f, "{\n");
  for (i=0; i<final->used; ++i)
    fprintf(f, "%s", final->line[i]);
  fprintf(f, "  return rsl;\n");
  fprintf(f, "}\n");
  fprintf(f, "\n");
  fclose(f);
}

/*
------------------------------------------------------------------------------
Read in the keys, find the hash, and write the .c and .h files
------------------------------------------------------------------------------
*/
static int driver(form, inputkeys, numkeys, hash_folder)
hashform *form;                                           /* user directives */
char** inputkeys;
int numkeys;
char* hash_folder;
{
  uint32_t       nkeys;                                         /* number of keys */
  key      *keys;                                    /* head of list of keys */
  bstuff   *tab;                                       /* table indexed by b */
  uint32_t       smax;            /* scramble[] values in 0..smax-1, a power of 2 */
  uint32_t       alen;                            /* a in 0..alen-1, a power of 2 */
  uint32_t       blen;                            /* b in 0..blen-1, a power of 2 */
  uint32_t       salt;                       /* a parameter to the hash function */
  reroot   *textroot;                      /* MAXKEYLEN-character text lines */
  reroot   *keyroot;                                       /* source of keys */
  gencode   final;                                    /* code for final hash */
  uint32_t       i;
  uint32_t       scramble[SCRAMBLE_LEN];           /* used in final hash function */
  char      buf[10][80];                        /* buffer for generated code */
  char     *buf2[10];                             /* also for generated code */

  /* set up memory sources */
  textroot = remkroot((size_t)MAXKEYLEN);
  keyroot  = remkroot(sizeof(key));

  /* set up code for final hash */
  final.line = buf2;
  final.used = 0;
  final.len  = 10;
  for (i=0; i<10; ++i) final.line[i] = buf[i];

  /* creating log filename */
  char* log_filename = "/phash.log";
  char* phash_log_path;
  int phash_log_path_size = strlen(hash_folder)+1+strlen(log_filename);
  phash_log_path = malloc(phash_log_path_size);
  strcpy(phash_log_path, hash_folder);
  strcat(phash_log_path, log_filename);

  FILE *fp = fopen( phash_log_path, "w" );
  if( fp == NULL) return 1;

  int exit_code; 
  /* read in the list of keywords */
  getkeys(&keys, &nkeys, textroot, keyroot, form, inputkeys, numkeys);
  fprintf(fp, "Read in %" PRId32 " keys\n",nkeys);

  /* find the hash */
  exit_code = findhash(&tab, &alen, &blen, &salt, &final,
                       scramble, &smax, keys, nkeys, form, fp);
  if (exit_code != 0) return exit_code;

  /* generate the phash.h file */
  make_h(blen, smax, nkeys, salt, form, hash_folder);

  /* generate the phash.c file */
  make_c(tab, smax, blen, scramble, &final, form, hash_folder);

  /*clean up log file handle */
  fclose( fp );

  /* clean up memory sources */
  refree(textroot);
  refree(keyroot);
  free((void *)tab);

  return 0;
}


/* Describe how to use this utility */
static void usage_error(FILE *fp)
{
  printf(fp, "Usage: perfect [-{NnIiHhDdAaBb}{MmPp}{FfSs} 'ID'] < key.txt \n");
  printf(fp, "The input is a list of keys, one key per line.\n");
  printf(fp, "ID is a custom string to be used in generated code suffixes/prefixes.\n");
  printf(fp, "Only one of NnIiHhDdAa and one of MmPp may be specified.\n");
  printf(fp, "  N,n: normal mode, key is any string string (default).\n");
  printf(fp, "  I,i: initial hash for ASCII char strings.\n");
  printf(fp, "The initial hash must be\n");
  printf(fp, "  hash = PHASHSALT;\n");
  printf(fp, "  for (i=0; i<keylength; ++i) {\n");
  printf(fp, "    hash = (hash ^ key[i]) + ((hash<<26)+(hash>>6));\n");
  printf(fp, "  }\n");
  printf(fp, "Note that this can be inlined in any user loop that walks\n");
  printf(fp, "through the key anyways, eliminating the loop overhead.\n");
  printf(fp, "  H,h: Keys are 4-byte integers in hex in this format:\n");
  printf(fp, "ffffffff\n");
  printf(fp, "This is good for optimizing switch statement compilation.\n");
  printf(fp, "  D,d: Same as H,h, except in decimal not hexidecimal\n");
  printf(fp, "  A,a: An (A,B) pair is supplied in hex in this format:\n");
  printf(fp, "aaa bbb\n");
  printf(fp, "  B,b: Same as A,a, except in decimal not hexidecimal\n");
  printf(fp, "This mode does nothing but find the values of tab[].\n");
  printf(fp, "*A* must be less than the total number of keys.\n");
  printf(fp, "  M,m: Minimal perfect hash.  Hash will be in 0..nkeys-1 (default)\n");
  printf(fp, "  P,p: Perfect hash.  Hash will be in 0..n-1, where n >= nkeys\n");
  printf(fp, "and n is a power of 2.  Will probably use a smaller tab[].\n");
  printf(fp, "  F,f: Fast mode.  Generate the perfect hash fast.\n");
  printf(fp, "  S,s: Slow mode.  Spend time finding a good perfect hash.\n");
}


void delEoLine(char *buf) //if end of line is /n the delete it
{
  int ln;
  ln = (int)strlen(buf);
  if (buf[ln-1] == '\n')
      buf[ln-1] = '\0';
}


/* Interpret arguments and call the driver */
/* See usage_error for the expected arguments */
int mphash(inputkeys,numkeys, hash_folder) /* do minimal perfect hashing*/
char **inputkeys;
int numkeys;
char *hash_folder;
{
  hashform form;
  /* default behavior */
  form.mode = NORMAL_HM;
  form.hashtype = STRING_HT;
  form.perfect = MINIMAL_HP;
  form.speed = SLOW_HS;

  /* Generate the [minimal] perfect hash */
  int exit_code = driver(&form,inputkeys,numkeys, hash_folder);
  if (exit_code != 0 ) return exit_code;   
 
  return 0;
}
