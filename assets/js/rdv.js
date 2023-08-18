let checkboxes = document.querySelectorAll('.checkbox-spin') // dans cette page on met en place ce qu'on a dataprice afin qu'il garde en mémoire le prix dans le localstorage
checkboxes.forEach(checkboxe => {

    checkboxe.addEventListener('click', (elem)=>{
        if (elem.target.checked) {
            let price = localStorage.getItem('price') ? parseInt( localStorage.getItem('price')) : 0 // ? = vrai / : = faux
            price = price + parseInt(elem.target.getAttribute('data-price'))
            localStorage.setItem('price',price)
        }else{
            let price = localStorage.getItem('price') ? parseInt( localStorage.getItem('price')) : 0
            price = price - parseInt(elem.target.getAttribute('data-price'))
            localStorage.setItem('price',price)
        }
    })
})