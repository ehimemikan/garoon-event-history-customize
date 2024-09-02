JS APIで登録成功, 簡易登録成功, 変更成功, 簡易変更成功イベントをフックする(){
    予定内容をdatastoreへ保存する 
}

JS APIで予定の表示イベントをフックする(){  
    取得用のボタンをinsertTableRowで表示する
}

function ボタンを押した時の内容(){
  datastoreの内容を呼び出し、JSONの差分を計算する
  ボタンを消してinsertTableRowに差分を表示する
}