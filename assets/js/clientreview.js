window.onload = () => {
    // On va chercher toutes les étoiles
    const container = document.querySelector('.stars')
    const stars = container.getElementsByClassName("la-star");
    console.log(stars);
    
    // On va chercher l'input
    const note = document.querySelector("#note");

    // On boucle sur les étoiles pour le ajouter des écouteurs d'évènements
    for(let star of stars){
        // On écoute le survol
        star.addEventListener("mouseover", function(){
            resetStars();
            this.style.color = "#EBBA65";
            this.classList.add("las");
            this.classList.remove("lar");
            // L'élément précédent dans le DOM (de même niveau, balise soeur)
            let previousStar = this.previousElementSibling;

            while(previousStar){
                // On passe l'étoile qui précède en rouge
                previousStar.style.color = "#EBBA65";
                previousStar.classList.add("las");
                previousStar.classList.remove("lar");
                // On récupère l'étoile qui la précède
                previousStar = previousStar.previousElementSibling;
            }
        });

        // On écoute le clic
        star.addEventListener("click", function(){
            note.value = this.dataset.value;
            
        });

        star.addEventListener("mouseout", function(){
            resetStars(note.value);
        });
    }

    /**
     * Reset des étoiles en vérifiant la note dans l'input caché
     * @param {number} note 
     */
    function resetStars(note = 0){
        for(star of stars){
            if(star.dataset.value > note){
                star.style.color = "black";
                star.classList.add("lar");
                star.classList.remove("las");
            }else{
                star.style.color = "#EBBA65";
                star.classList.add("las");
                star.classList.remove("lar");
                
            }
        }
        
    }
    console.log(note);
}