let checkboxes = document.querySelectorAll('.checkbox-spin')
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