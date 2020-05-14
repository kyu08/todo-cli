import cac from "cac";
import {addTodo} from "./Inquirer";
import {hasNoTodo, searchTodo} from "./TodoMap";
import {show} from "./View";
import {writeFile} from "./Dao";
const cli = cac()

export const bootCac = () => {
  cli.command('add', 'Enter task id which you want to be done.').action(() => {
    addTodo();
    console.log("Added task!");
  });

  cli.command('done [id]', 'Enter task id which you want to be done.').action(() => {
    const id = process.argv[2];
    console.log(`Made task done!(id: ${id})`);
  });

  cli.command('delete [id]', 'Enter task id which you want to be done.').action(() => {
    const id = Number(process.argv[2]); // これstring やんけ！
    if (id === NaN) return;
    if (hasNoTodo(id)) return;
    const task = searchTodo(id);
    // task の id がundefined なのでうまくいかない。 delete id はやめよう。
    // ここから！！！！！！
    const newTasks = task.deteteTask();
    writeFile(newTasks);
    console.log(`Deleted task! (id: ${id})`);
  });

  cli.command('show', 'show todo-list').action(() => {
    show();
  });

  cli.help();
  cli.parse();
}