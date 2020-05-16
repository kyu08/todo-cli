import Table from 'cli-table';
import colors from 'colors';

const chars = {
  top: '═',
  'top-mid': '╤',
  'top-left': '╔',
  'top-right': '╗',
  bottom: '═',
  'bottom-mid': '╧',
  'bottom-left': '╚',
  'bottom-right': '╝',
  left: '║',
  'left-mid': '╟',
  mid: '─',
  'mid-mid': '┼',
  right: '║',
  'right-mid': '╢',
  middle: '│',
};

const tableNormal = new Table({ chars });
const head = ['id', 'done', 'todoType', 'content', 'deadline', 'updateAt'];

const headerDecorated = head.map(e => {
  return colors.bold.green(e);
});

tableNormal.push(headerDecorated);

const tableForDebug = new Table({ chars });
const headerForDebug = [
  'id',
  'done',
  'todoType',
  'content',
  'deadline',
  'deleted',
];
tableForDebug.push(headerForDebug);

export { tableNormal, tableForDebug };
