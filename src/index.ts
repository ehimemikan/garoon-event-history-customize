// Garoonの予定変更の履歴を表示するカスタマイズ
// 仕組みとしては、datastoreに差分を管理するデータを保存していって、表示するときに差分を見やすく表示する

const DATASTORE_KEY: string = "garoon-event-history-customize";

interface HistoryData {
  updater: string, //名前だけで良い
  subject: string,
  start: string, //datetimeがあれば良い
  end: string,
  attendies: string[], //名前の配列
  facilities: string[], //名前の配列
  notes: string,
}

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

garoon.events.on([
  "schedule.event.create.submit.success",
  "schedule.event.quick.create.submit.success",
  "schedule.event.edit.submit.success",
  "schedule.event.quick.edit.submit.success"
], JSAPIで登録成功_簡易登録成功_変更成功_簡易変更成功イベントをフックする);

function JSAPIで登録成功_簡易登録成功_変更成功_簡易変更成功イベントをフックする(event: BaseScheduleEventObject): BaseScheduleEventObject {
  予定内容をdatastoreへ保存する(event.event);
  return event;
}

function JSAPIで予定の表示イベントをフックする() {  
  取得用のボタンをinsertTableRowで表示する();
}

function ボタンを押した時の内容(this: HTMLElementEvent<HTMLButtonElement>, event: MouseEvent): void {
  datastoreの内容を呼び出しJSONの差分を計算する();
  ボタンを消してinsertTableRowに差分を表示する();
}

function 予定内容をdatastoreへ保存する(event: ScheduleEvent): void {
  const histories: HistoryData[] = これまでの予定の内容をdatastoreから取得する();
  const newHistory = ScheduleEventからHistoryDataを作る(event);
  
  // historiesの最初にnewHistoryを追加し、4つ以上なら最後の履歴は捨てる
  histories.unshift(newHistory);
  if (histories.length > 4) {
    histories.pop();
  }

  garoon.schedule.event.datastore.set(DATASTORE_KEY, histories);
}

function 取得用のボタンをinsertTableRowで表示する() {
  // Reactで書きたかった
  // ボタンを押したときの内容を実行するボタンを作成。
  const button = document.createElement("button");
  button.textContent = "履歴を表示";
  button.addEventListener("click", ボタンを押した時の内容);

  garoon.schedule.event.insertTableRow("履歴を表示", button);
}

function datastoreの内容を呼び出しJSONの差分を計算する() {
  // TBD
  // いったん生dataを出す
}

function ボタンを消してinsertTableRowに差分を表示する(element: HTMLElementEvent<HTMLButtonElement>, event: MouseEvent): any {
  const histories = これまでの予定の内容をdatastoreから取得する();
}

function ScheduleEventからHistoryDataを作る(event: ScheduleEvent): HistoryData {
  return {
    updater: event.updater.name,
    subject: event.subject,
    start: event.start.dateTime,
    end: event.end.dateTime,
    attendies: event.attendees.map(a => a.name),
    facilities: event.facilities.map(f => f.name),
    notes: event.notes
  };

}

function これまでの予定の内容をdatastoreから取得する(): HistoryData[] {
  const data: unknown = garoon.schedule.event.datastore.get(DATASTORE_KEY);
  return data as HistoryData[];
}