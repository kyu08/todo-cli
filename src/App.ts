import { bootCac } from './models/Cac';
import { executeInitializeDailyTodo } from './models/TodoMap';

export class App {
  mount = () => {
    executeInitializeDailyTodo();
    bootCac();
  };
}
