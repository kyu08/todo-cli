import cac from 'cac';
import { addTodo } from './Inquirer';
import { updateProp } from './TodoMap';
import { show } from '../View';

const cli = cac();

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo();
  });

  cli
    .command('done [idString]', 'Enter todo id which you want to be done.')
    .action(idString => {
      updateProp<boolean>(idString, 'isDone', true, 'Done todo!');
      show();
    });

  cli
    .command('delete [idString]', 'Enter todo id which you want to be deleted.')
    .action(idString => {
      updateProp<boolean>(idString, 'isDeleted', true, 'Deleted todo!');
      show();
    });

  cli.command('show', 'show todo-list').action(() => {
    show();
  });

  cli.help();
  cli.parse();
};
