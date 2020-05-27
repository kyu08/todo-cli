import Table from 'cli-table';
import chalk from 'chalk';
import { generateTableOnlyHeader } from './models/Table';
// eslint-disable-next-line import/no-cycle
import { returnTodoMap, TodoCategoryType, TodoProps } from './models/Todo';
import { returnDate } from './models/Date';

const convertBool = (isDone: boolean): string => {
  if (isDone) return 'done!';

  return 'not yet...';
};

const showTable = (table: Table): void => {
  console.log(table.toString());
};

// 'daily' と 'oneShot' を別々の table で表示
const insertRows = (todoCategorySelector: TodoCategoryType): Table => {
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
    const {
      id,
      todoCategory,
      content,
      deadline,
      isDone,
      updateAt,
      isDeleted,
    }: TodoProps = v;
    if (isDeleted) return table;
    if (todoCategory !== todoCategorySelector) return table;
    const todoShaped: [
      number,
      string,
      TodoCategoryType,
      string,
      string,
      string,
    ] = [
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

const showTableTitle = (tableTitle: string): void => {
  // todo ここの空白もっと綺麗に書きたい
  console.log(
    chalk.bold.whiteBright.bgGray(
      `                         ${tableTitle}                         `,
    ),
  );
};

export const executeShowTable = (): void => {
  const tableDaily = insertRows('daily');
  const tableOneShot = insertRows('oneShot');
  showTableTitle('Daily Todo Table');
  showTable(tableDaily);
  showTableTitle('OneShot Todo Table');
  showTable(tableOneShot);
};
