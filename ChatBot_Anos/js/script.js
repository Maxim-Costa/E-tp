window.addEventListener("load", loading);
window.addEventListener("resize", resizeSearchBar);

function loading() {
  resizeSearchBar();
  send(1, {"answer":"Bienvenus sur le bot chat"});
}

function resizeSearchBar() {
  let searchBar = document.getElementById("search");
  searchBar.style.width = window.innerWidth - 70 + "px";

  let containerMsg = document.getElementById("containerMsg");
  containerMsg.style.height = window.innerHeight - 70 + "px";
}

function request(msg) {
  var settings = {
    url: `http://103.best:5005/api/v2/ask?preview=True&question=${msg.split(" ").join("+")}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response)
    send(1, response);
  });
}

function gotoBottom(id) {
  var element = document.getElementById(id);
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

function send(who = 1, msg = false) {
	let All = {}
  if (!msg) {
    msg = document.getElementById("search").value;
    document.getElementById("search").value = "";
  } else {
  	All = msg
  	msg = msg.answer
  }
  if (msg) {
  var NewMsg =
    '<div class="container darker">'+
    '<div >' +
    '<img src="./img/Avatar' +
    who +
    '.png" alt="Avatar" class="Avatar ' +
    (who === 1 ? "" : "right") +
    '" />' +
    '<div class="' +
    (who === 1 ? "" : "rightText") +
    '">' +
    (msg.includes("https://")
      ? '<p><a href="' + msg + '">' + msg + "</a></p>"
      : "<p>" + msg + "</p>") +
    "</div>" +
    "</div>"+
    ((who === 1 && msg.includes("https://")) ? ("<div class='cardContainer'><div class='cardImgContainer'><img src='"+All.preview.image+"' class='card'></div><hr style='border-color: lightgray;margin-left: 20px;margin-right: 10px;'><div class='mainContainer'><div><a href='"+All.preview.url+"'>"+All.preview.title+"</a></div><p class='cardDesc'>"+All.preview.description+"</p></div></div>") : "")	+
	'<span class="' +
    (who === 1 ? "time-right" : "time-left") +
    '">' +
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    "</span>" +
    "</div>";
  document.getElementById("containerMsg").innerHTML += NewMsg;
  if (who == 2) {
    request(msg);
  }
  gotoBottom("containerMsg");
  }
}

