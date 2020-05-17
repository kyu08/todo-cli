import cac from 'cac';
// eslint-disable-next-line import/no-cycle
import { addTodo } from './Inquirer';
// eslint-disable-next-line import/no-cycle
import { hasNoTodo, searchTodo } from './TodoMap';
// eslint-disable-next-line import/no-cycle
import { show } from '../View';
// eslint-disable-next-line import/no-cycle
import { writeFile } from '../dao/Dao';
// eslint-disable-next-line import/no-cycle
import { read } from './Todo';

const cli = cac();

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo();
    console.log('Added todo!');
  });

  cli
    .command('done [id]', 'Enter todo id which you want to be done.')
    .action(() => {
      const id = Number(process.argv[3]);
      if (Number.isNaN(id)) return;
      if (hasNoTodo(id)) return;
      const todoMap = read();
      const todo = searchTodo(id);
      const newTodo = todo.doneTodo();
      const newTodos = todoMap.set(id, newTodo);
      writeFile(newTodos);
      console.log(`Made it done! (id: ${id})`);
    });

  cli
    .command('delete [id]', 'Enter todo id which you want to be done.')
    .action(() => {
      // ここも分離したい
      const id = Number(process.argv[3]);
      if (Number.isNaN(id)) return;
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
};
