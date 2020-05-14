import fs from "fs";
import {path} from "./App";

export const writeFile = (tasks: Map<any, any>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(tasks)));
}