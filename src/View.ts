import {tableNormal} from "./Table";
import {read} from "./Todo";

const convertBool = (done: boolean): string => {
  if(done) return "done!";
  return "not yet...";
}

export const show = () => {
  const table = tableNormal;
  read().forEach((v, k) => {
    if (v.deleted) return table;
    const id = k;
    const {todoKind, content, deadline, done} = v;
    const todoShaped = [id, convertBool(done), todoKind, content, deadline];
    return table.push(todoShaped);
  })
  console.log(table.toString());
}
