import { bootCac } from './models/Cac';
import { executeInitializeDailyTodo } from './models/TodoMap';
import { sureJSONExist } from './dao/Dao';

export class App {
  mount = (): void => {
    sureJSONExist();
    executeInitializeDailyTodo();
    bootCac();
  };
}
