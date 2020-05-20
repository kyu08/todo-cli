// eslint-disable-next-line import/no-cycle
import { loadFile, updateFile } from '../dao/Dao';

export type TodoCategoryType = 'daily' | 'oneShot';

export type TodoPropType =
  | 'id'
  | 'todoCategory'
  | 'content'
  | 'deadline'
  | 'isDone'
  | 'isDeleted'
  | 'updateAt';

export interface TodoProps {
  id: number;
  todoCategory: TodoCategoryType;
  content: string;
  deadline: any;
  isDone: boolean;
  isDeleted: boolean;
  updateAt: Date;
}

export interface TodoInterface extends TodoProps {
  returnUpdatedInstance(prop: string, value: any): TodoProps;
}

export class Todo implements TodoInterface {
  id: number;

  todoCategory: TodoCategoryType;

  content: string;

  deadline: any;

  isDone: boolean;

  isDeleted: boolean;

  updateAt: Date;

  constructor(props: TodoProps) {
    const {
      id,
      todoCategory,
      content,
      deadline,
      isDone,
      isDeleted,
      updateAt,
    } = props;
    this.id = id;
    this.todoCategory = todoCategory;
    this.content = content;
    this.deadline = deadline;
    this.isDone = isDone;
    this.isDeleted = isDeleted;
    this.updateAt = updateAt;
  }

  returnUpdatedInstance = (prop: string, value: any): TodoProps => {
    return new Todo({
      ...this,
      ...{ [prop]: value },
      ...{ updateAt: new Date() },
    });
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

export const passNewTodoToInquirer = ({
  todoCategory,
  content,
  deadline,
}: {
  todoCategory: TodoCategoryType;
  content: string;
  deadline: string;
}): TodoInterface => {
  const todoMap = returnTodoMap();
  const newId = todoMap.size + 1;
  const props: TodoProps = {
    id: newId,
    todoCategory,
    content,
    deadline,
    isDone: false,
    isDeleted: false,
    updateAt: new Date(),
  };

  return new Todo(props);
};
