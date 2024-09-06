// Garoonの予定変更の履歴を表示するカスタマイズ
// 仕組みとしては、datastoreに差分を管理するデータを保存していって、表示するときに差分を見やすく表示する
import { DetailedDiff, detailedDiff } from 'deep-object-diff';
const DATASTORE_KEY: string = "garoon.event.history.customize";

interface DataStoreObject {
  histories: HistoryData[]
}

interface HistoryData {
  updater: string, //名前だけで良い
  subject: string,
  start: string, //datetimeがあれば良い
  end: string,
  attendies: {[key: string]: string}, //名前の配列 後で所属を消す処理を書く
  facilities: {[key: string]: string}, //名前の配列
  notes: string,
}

interface DiffObject {
  subject?: string,
  start?: string,
  end?: string,
  attendies?: object,
  facilities?: object,
  notes?: string,
}

garoon.events.on([
  "schedule.event.create.submit.success",
  "schedule.event.quick.create.submit.success",
  "schedule.event.edit.submit.success",
  "schedule.event.quick.edit.submit.success"
], JSAPIで登録成功_簡易登録成功_変更成功_簡易変更成功イベントをフックする);

garoon.events.on("schedule.event.detail.show", JSAPIで予定の表示イベントをフックする);

garoon.events.on("schedule.event.create.show", (event: ScheduleEventCreateShow): ScheduleEventCreateShow => {
  try {
    // 作成時にはダミーとしてhistoryを空にする
    garoon.schedule.event.datastore.set(DATASTORE_KEY, {value: {histories: []}});
  } catch(e) {
    // 再利用だとたぶん失敗するが、登録に失敗しても特に何もしない
  };
  return event;
});

async function JSAPIで登録成功_簡易登録成功_変更成功_簡易変更成功イベントをフックする(event: BaseScheduleEventObject): BaseScheduleEventObject {
  if (! is通常予定(event)) {
    return event;
  }
  await 予定内容をdatastoreへ保存する(event);
  return event;
}

function JSAPIで予定の表示イベントをフックする(event: BaseScheduleEventObject): BaseScheduleEventObject {
  if (! is通常予定(event)) {
    return event;
  }
  取得用のボタンをinsertTableRowで表示する();
  return event;
}

function is通常予定(baseEventObj: BaseScheduleEventObject): boolean {
  const event = baseEventObj.event;
  return event.eventType === "REGULAR";
}

function ボタンを押した時の内容(event: MouseEvent): void {
  const el = event.target as HTMLButtonElement;
  ボタンを消してinsertTableRowに差分を表示する(el);
}

// datastoreは存在しないときはPOST、存在するときはPUTで更新する
// つまり、基本的には作成ならPOSTで、変更ならPUTになるはず
// ただここで、再利用の場合は作成なのに、再利用元のdatastoreが残っているのでPUTにしなければならない
// ではデータが有れば削除とか、再利用なら削除とかしたいが、再利用作成画面ではイベントIDが決まっていないので、削除のREST APIが実行できない。
// また、JavaScript APIでdatastoreを空オブジェクトで更新することもできない。バリデーションエラー。
// 
// よって、解決策は必ずPUTで更新するようにして、作成時にはダミーのdatastoreをあらかじめ入れておくようにする。
// 作成時にはhistoryは問答無用で初期化するので、これでなんとかなるはず。
async function 予定内容をdatastoreへ保存する(baseEventObj: BaseScheduleEventObject): Promise<void> {
  const event: ScheduleEvent = baseEventObj.event;
  const histories: HistoryData[] = (isPost(baseEventObj)) ? [] : await これまでの予定の内容をRESTAPIでdatastoreから取得する(Number(event.id));
  if (baseEventObj.type === "schedule.event.quick.create.submit.success") {
    // なんか簡易登録だとattendeesとfacilitiesがないので作成者をこっちで無理やり入れる。バグか？
    // https://cybozu.dev/ja/garoon/docs/overview/schedule-object/#schedule-object-attendees
    event.attendees = [{
      id: event.creator.id,
      code: event.creator.code,
      name: event.creator.name,
      type: "USER",
      attendanceResponse: {
        status: "",
        comment: ""
      }
    }];
    event.facilities = [];
    // 簡易登録はスケジュール作成画面を通らないので、schedule.event.create.showイベントが発火しない
    // ここでまずdatastoreを初期化する
    await garoon.api(`/api/v1/schedule/events/${Number(event.id)}/datastore/${DATASTORE_KEY}`, 'POST', {value: {histories: []}});
  }
  const newHistory = ScheduleEventからHistoryDataを作る(event);
  
  // historiesの最初にnewHistoryを追加し、4つ以上なら最後の履歴は捨てる
  histories.unshift(newHistory);
  if (histories.length > 4) {
    histories.pop();
  }
  const eventId: number = Number(event.id);

  // REST APIでdatastoreに保存
  await garoon.api(`/api/v1/schedule/events/${eventId}/datastore/${DATASTORE_KEY}`, 'PUT', {value: {histories: histories}});
}

function isPost(event: BaseScheduleEventObject): boolean {
  return event.type === "schedule.event.create.submit.success" || event.type === "schedule.event.quick.create.submit.success";
}

function 取得用のボタンをinsertTableRowで表示する() {
  // Reactで書きたかった
  // ボタンを押したときの内容を実行するボタンを作成。
  const button = document.createElement("button");
  button.textContent = "履歴を表示";
  button.addEventListener("click", ボタンを押した時の内容);

  garoon.schedule.event.insertTableRow("履歴を表示", button);
}

function datastoreの内容を呼び出しJSONの差分を計算する(before: HistoryData, after:HistoryData) {
  return detailedDiff(before, after);
}

async function ボタンを消してinsertTableRowに差分を表示する(element: HTMLButtonElement): Promise<void> {
  const histories = await これまでの予定の内容をJSAPIでdatastoreから取得する();
  let diffString: string = "<div>";
  // 配列の次の要素との差分を計算し、diffStringに追加していく
  // 配列の最後まで続ける
  if (histories.length <= 1) {
    diffString += "履歴はありません。<br>";
  } else {
    for (let i = 0; i < histories.length - 1; i++) {
      diffString += `${i+1}世代前 更新者: ${histories[i].updater}<br>`;
      const diff = datastoreの内容を呼び出しJSONの差分を計算する(histories[i + 1], histories[i]);
      diffString += diffをいい感じに表示する(diff, histories[i+1]);
      diffString += "<br>";
    }
  }
  diffString += "</div>";
  const parent = element.parentElement as HTMLElement;
  element.remove();
  parent.innerHTML = diffString;
}

function diffをいい感じに表示する(diff: DetailedDiff, before: HistoryData): string {
  let diffString: string = "";

  let added: DiffObject = diff.added;
  let updated: DiffObject = diff.updated;
  let deleted: DiffObject = diff.deleted;

  if (updated.subject) {
    diffString += `　タイトルが「${before.subject}」から「${updated.subject}」に変更されました。<br>`;
  }
  if (updated.start) {
    diffString += `　開始日時が「${before.start}」から「${updated.start}」に変更されました。<br>`;
  }
  if (updated.end) {
    diffString += `　終了日時が「${before.end}」から「${updated.end}」に変更されました。<br>`;
  }
  if (added.attendies) {
    const joinAttendiesName = Object.values(added.attendies).join("」、「");
    diffString += `　参加者に「${joinAttendiesName}」が追加されました。<br>`;
  }
  if (deleted.attendies) {
    // attendiesはオブジェクトなので、名前だけを取り出して「、」でつなげる
    const joinAttendiesName = Object.values(deleted.attendies).join("」、「");
    diffString += `　参加者から「${joinAttendiesName}」が削除されました。<br>`;
  }
  if (added.facilities) {
    const joinFacilitiesName = Object.values(added.facilities).join("」、「");
    diffString += `　施設に「${joinFacilitiesName}」が追加されました。<br>`;
  }
  if (deleted.facilities) {
    const joinFacilitiesName = Object.values(deleted.facilities).join("」、「");
    diffString += `　施設から「${joinFacilitiesName}」が削除されました。<br>`;
  }
  if (updated.notes) {
    diffString += `　メモが「${before.notes}」から「${updated.notes}」に変更されました。<br>`;
  }
  return diffString;
}

function ScheduleEventからHistoryDataを作る(event: ScheduleEvent): HistoryData {
  return {
    updater: event.updater.name,
    subject: event.subject,
    start: event.start.dateTime,
    end: event.end.dateTime,
    attendies: transformAttendeesAndFacilities(event.attendees),
    facilities: transformAttendeesAndFacilities(event.facilities),
    notes: event.notes
  };

}

// codeをキーにしてnameを取り出す
function transformAttendeesAndFacilities(obj: {code: string, name: string}[]): { [key: string]: string } {
  const result: { [key: string]: string } = {};
  obj.forEach((obj) => {
    result[obj.code] = obj.name;
  });
  return result;
}

async function これまでの予定の内容をJSAPIでdatastoreから取得する(): Promise<HistoryData[]> {
  let value: Object  = {};
  const data = await garoon.schedule.event.datastore.get(DATASTORE_KEY);
  if ( data != undefined) {value = data.value;}

  // valueが履歴の配列じゃなかったら空の配列を作って返す
  return isDataStoreObject(value) && Array.isArray(value.histories) ? value.histories : [];
}

async function これまでの予定の内容をRESTAPIでdatastoreから取得する(eventId: number): Promise<HistoryData[]> {
  let value: Object  = {};
  const data = await garoon.api(`/api/v1/schedule/events/${eventId}/datastore/${DATASTORE_KEY}`, 'GET', {});
  if ( data != undefined) {value = data.data.value;}

  // valueが履歴の配列じゃなかったら空の配列を作って返す
  return isDataStoreObject(value) && Array.isArray(value.histories) ? value.histories : [];
}

function isDataStoreObject(obj: unknown): obj is DataStoreObject {
  return typeof obj === 'object' && obj !== null && 'histories' in obj;
}
