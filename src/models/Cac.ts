import cac from 'cac';
import { addTodo } from './Inquirer';
import { updateDelete, updateDone } from './TodoMap';
import { show } from '../View';

const cli = cac();

export const informNaN = (id: number): boolean => {
  if (Number.isNaN(id)) {
    console.log('didnt update.');

    return true;
  }

  return false;
};

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo();
    console.log('Added todo!');
  });

  cli
    .command('done [idString]', 'Enter todo id which you want to be done.')
    .action(idString => {
      const id = Number(idString);
      if (informNaN(id)) return;
      updateDone(id);
      show();
    });

  cli
    .command('delete [idString]', 'Enter todo id which you want to be done.')
    .action(idString => {
      const id = Number(idString);
      if (informNaN(id)) return;
      updateDelete(id);
      show();
    });

  cli.command('show', 'show todo-list').action(() => {
    show();
  });

  cli.help();
  cli.parse();
};
