const mailInput = document.getElementById('loginMail');
const mailImage = document.querySelector('.mail-size img');
const passInput = document.getElementById('loginPass');
const passImage = document.querySelector('.password-size img');

mailInput.addEventListener('input', () => { 
    if (mailInput.value.trim().length > 0) { 
        mailImage.style.visibility = 'hidden'; 
    } else {
        mailImage.style.visibility = 'visible';
    }
});

passInput.addEventListener('input', () => {
    if (passInput.value.trim().length > 0) {
        passImage.style.visibility = 'hidden';
    } else {
        passImage.style.visibility = 'visible';
    }
});