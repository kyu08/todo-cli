// eslint-disable-next-line import/no-cycle
import { loadFile, updateFile } from '../dao/Dao';
import { returnDate } from './Date';

export type todoCategoryType = 'daily' | 'oneShot';

export interface TodoProps {
  id: number;
  todoCategory: todoCategoryType;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: string;
}

export interface TodoInterface extends TodoProps {
  deleteTodo(): TodoProps;
  doneTodo(): TodoProps;
}

export class Todo implements TodoInterface {
  id: number;

  todoCategory: todoCategoryType;

  content: string;

  deadline: any;

  done: boolean;

  deleted: boolean;

  updateAt: string;

  constructor(props: TodoProps) {
    const {
      id,
      todoCategory,
      content,
      deadline,
      done,
      deleted,
      updateAt,
    } = props;
    this.id = id;
    this.todoCategory = todoCategory;
    this.content = content;
    this.deadline = deadline;
    this.done = done;
    this.deleted = deleted;
    this.updateAt = updateAt;
  }

  doneTodo = (): TodoProps => {
    const todo = new Todo({
      ...this,
      ...{ done: true },
      ...{ updateAt: returnDate() },
    });

    return todo;
  };

  deleteTodo = (): TodoProps => {
    const todo = new Todo({
      ...this,
      ...{ deleted: true },
      ...{ updateAt: returnDate() },
    });

    return todo;
  };
}

// todo.json から Todo(: string) を読み込んで Map オブジェクト化と value の Todo インスタンス化をして返す
export const returnTodoMap = (): Map<number, TodoProps> => {
  const data = loadFile();
  if (data === '') return new Map();
  const parsedData = JSON.parse(data);
  const todoMap: Map<number, TodoProps> = new Map(parsedData);
  todoMap.forEach((v: TodoProps, k: number, map: Map<number, TodoProps>) => {
    map.set(k, new Todo(v));
  });

  return todoMap;
};

export const updateMapAndFile = (todo: TodoProps): void => {
  const todoMap = returnTodoMap();
  updateFile(todoMap.set(todo.id, todo));
};
