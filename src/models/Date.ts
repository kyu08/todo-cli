import format from 'date-fns/format';

export const returnDate = (date: Date): string => format(date, 'yyyy/M/d H:mm');

// 最終編集日時が今日ならtrueを返す
export const isToday = (date: Date): boolean => {
  const today = format(new Date(), 'yyyy/M/d');
  const updatedAt = format(date, 'yyyy/M/d');

  return today === updatedAt;
};
