const mailInput = document.getElementById('loginMail');
const mailImage = document.querySelector('.mail-size img');
const passInput = document.getElementById('loginPass');
const passImage = document.querySelector('.password-size img');

mailInput.addEventListener('input', () => { // Attacher un événement d'entrée à l'élément d'entrée du courriel
    if (mailInput.value.trim().length > 0) { // Vérifier si l'entrée de courriel contient des caractères autres que des espaces
        mailImage.style.visibility = 'hidden'; // Si l'entrée contient des caractères, cacher l'image associée au courriel
    } else {
        mailImage.style.visibility = 'visible'; // Si l'entrée est vide, montrer l'image associée au courriel
    }
});

passInput.addEventListener('input', () => {
    if (passInput.value.trim().length > 0) {
        passImage.style.visibility = 'hidden';
    } else {
        passImage.style.visibility = 'visible';
    }
});

