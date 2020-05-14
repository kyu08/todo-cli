import {tableNomal} from "./Table";
import {read} from "./Todo";

const convertBool = (done: boolean): string => {
  if(done) return "done!";
  return "not yet...";
}

export const show = () => {
  const table = tableNomal;
  read().forEach((v, k) => {
    if (v.deleted) return table;
    const id = k;
    const {taskKind, content, deadline, done} = v;
    const taskShaped = [id, convertBool(done), taskKind, content, deadline];
    return table.push(taskShaped);
  })
  console.log(table.toString());
}
