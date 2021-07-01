export const getTime = (date: Date | number) => {
  if (typeof date === 'number') return date;
  else return date.getTime();
};

export const getRefinedTest = (text: string, n: number) => {
  if (text.length <= n) return text;
  else {
    return `${text.slice(0, n - 3)}...`;
  }
};
