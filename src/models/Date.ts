import format from 'date-fns/format';

export const returnDate = (date: Date): string => format(date, 'yyyy/M/d H:mm');
