// export default (str: string | undefined): string | undefined => {
//   if (str) return str.trim().toLocaleLowerCase();
// };

export default (str: string): string => {
  if (!str) return '';

  return str.trim().toLocaleLowerCase();
};
