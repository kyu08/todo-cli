import { tableNormal } from './models/Table';
import { returnTodoMap } from './models/Todo';

const convertBool = (done: boolean): string => {
  if (done) return 'done!';

  return 'not yet...';
};

export const show = () => {
  const table = tableNormal;
  const todoMap = returnTodoMap();
  todoMap.forEach((v, k) => {
    if (v.deleted) return table;
    const id = k;
    const { todoCategory, content, deadline, done, updateAt } = v;
    const todoShaped = [
      id,
      convertBool(done),
      todoCategory,
      content,
      deadline,
      updateAt,
    ];

    return table.push(todoShaped);
  });
  console.log(table.toString());
};
