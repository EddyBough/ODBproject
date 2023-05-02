'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const btnYes = document.querySelector('#btnNo');
console.log(btnsOpenModal);

const openModal = function () {
modal.classList.remove('hidden');
overlay.classList.remove('hidden');
};
//Fonction permettant de faire disparaitre le modal
const closeModal = function () {
modal.classList.add('hidden');
overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
btnsOpenModal[i].addEventListener('click', openModal);
//Cette boucle ajoute un gestionnaire d'événements "click" à chaque bouton avec la classe "show-modal".
//Lorsqu'un de ces boutons est cliqué, le modal est ouvert.



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
btnYes.addEventListener('click', closeModal);

