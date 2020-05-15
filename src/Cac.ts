import cac from "cac";
import {addTodo} from "./Inquirer";
import {hasNoTodo, searchTodo} from "./TodoMap";
import {show} from "./View";
import {writeFile} from "./Dao";
const cli = cac()

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo();
    console.log("Added todo!");
  });

  cli.command('done [id]', 'Enter todo id which you want to be done.').action(() => {
    const id = process.argv[2];
    console.log(`Made todo done!(id: ${id})`);
  });

  cli.command('delete [id]', 'Enter todo id which you want to be done.').action(() => {
    const id = Number(process.argv[2]); // これstring やんけ！
    if (id === NaN) return;
    if (hasNoTodo(id)) return;
    const todo = searchTodo(id);
    // todo の id がundefined なのでうまくいかない。 delete id はやめよう。
    // ここから！！！！！！
    // ここなんか微妙じゃね？
    // const newTodo = todo.deleteTodo();
    // const newTodos = read().set(id, newTodo);
    // じゃね？
    const newTodos = todo.deteteTodo();
    writeFile(newTodos);
    console.log(`Deleted todo! (id: ${id})`);
  });

  cli.command('show', 'show todo-list').action(() => {
    show();
  });

  cli.help();
  cli.parse();
}