import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  //input入力欄のステート設定
  const [todoText, settodoText] = useState("");
  //未完了のステート設定
  const [incompleateTodos, setincompleateTodos] = useState([
    "あああ",
    "いいい"
  ]);
  //完了のステート設定
  const [compleateTodos, setcompleateTodos] = useState(["ううう"]);

  //追加ボタン押したらinputの値を受け取るよ
  const onChangeTodoText = (event) => {
    settodoText(event.target.value);
  };
  //追加ボタン押したら未完了のリストに追加するよ
  const onClickAdd = () => {
    //値が空の場合は処理を戻す
    if (todoText === "") return;
    //未完了の配列に値を追加
    const newTodos = [...incompleateTodos, todoText];
    //setの方にこの関数の値（newTodos）をいれるよ
    setincompleateTodos(newTodos);
    //空にするよ
    settodoText("");
  };
  //削除ボタンを押すと未完了リストから削除
  const onClickDeleate = (index) => {
    const newTodos = [...incompleateTodos];
    newTodos.splice(index, 1);
    setincompleateTodos(newTodos);
  };
  //完了ボタン押す
  const onClickCompleate = (index) => {
    //未完了リストから削除　引数を指定する
    const newIncompleateTodos = [...incompleateTodos];
    newIncompleateTodos.splice(index, 1); //引数を指定,何個消すか
    setincompleateTodos(newIncompleateTodos);

    //削除したものを完了リストへ追加
    const newCompleateTodos = [...compleateTodos, incompleateTodos[index]];
    setcompleateTodos(newCompleateTodos);
  };
  //完了リストの戻すボタン
  const onClickReturn = (index) => {
    //完了リストから削除
    const newCompleateTodos = [...incompleateTodos];
    newCompleateTodos.splice(index, 1); //引数を指定,何個消すか
    setcompleateTodos(newCompleateTodos);

    //未完了リストへ追加
    const newIncompleateTodos = [...incompleateTodos, compleateTodos[index]];
    setincompleateTodos(newIncompleateTodos);
  };

  return (
    <>
      <div class="input-area">
        <input
          id="add-txt"
          value={todoText}
          onChange={onChangeTodoText}
          placeholder="TODOを入力"
        />
        <button id="add-btn" onClick={onClickAdd}>
          追加
        </button>
      </div>
      <div class="incompleate-area">
        <p class="title">未完了のTODO</p>
        <ul id="incompleate-list">
          {incompleateTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <p>{todo}</p>
                <button onClick={() => onClickCompleate(index)}>完了</button>
                <button onClick={() => onClickDeleate(index)}>削除</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="compleate-area">
        <p class="title">完了したTODO</p>
        <ul id="compleate-list">
          {compleateTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <p>{todo}</p>
                <button onClick={() => onClickReturn(index)}>戻す</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
