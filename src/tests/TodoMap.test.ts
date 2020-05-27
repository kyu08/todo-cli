import { guardIncorrectId } from '../models/TodoMap';

describe('guardIncorrectId', (): void => {
  test('NaN', (): void => {
    const id = Number(NaN);
    const res = guardIncorrectId(id);
    expect(res).toBe(true);
  });

  test('correctId', (): void => {
    const id = 1;
    const res = guardIncorrectId(id);
    expect(res).toBe(false);
  });
});
