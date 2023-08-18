
    const confirmButton = document.querySelector('#submit button');
    const onSiteRadio = document.querySelector('#onSite');
    const stripeRadio = document.querySelector('#stripe');

    confirmButton.addEventListener('click', () => {
        if (onSiteRadio.checked) {
            // Redirection vers une autre page pour "Sur place"
            window.location.href = '/postPayment';
        } else if (stripeRadio.checked) {
            // Redirection vers le site de Stripe pour le paiement en ligne
            window.location.href = 'https://buy.stripe.com/test_cN200621o6C272o4gg';
        }
    });
