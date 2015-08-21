/* table for the mapping for the perfect hash */
#ifndef STANDARD
#include "standard.h"
#endif /* STANDARD */
#ifndef PHASH
#include "phash.h"
#endif /* PHASH */
#ifndef LOOKUPA
#include "lookupa.h"
#endif /* LOOKUPA */

/* small adjustments to _a_ to make values distinct */
ub1 tab[] = {
0,51,10,10,10,28,9,18,0,0,49,0,0,28,9,0,
61,61,0,15,2,0,9,6,49,0,0,34,49,45,30,9,
};

/* The hash function */
ub4 phash(key, len)
char *key;
int   len;
{
  ub4 rsl, val = lookup(key, len, 0x3c6ef372);
  rsl = ((val>>27)^tab[val&0x1f]);
  return rsl;
}

