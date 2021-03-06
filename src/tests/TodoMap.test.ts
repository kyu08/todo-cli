import { guardIncorrectId, hasNoTodo } from '../models/TodoMap';

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

  test('infinity', (): void => {
    const id = Number(Infinity);
    const res = guardIncorrectId(id);
    expect(res).toBe(true);
  });
});

describe('hasNoTodo', (): void => {
  test('NaN', (): void => {
    const id = Number(NaN);
    const res = hasNoTodo(id);
    expect(res).toBe(true);
  });

  test('correctId', (): void => {
    const id = 1;
    const res = hasNoTodo(id);
    expect(res).toBe(false);
  });

  test('infinity', (): void => {
    const id = Number(Infinity);
    const res = hasNoTodo(id);
    expect(res).toBe(true);
  });
});
