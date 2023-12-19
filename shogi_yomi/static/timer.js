let SenteTime = 0;
let GoteTime = 0;
let nowTurn = "Sente";

function setTimers() {
  let timeLimitMinutes = parseInt(document.getElementById('timeLimitInput').value, 10);
  let SecondsLimit = parseInt(document.getElementById('SecondsLimitInput').value, 10);

  if (isNaN(SecondsLimit) || SecondsLimit < 0) {
    alert('正しい時間を入力してください。');
    return;
  }

  //値を代入
  SenteTime = timeLimitMinutes*60;
  GoteTime = timeLimitMinutes*60;
  //初期表示
  updateTimer("SenteTime",SenteTime);
  updateTimer("GoteTime",GoteTime);

  //手番を設定し、現在のカウントを止め、スタート
  nowTurn = "Sente";
  stopTimers();
  startTimers();
}

function startTimers() {
  //先手の時
  if (nowTurn=="Sente"){
    // タイマーを開始
    SenteTimerId = setInterval(function() {
      SenteTime -= 0.1;

      if (SenteTime <= 0) {
        clearInterval(SenteTimerId);
        alert('先手の時間切れです！');
      }

      updateTimer('SenteTime', Math.round(SenteTime));
    }, 100); // 0.1秒ごとにカウントダウン
  }

  //後手の時
  else{
    GoteTimerId = setInterval(function() {
      GoteTime -= 0.1;
  
      if (GoteTime <= 0) {
        clearInterval(GoteTimerId);
        alert('後手の時間切れです！');
      }
  
      updateTimer('GoteTime', Math.round(GoteTime));
    }, 100); // 0.1秒ごとにカウントダウン
  }
}

//手番交代
function changeTurn() {
  if (nowTurn == "Sente"){
    clearInterval(SenteTimerId);
    nowTurn="Gote"
  } else {
    clearInterval(GoteTimerId);
    nowTurn="Sente"
  }
  startTimers()
}

//休憩
function stopTimers(){
  if (nowTurn == "Sente"){
    clearInterval(SenteTimerId);
  } else {
    clearInterval(GoteTimerId);
  }
}
//再開
function resumeTimers() {
  startTimers();
}

//表示更新
function updateTimer(timerId, time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  document.getElementById(timerId).textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}