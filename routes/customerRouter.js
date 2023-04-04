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


customerRouter.post('/login', async (req,res)=>{// le post va envoyer les donnée qu'on a entré dans le formulaire de connexion
    try {
        let customer = await customerModel.findOne({mail: req.body.mail}) // le findOne va rechercher un email sur mongoDB qui correspond ou pas à l'email entré par l'utilisateur
        if (customer && await crypto.comparePassword(req.body.password, customer.password)){ //Si l'email correspond le comparePassword va comparer le mot de passe dans la BDD 
        req.session.customer = customer //L'utilisateur sera récupéré
    res.redirect('/dashboard')// Il sera redirigé vers le dashboard
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
})

//-----------------------------------Page déconnexion du Dashboard--------------------------------------------------------------

customerRouter.get("/logout", async (req, res) => {//
    try {
        req.session.destroy() //Le destroy va récupérer l'id en cours et va le detruire afin de se deconnecter
    res.redirect("/login")// Il redige par la suite à la page login
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
});

//-----------------------------------Fonction supprimer compte--------------------------------------------------------------

customerRouter.get("/customerDelete/:id", async (req, res) => {
    try {
        await customerModel.deleteOne({_id: req.params.id }) //Il va recuperer l'id de la BDD afin de le supprimer
        res.redirect("/login"); //Ensuite il le redirige vers la page connexion
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


//-----------------------------------Mot de passe oublié-------------------------------------------------



customerRouter.get('/forgotPassword', async (req, res) => {
    try {
        res.render("forgotPassword.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})








//-----------------------------------Page Inscription des clients-------------------------------------------------

customerRouter.get('/register', async (req, res) => {// le get permet d'afficher la page d'inscription (register)
    try {
        res.render("register.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.post('/register', async (req,res)=>{// Le post lui permet d'ajouter un client dans la base de donnée
    try {
    req.body.password = await crypto.cryptPassword(req.body.password)//Await est utilisé pour attendre la fin de l'éxécution du crypto.
    //le crypto permet lui de crypter le password afin qu'il ne soit pas visible dans la BDD
    let customer = new customerModel(req.body);
    customer.save();// Le client est enregistré dans la BDD
    res.redirect('/dashboard')//Il sera ensuite redirigé vers son dashboard
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    
})



//-----------------------------------Page Tableau de board des clients-------------------------------------------------



customerRouter.get('/dashboard', async (req, res)=>{
    try {
        let customers =  await customerModel.find({customerId: req.session.customerId})//le find va recuperer une requete mongoose
   res.render('dashboard.twig',{ // je suis bien authentifié mon tableau de bord client apparait
    customers: customers,//la ligne de code customers: customers est un tableau d'objet et permet de donner une étiquette aux données que nous souhaitons afficher dans la vue, 
    //afin que nous puissions les utiliser facilement dans le code Twig pour afficher les informations du client.
    customerName: req.session.customerName
})
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