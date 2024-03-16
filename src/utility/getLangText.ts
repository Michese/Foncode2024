import { lang } from '@/lang';
import { PageLang } from '@/types';

export const getLangText = (language: PageLang, path: string): string => {
  return path
    .split('.')
    .reduce(
      (curLang, v) =>
        typeof curLang !== 'string' && v in curLang ? (curLang as any)[v] : '',
      { ...lang[language] },
    )
    .toString();
};
