# tl;dr
cli で使えるtodoアプリ。デイリータスクとやりきりのタスクを別の一覧で管理することができる。

# 使用方法
```
// インストール
$ npm install -g great-todo-cli
// todo を追加 (todo content は半角で記述してください)
$ todo add
// すべてのtodoをtodo category 別に表示
$ todo show
// (taskId: number) todo を実行済みにする
$ todo done <taskId>
// (taskId: number) todo を削除
$ todo delete <taskId>
```

![todo add1](https://github.com/kyu08/todo-cli/blob/images/todo-cli1.png?raw=true)

![todo add2](https://github.com/kyu08/todo-cli/blob/images/todo-cli2.png?raw=true)

![todo add3](https://github.com/kyu08/todo-cli/blob/images/todo-cli3.png?raw=true)

![todo add show](https://github.com/kyu08/todo-cli/blob/images/todo-cli4.png?raw=true)

# 機能
- todo を表示する
  - todoをoneShot と dailyTask、別々に一覧表示。
  - 表形式でみやすく表示
- 日付が変わったらdailyTaskは自動的に done: false に切り替わる。
- todoを追加できる
  - 対話形式で入力していく
- doneにできる
- todoは削除することができる

# 開発者向け
- cloneしたのち、以下のコマンドを実行することでtodoコマンドを実行できる状態になります。
```
$ npm i
$ npm run build
```
- テストコードは`src/test`に配置されています。`$ npm test`でテストが実行されます。

This software is released under the MIT License, see LICENSE.md
