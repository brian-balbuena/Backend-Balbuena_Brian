const socket = io();


Swal.fire({
  title: `Bienvenid@ ${userName}`,
  icon: "success",
  showConfirmButton: false,
  timer: 1500
});

const sendButton = document.getElementById('inputButton');
const inputData = document.getElementById('inputData');
const outputData = document.getElementById('outputData');

window.onload = () => {
  inputData.focus();
}

function sendData() {
  socket.emit('userMessage', { user: `${userName}`, message: inputData.value });

  inputData.value = '';
  inputData.focus();
}

sendButton.addEventListener('click', () => {
  sendData();
});

inputData.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if(!!inputData.value.trim()){
      sendData();
    }
    
  }
});

socket.on('setMessages', data => {
  let messages = ''

  data.forEach(message => {
    messages += `${message.user}: ${message.message} <br/>`
  });

  outputData.innerHTML = messages;
});