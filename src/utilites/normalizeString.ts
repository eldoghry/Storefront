export default (str: string | undefined): string | undefined => {
  if (str) return str.trim().toLocaleLowerCase();
};
