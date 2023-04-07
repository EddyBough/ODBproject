const { customerModel } = require("/models/customerModel")

let adminGuard = async (req, res, next)=>{ // le authguard va permettre de sécuriser la route et l'authentifié
    const customer = await customerModel.findById(req.session.customer._id)// N'exécute pas ce code tant que l'id n'a pas été comparé avec la base de donné

    if (customer && customer.role == "admin") { // Si l'authentification est valide 
        next() // Joue moi le code qui se trouve dans la route workerView donc la page s'affichera
    }else{
        console.log("deconnexion");
        res.redirect('/connexion') // sinon, le authguard permettra de me rediriger vers la page "connexion" si mon id ne correpond pas. 
    }
}

module.exports = authGuard