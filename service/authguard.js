const { customerModel } = require("../models/customerModel")

let authGuard = async (req, res, next) => { // le authguard va permettre de sécuriser la route et l'authentifier.
    if (!req.session.customer) {
        res.redirect('/login') // sinon, le authguard permettra de me rediriger vers la page "connexion" si mon id ne correpond pas. 

    }
    const customer = await customerModel.findById(req.session.customer._id)
    // N'exécute pas ce code tant que l'id n'a pas été comparé avec la base de donnée
    if (customer) { // Si l'authentification est valide 
        next() // Nous arriverons sur le dashboard client
    } else {
        console.log("deconnexion");
        res.redirect('/login') // sinon, le authguard permettra de me rediriger vers la page "login" si mon id ne correpond pas. 
    }
}

module.exports = authGuard