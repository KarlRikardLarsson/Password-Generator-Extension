document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyToClipboard);
document.getElementById('lockButton').addEventListener('click', toggleLock);

const lengthRange = document.getElementById('lengthRange');
const lengthNumber = document.getElementById('length');
const notification = document.getElementById('notification');
const lockIcon = document.getElementById('lockIcon');
const strengthMeter = document.getElementById('strengthMeter').firstElementChild;
const passwordField = document.getElementById('password');

lengthRange.addEventListener('input', syncLength);

function syncLength() {
  lengthNumber.value = lengthRange.value;
}

function generatePassword() {
  const length = lengthRange.value;
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let charPool = '';
  if (includeLowercase) charPool += lowercaseChars;
  if (includeUppercase) charPool += uppercaseChars;
  if (includeNumbers) charPool += numberChars;
  if (includeSymbols) charPool += symbolChars;

  if (charPool === '') {
    alert('Please select at least one character set.');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  passwordField.value = password;
  updateStrengthMeter(password);
}

function copyToClipboard() {
  passwordField.select();
  document.execCommand('copy');
  showNotification();
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function toggleLock() {
  lockIcon.classList.toggle('lock-open');
}

function updateStrengthMeter(password) {
  let strength = 0;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  if (password.length >= 12) strength += 1;

  const meterWidth = (strength / 5) * 100;
  let color = '#ff4d4d';
  if (strength >= 4) color = '#4caf50';
  else if (strength >= 3) color = '#ffeb3b';

  strengthMeter.style.width = `${meterWidth}%`;
  strengthMeter.style.backgroundColor = color;
}

