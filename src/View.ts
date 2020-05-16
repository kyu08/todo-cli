import { tableNormal } from './models/Table';
// eslint-disable-next-line import/no-cycle
import { read } from './models/Todo';

const convertBool = (done: boolean): string => {
  if (done) return 'done!';

  return 'not yet...';
};

export const show = () => {
  const table = tableNormal;
  const todoMap = read();
  todoMap.forEach((v, k) => {
    if (v.deleted) return table;
    const id = k;
    const { todoKind, content, deadline, done, updateAt } = v;
    const todoShaped = [
      id,
      convertBool(done),
      todoKind,
      content,
      deadline,
      updateAt,
    ];

    return table.push(todoShaped);
  });
  console.log(table.toString());
};
