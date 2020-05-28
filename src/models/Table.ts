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

// todo Set オブジェクト使ってみよう！
export const generateTableOnlyHeader = (headerItems: string[]): Table => {
  const table = new Table({ chars });
  const decorated = headerItems.map(e => {
    return colors.bold.green(e);
  });
  table.push(decorated);

  return table;
};
