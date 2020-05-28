// eslint-disable-next-line import/no-cycle
import { returnTodoMap, Todo, TodoPropType } from './Todo';
// eslint-disable-next-line import/no-cycle
import { updateFile } from '../dao/Dao';
// eslint-disable-next-line import/no-cycle
import { executeShowTable } from '../View';
import { isToday } from './Date';

// ここのany を Todo or TodoInterface って書きたいけどコンパイラ的には Todo | undefined って認識してるらしくうまくいかない。
// この関数を使う前にguardIncorrectIdで正しいidであることは確認してるけどそれをどうやってコンパイラに伝えればいいんじゃ。
export const searchTodo = (id: number): any => {
  const todoMap = returnTodoMap();
  const todo = todoMap.get(id);

  return todo;
};

export const setEntryToMap = (todoUpdated: Todo, message: string): void => {
  const todoMap = returnTodoMap();
  const { id } = todoUpdated;
  updateFile(todoMap.set(id, todoUpdated));
  console.log(`${message}(id: ${id})`);
};

export const updateProp = <T>({
  id,
  prop,
  value,
  message,
}: {
  id: number;
  prop: TodoPropType;
  value: T;
  message: string;
}): void => {
  const todo = searchTodo(id);
  const newTodo = todo.returnUpdatedInstance(prop, value);
  setEntryToMap(newTodo, message);
};

export const executeInitializeDailyTodo = (): void => {
  const todoMap = returnTodoMap();
  todoMap.forEach(v => {
    if (v.isDeleted === true) return;
    if (v.todoCategory !== 'daily') return;
    if (isToday(v.updateAt)) return;
    if (v.isDone === false) return;
    updateProp<boolean>({
      id: v.id,
      prop: 'isDone',
      value: false,
      message: 'Daily Todo was reset.',
    });
  });
};

export const hasNoTodo = (id: number): boolean => {
  const todoMap = returnTodoMap();

  return !todoMap.has(id);
};

export const guardIncorrectId = (id: number): boolean => {
  if (Number.isNaN(id) || hasNoTodo(id)) {
    console.log(
      `
        ID you entered was incorrect.
        Nothing updated.
      `,
    );

    return true;
  }

  return false;
};

export const executeDoneProp = (idString: string): void => {
  const prop: TodoPropType = 'isDone';
  const value = true;
  const message = 'Done Todo!';
  const id = Number(idString);
  if (guardIncorrectId(id)) return;
  updateProp<boolean>({ id, prop, value, message });
  executeShowTable();
};

export const executeDeleteProp = (idString: string): void => {
  const prop: TodoPropType = 'isDeleted';
  const value = true;
  const message = 'Deleted Todo!';
  const id = Number(idString);
  if (guardIncorrectId(id)) return;
  updateProp<boolean>({ id, prop, value, message });
  executeShowTable();
};
