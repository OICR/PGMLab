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
ub2 tab[] = {
117,65,328,154,6,146,234,328,163,264,108,324,48,65,234,258,
28,166,234,159,13,154,65,270,6,0,243,146,65,324,6,154,
258,0,87,328,162,65,345,154,234,27,258,6,342,258,258,258,
4,62,0,319,243,154,243,154,65,258,65,154,229,26,258,285,
28,28,305,183,378,310,159,7,161,135,258,243,0,258,328,324,
117,378,117,328,90,0,147,0,154,328,345,328,180,297,135,117,
161,65,264,338,0,0,258,60,251,260,275,132,299,260,154,258,
169,146,243,159,358,243,0,258,154,0,111,46,162,211,157,360,
};

/* The hash function */
ub4 phash(key, len)
char *key;
int   len;
{
  ub4 rsl, val = lookup(key, len, 0xf1bbcdc8);
  rsl = ((val>>25)^tab[val&0x7f]);
  return rsl;
}

