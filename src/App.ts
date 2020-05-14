// todo 他にどんなクラスが必要？ ファイル操作のclass とか？
import {bootCac} from "./Cac";

export const path = "task.json";

export class App {
  mount = () => {
    bootCac();
  }
}

// #11 これ以下を別ファイルに分離したい

// const debug = () => {
//   const table = tableForDebug;
//   read().forEach((k, v) => {
//     const id = k;
//     const {taskKind, content, deadline, done, deleted} = v;
//     const taskShaped = [id, convertBool(done), taskKind, content, deadline, deleted];
//     return table.push(taskShaped);
//   })
//   console.log(table.toString());
// }
