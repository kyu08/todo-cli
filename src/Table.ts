import Table from "cli-table";
const chars = { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
  , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
  , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
  , 'right': '║' , 'right-mid': '╢' , 'middle': '│' };

const tableNomal = new Table({chars});
const headerNomal = ["id", "done", "todoType", "content", "deadline"];
tableNomal.push(headerNomal);

const tableForDebug = new Table({chars});
const headerForDebug = ["id", "done", "todoType", "content", "deadline", "deleted"];
tableForDebug.push(headerForDebug);

export {tableNomal, tableForDebug};