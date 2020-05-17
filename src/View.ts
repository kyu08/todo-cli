import { tableNormal } from './models/Table';
import { returnTodoMap } from './models/Todo';
import { returnDate } from './models/Date';

const convertBool = (isDone: boolean): string => {
  if (isDone) return 'done!';

  return 'not yet...';
};

export const show = () => {
  const table = tableNormal;
  const todoMap = returnTodoMap();
  todoMap.forEach((v, k) => {
    if (v.isDeleted) return table;
    const id = k;
    const { todoCategory, content, deadline, isDone, updateAt } = v;
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
  console.log(table.toString());
};
