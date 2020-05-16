import cac from "cac";
import {addTodo} from "./Inquirer";
import {hasNoTodo, searchTodo} from "./TodoMap";
import {show} from "../View";
import {writeFile} from "../dao/Dao";
import {read} from "./Todo";

const cli = cac()

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo();
    console.log("Added todo!");
  });

  cli.command('done [id]', 'Enter todo id which you want to be done.').action(() => {
    const id = Number(process.argv[3]);
    if (id === NaN) return;
    if (hasNoTodo(id)) return;
    const todoMap = read();
    const todo = searchTodo(id);
    const newTodo = todo.doneTodo();
    const newTodos = todoMap.set(id, newTodo);
    writeFile(newTodos);
    console.log(`Made it done! (id: ${id})`);
  });

  cli.command('delete [id]', 'Enter todo id which you want to be done.').action(() => {
    // ここも分離したい
    const id = Number(process.argv[3]);
    if (id === NaN) return;
    if (hasNoTodo(id)) return;
    const todoMap = read();
    const todo = searchTodo(id);
    const newTodo = todo.deleteTodo();
    const newTodos = todoMap.set(id, newTodo);
    writeFile(newTodos);
    console.log(`Deleted todo! (id: ${id})`);
  });

  cli.command('show', 'show todo-list').action(() => {
    show();
  });

  cli.help();
  cli.parse();
}