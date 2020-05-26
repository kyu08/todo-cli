import cac from 'cac';
import { addTodo } from './Inquirer';
import { executeDeleteProp, executeDoneProp } from './TodoMap';
import { executeShowTable } from '../View';
import { executeAddTodo } from './Todo';

const cli = cac();

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo()
      .then(todo => {
        executeAddTodo(todo);
      })
      .catch(e => {
        console.log(e);
      });
  });

  cli
    .command('done [idString]', 'Enter todo id which you want to be done.')
    .action(idString => {
      executeDoneProp(idString);
    });

  cli
    .command('delete [idString]', 'Enter todo id which you want to be deleted.')
    .action(idString => {
      executeDeleteProp(idString);
    });

  cli.command('show', 'show todo-list').action(() => {
    executeShowTable();
  });

  cli.help();
  cli.parse();
};
