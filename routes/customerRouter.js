const { customerModel } = require("../models/customerModel");
const customerRouter = require("express").Router();// Constante pour créer un routeur qui a pour nom customerRouter
const crypto = require('../service/crypto')

//-----------------------------------Page Home------------------------------------------------------------------


customerRouter.get('/home', async (req, res) => {// le get permet d'afficher la page d'inscription (register)
    try {
        res.render("home.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//-----------------------------------Page Connexion--------------------------------------------------------------

customerRouter.get('/login', async (req, res) => {// le get permet d'afficher la page de connexion (register)
    try {
        res.render("login.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


customerRouter.post('/login', async (req,res)=>{// Le post lui permet d'ajouter un client dans la base de donné
    try {
        let customer = await customerModel.findOne({mail: req.body.mail}) // ici il va récupérer le mail dans la bdd
        if (customer && await crypto.comparePassword(req.body.password, customer.password)){ // là il va comparer le mot de passe de la bdd 
        req.session.customerId = customer._id
    res.redirect('/dashboard')
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
})


customerRouter.get("/logout", async (req, res) => {//
    try {
        req.session.destroy() //Permet de teruire la session courante ce qui a pour effet de deconnecter l'utilisateur et de supprimer les données de session
    res.redirect("/login")// Il redige par la suite à la page connexion
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
});

customerRouter.get("/customerDelete/:id", async (req, res) => { //Route qui va nous permettre de supprimer le compte
    try {
        await customerModel.deleteOne({_id: req.params.id }) //Await permet de temporiser l'execution de la fonction deletOne
        console.log('Votre compte a supprimé avec succès'); //Car il va d'abord chercher dans la base de donné l'id correspondant au client afin de le supprimer de la base de donnée
        res.redirect("/login"); //Ensuite il le redirige vers la page connexion
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


//-----------------------------------Page Inscription des clients-------------------------------------------------

customerRouter.get('/register', async (req, res) => {// le get permet d'afficher la page d'inscription (register)
    try {
        res.render("register.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.post('/register', async (req,res)=>{// Le post lui permet d'ajouter un client dans la base de donné
    try {
    req.body.password = await crypto.cryptPassword(req.body.password)//Await est utilisé pour attendre la fin de l'éxécution du crypto.
    //le crypto permet lui de crypter le password afin qu'il ne soit pas visible dans la BDD
    let customer = new customerModel(req.body);
    customer.save();// Le client est enregistré dans la BDD
    res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
})






//-----------------------------------Page Tableau de board des clients-------------------------------------------------



customerRouter.get('/dashboard', async (req, res)=>{
    try {
        res.render('dashBoard.twig',{ //Renvoie moi au navigateur et affiche moi la page 
            customerName : req.session.customerName,
            customerFirstname : req.session.customerFirstname,
        });
    } catch (error) {
        console.log(error);
        res.json(error)
    }
    
});

//-----------------------------------Page Modification des clients-------------------------------------------------

customerRouter.get('/modificationCustomer', async (req, res) => {
    try {
        res.render("modificationCustomer.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.get('/modificationProfil', async (req, res) => {
    try {
        res.render("modificationProfil.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})






















module.exports = customerRouter;