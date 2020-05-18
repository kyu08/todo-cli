import cac from 'cac';
import { addTodo } from './Inquirer';
import { hasNoTodo, searchTodo, updateBoolean } from './TodoMap';
import { show } from '../View';

const cli = cac();

const guardIncorrectId = (id: number): boolean => {
  if (Number.isNaN(id) || hasNoTodo(id)) {
    console.log('ID you entered was incorrect.');

    return true;
  }

  return false;
};

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo();
  });

  cli
    .command('done [idString]', 'Enter todo id which you want to be done.')
    .action(idString => {
      const id = Number(idString);
      const todo = searchTodo(id);
      const newTodo = todo.doneTodo();
      if (guardIncorrectId(id)) return;
      updateBoolean(id, newTodo, 'Done todo!');
      show();
    });

  cli
    .command('delete [idString]', 'Enter todo id which you want to be done.')
    .action(idString => {
      const id = Number(idString);
      const todo = searchTodo(id);
      const newTodo = todo.deleteTodo();
      if (guardIncorrectId(id)) return;
      updateBoolean(id, newTodo, 'Deleted todo!');
      show();
    });

  cli.command('show', 'show todo-list').action(() => {
    show();
  });

  cli.help();
  cli.parse();
};
