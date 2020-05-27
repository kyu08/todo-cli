import { guardIncorrectId } from '../models/TodoMap';

describe('test', (): void => {
  test('hoge', (): void => {
    const id = Number(NaN);
    const res = guardIncorrectId(id);
    expect(res).toBe(true);
  });
});
