const container = document.getElementById('container');
const random = document.getElementById('random');
const change = document.getElementById('change');
const inputHex = document.getElementById('input-hex');
const labelHex = document.getElementById('label-hex');
const copy = document.getElementById('copy');
const alertBar = document.getElementById('alert-bar');

eventListeners();

function eventListeners() {
    random.addEventListener('click', getRandomHex);

    change.addEventListener('click', changeHex);
    document.addEventListener('keydown', changeHexWithKey)

    inputHex.addEventListener('focus', resetInput);

    copy.addEventListener('click', copyHex);
}

function checkHex(hex) {
    hexRegex = /^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3}){0,1}/g;
    return hex.match(hexRegex)[0];
}
function resetInput() {
    inputHex.value = '';
}
function showAlert(message) {
    const alert = document.createElement('div');

    alert.className = 'alert';
    alert.textContent = message;

    if (alertBar.childElementCount > 0){
        alertBarArray = Array.from(alertBar.children);
        alertBarArray[0].remove();
    }
    
    alertBar.appendChild(alert);

    window.setTimeout(function(){
        alert.remove();
    }, 2000);
}


function getRandomHex() {
    const randomHex = `#${createRandomHex()}${createRandomHex()}${createRandomHex()}${createRandomHex()}${createRandomHex()}${createRandomHex()}`;

    container.style.backgroundColor = randomHex;
    labelHex.innerHTML = randomHex;
    inputHex.value = randomHex;
}
function createRandomHex() {
    const hexCodeChars= ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let randomChar = hexCodeChars[Math.floor(Math.random() * 16)];
    return randomChar;
}


function changeHex() {
    let inputValue = inputHex.value.trim();
    
    if (inputValue.includes('#')) {
        inputValue = inputValue.replace('#', '');
        if (inputValue.length === 6 || inputValue.length === 3) {
            if (checkHex(inputValue)) {
                container.style.backgroundColor = `#${inputValue}`;
                labelHex.innerHTML = `#${inputValue}`;
            } else {
                inputHex.value = '';
            }
        } else {
            inputHex.value = '';
            showAlert('*Geçersiz Hex.');
        }
    } else {
        if (inputValue.length === 6 || inputValue.length === 3) {
            if (checkHex(inputValue)) {
                container.style.backgroundColor = `#${inputValue}`;
                labelHex.innerHTML = `#${inputValue}`;
            } else {
                inputHex.value = '';
            }
        } else {
            inputHex.value = '';
            showAlert('*Geçersiz Hex.');
        }
    }
}
function changeHexWithKey(e) {
    if (e.key === 'Enter') {
        changeHex();
    }
}


function copyHex() {
    navigator.clipboard.writeText(labelHex.innerHTML);
}
