/* Perfect hash definitions */
#ifndef STANDARD
#include "standard.h"
#endif /* STANDARD */
#ifndef PHASH
#define PHASH

extern ub2 tab[];
#define PHASHLEN 0x80  /* length of hash mapping table */
#define PHASHNKEYS 376  /* How many keys were hashed */
#define PHASHRANGE 512  /* Range any input might map to */
#define PHASHSALT 0xf1bbcdc8 /* internal, initialize normal hash */

ub4 phash();

#endif  /* PHASH */

