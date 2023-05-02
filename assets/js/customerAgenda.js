
window.addEventListener('load',async()=>{
    // Récupération de la date et de l'heure actuelles
// récupération de l'élément <main> dans le DOM
const main = document.querySelector('main');




// boucle pour créer les accordéons pour chaque jour de la semaine
for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i); // ajout de i jours à la date courante

  // création des éléments HTML pour l'accordéon
  const accordion = document.createElement('div');
  accordion.classList.add('accordion');

  const header = document.createElement('div');
  header.classList.add('accordion-header');
  header.textContent = date.toLocaleDateString('fr-fr', {
    weekday: "long",
    day: "numeric",
    month: 'long',
    year: 'numeric'
    });

  const arrow = document.createElement('span');
  arrow.classList.add('arrow');
  header.appendChild(arrow);

  const content = document.createElement('div');
  content.classList.add('accordion-content');

  // boucle pour créer les éléments HTML pour les heures de la journée
  for (let hours = 9; hours <= 18; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const time = document.createElement('div');
      date.setHours(hours)
      date.setMinutes(minutes)
      time.classList.add('time');
      time.setAttribute('data-date', date.toISOString())
      time.textContent = formatTime(hours, minutes);
      content.appendChild(time);
    }
  }

  accordion.appendChild(header);
  accordion.appendChild(content);
  main.appendChild(accordion);
}
// Sélectionner tous les éléments avec la classe "accordion-header"
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Parcourir chaque élément et ajouter un écouteur d'événement "click"
accordionHeaders.forEach(accordionHeader =>{
    accordionHeader.addEventListener('click', (elem)=> {
        const accordion = elem.target.parentNode;
        console.log(accordion);
        accordion.classList.toggle('active');
    });
})

let timeContainer = document.querySelectorAll('.time')
  timeContainer.forEach(time => {
    time.addEventListener('click',() =>{
        console.log('jhjh');
        let dateStr = time.getAttribute('data-date')
        let price = localStorage.getItem('price')
        window.location.href = `/custumerAgenda/${dateStr}/${price}`

    })
  })

})


// fonction pour générer l'heure au format hh:mm
function formatTime(hours, minutes) {
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}`;
  }

  


