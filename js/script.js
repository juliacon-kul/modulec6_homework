const wsUri = "wss://echo.websocket.org/";
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
const output = document.getElementById("output");
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
let geo_flag  = false; 
let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}
function writeToScreenGeo(message) {
  let link =  document.createElement("a");
  link.href = message;
  link.textContent = 'Ссылка на карту';
  link.target = "_blank";
  output.appendChild(link);
 }
websocket = new WebSocket(wsUri);
  
  websocket.onmessage = function(evt) {
    console.log(evt)
    if (geo_flag == false){
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
   )}
    else {
      writeToScreenGeo(evt.data)
    }
  };
  
 
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };

btnSend.addEventListener('click', () => {
  
  const message = document.getElementById('input1').value;
  writeToScreen("SENT: " + message);
  geo_flag=false;
  websocket.send(message);
  
});
// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  // writeToScreenGeo(latitude, longitude);
  websocket.send(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude} `);
  
  // console.log(a);
 // status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  
};
btnGeo.addEventListener('click', () => {
  // mapLink.href = '';
  // mapLink.textContent = '';
  var sendlink = '';
  if (!navigator.geolocation) {
    writeToScreen ('Geolocation не поддерживается вашим браузером')
  } 
  else {
    // status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
    geo_flag = true;
    
    // console.log(sendlink)
    };
});
