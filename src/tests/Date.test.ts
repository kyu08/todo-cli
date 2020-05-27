import { returnDateAndTime } from '../models/Date';

describe('returnDate', (): void => {
  test('correctDate', (): void => {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const hour = String(date.getHours());
    const minute = String(date.getMinutes());
    const expected = `${year}/${month}/${day} ${hour}:${minute}`;
    const res = returnDateAndTime(date);
    expect(res).toBe(expected);
  });
});
