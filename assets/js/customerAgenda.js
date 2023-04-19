// Sélectionner tous les éléments avec la classe "accordion-header"
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Parcourir chaque élément et ajouter un écouteur d'événement "click"
accordionHeaders.forEach(function(accordionHeader) {
accordionHeader.addEventListener('click', function() {
    const accordion = this.parentNode;
    accordion.classList.toggle('active');
});
});
