const { customerModel } = require("../models/customerModel")

let adminGuard = async (req, res, next)=>{
    if (!req.session.customer) {
        res.redirect('/login') // sinon, le authguard permettra de me rediriger vers la page "connexion" si mon id ne correpond pas. 

    }else{
        const customer = await customerModel.findById(req.session.customer._id)// N'exécute pas ce code tant que l'id n'a pas été comparé avec la base de donné

        if (customer && customer.role == "admin") { // Si l'authentification est valide 
            next() // Joue moi le code qui se trouve dans la route workerView donc la page s'affichera
        }else{
            console.log("deconnexion");
            res.redirect('/login') // sinon, le authguard permettra de me rediriger vers la page "connexion" si mon id ne correpond pas. 
        }
    } // le authguard va permettre de sécuriser la route et l'authentifié
  
}

module.exports = adminGuard