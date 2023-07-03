const { customerModel } = require("../models/customerModel")

let adminGuard = async (req, res, next) => {
    if (!req.session.customer) {
        res.redirect('/login') // sinon, le authguard permettra de me rediriger vers la page "connexion" si mon id ne correpond pas. 

    } else {
        const customer = await customerModel.findById(req.session.customer._id)
        // N'exécute pas ce code tant que l'id n'a pas été comparé avec la base de donnée

        if (customer && customer.role == "admin") { // Si l'authentification est valide 
            next() // redirection vers le workflow admin
        } else {
            console.log("deconnexion");
            res.redirect('/login') // sinon, le adminguard permettra de me rediriger vers la page "login" si mon id ne correpond pas. 
        }
    } 

}

module.exports = adminGuard