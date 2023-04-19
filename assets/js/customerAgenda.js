document.querySelector('.accordion-header').addEventListener('click', function() {
    const accordion = this.parentNode;
    accordion.classList.toggle('active');
});