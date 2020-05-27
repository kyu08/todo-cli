import format from 'date-fns/format';

export const returnDateAndTime = (date: Date): string =>
  format(date, 'yyyy/M/d H:mm');

const returnDate = (date: Date): string => format(date, 'yyyy/M/d');

// 最終編集日時が今日ならtrueを返す
export const isToday = (date: Date): boolean => {
  const today = returnDate(new Date());
  const updatedAt = returnDate(date);

  return today === updatedAt;
};
