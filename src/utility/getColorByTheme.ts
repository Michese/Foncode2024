import { PageTheme } from '@/types';

export const getColorByTheme = (theme: PageTheme) => {
  const themeIsDark = theme === 'dark';
  return {
    '--bg-body-color': themeIsDark ? '#0E0E0E' : '#FFFFFF',
    '--first-color': themeIsDark ? '#FFFFFF' : '#0E0E0E',
    '--second-color': themeIsDark ? '#C0965C' : '#7b5b30',
    '--third-color': themeIsDark ? '#6C6C6C' : '#6C6C6C',
    '--four-color': themeIsDark ? '#191919' : '#191919',
    '--five-color': themeIsDark ? '#333333' : '#333333',
    '--color-shadow': themeIsDark ? '#ccc' : '#000',
  };
};
