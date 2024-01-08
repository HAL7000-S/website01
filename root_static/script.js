let nameButton = document.querySelector("button");
let yourHeaddingName = document.querySelector(".yourName");
let age_value = document.querySelector(".age");
let age;

// window.onloadは、ウェブページが完全に読み込まれたときに実行される関数を設定するための方法です。
// 年齢更新関数
window.onload = function () {
    var today = new Date();
    age_value.textContent = today.getFullYear() - 2003;
    }


// 相手の名前代入
if (!localStorage.getItem("name")) {
    localStorage.setItem("name", yourName);
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    yourHeaddingName.textContent = `また会いましたね。${storedName}`;
}

// クリック時の変更
function setUserName() {
    const yourName = prompt("あなたの名前を入力してください。");
    localStorage.setItem("name", yourName);
    yourHeaddingName.textContent = `初めまして、${yourName}!`;
    }
// クリック時の名前変更
nameButton.onclick = () => {
    setUserName();
  };