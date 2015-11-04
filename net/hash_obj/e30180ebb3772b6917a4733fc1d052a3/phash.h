/* Perfect hash definitions */
#ifndef STANDARD
#include "standard.h"
#endif /* STANDARD */
#ifndef PHASH
#define PHASH

extern ub2 tab[];
#define PHASHLEN 0x200  /* length of hash mapping table */
#define PHASHNKEYS 1038  /* How many keys were hashed */
#define PHASHRANGE 2048  /* Range any input might map to */
#define PHASHSALT 0x3809d976 /* internal, initialize normal hash */

ub4 phash();

#endif  /* PHASH */

