// export default (str: string | undefined): string | undefined => {
//   if (str) return str.trim().toLocaleLowerCase();
// };

export default (str: string): string => {
  return str.trim().toLocaleLowerCase();
};
