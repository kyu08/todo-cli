import Table from 'cli-table';
import { generateTableOnlyHeader } from './models/Table';
import { returnTodoMap, TodoCategoryType } from './models/Todo';
import { returnDate } from './models/Date';

const convertBool = (isDone: boolean): string => {
  if (isDone) return 'done!';

  return 'not yet...';
};

const showTable = (table: Table) => {
  console.log(table.toString());
};

// 'daily' と 'oneShot' を別々の table で表示
const insertRows = (todoCategorySelector: TodoCategoryType) => {
  const headerItem = [
    'ID',
    'Done',
    'TodoType',
    'Content',
    'Deadline',
    'UpdateAt',
  ];
  const table = generateTableOnlyHeader(headerItem);
  const todoMap = returnTodoMap();
  todoMap.forEach(v => {
    if (v.isDeleted) return table;
    if (v.todoCategory !== todoCategorySelector) return table;
    const { id, todoCategory, content, deadline, isDone, updateAt } = v;
    const todoShaped = [
      id,
      convertBool(isDone),
      todoCategory,
      content,
      deadline,
      returnDate(new Date(updateAt)),
    ];

    return table.push(todoShaped);
  });

  return table;
};

export const executeShowTable = (): void => {
  const tableDaily = insertRows('daily');
  const tableOneShot = insertRows('oneShot');
  showTable(tableDaily);
  showTable(tableOneShot);
};
