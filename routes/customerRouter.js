const { customerModel } = require("../models/customerModel");
const customerRouter = require("express").Router();// Constante pour créer un routeur qui a pour nom customerRouter
const crypto = require('../service/crypto')
const axios = require('axios')

//-----------------------------------Page Home------------------------------------------------------------------


customerRouter.get('/home', async (req, res) => {// le get permet d'afficher la page d'inscription (register)
    try {
        res.render("home.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.get('/test', async (req, res) => {// le get permet d'afficher la page d'inscription (register)
    try {
        const headers = {
            'Authorization': `Bearer ${process.env.API_KEY}`,
          };
        let res = await axios.get(`https://calendly.com/api/v1/users/me`, {
            headers: headers
          })

         
          console.log(res);
        res.render("home.twig",{

        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


//-----------------------------------Page Connexion--------------------------------------------------------------

customerRouter.get('/login', async (req, res) => {// le get permet d'afficher la page de connexion (register)
    try {
        let errorLogin = ""
        if (req.session.errorLogin) {
            errorLogin = req.session.errorLogin
            delete req.session.errorLogin
        }
        res.render("login.twig", {
            errorLogin: errorLogin
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.post('/login', async (req, res) => {// le post va envoyer les donnée qu'on a entré dans le formulaire de connexion

    try {
        let customer = await customerModel.findOne({ mail: req.body.mail }) // le findOne va rechercher un email sur mongoDB qui correspond ou pas à l'email entré par l'utilisateur
        if (customer && await crypto.comparePassword(req.body.password, customer.password)) { //Si l'email correspond le comparePassword va comparer le mot de passe dans la BDD 
            req.session.customer = customer //L'utilisateur sera récupéré
            res.redirect('/dashboard')// Il sera redirigé vers le dashboard
        } else {
            throw 'non connecté'
        }

    } catch (error) {
        console.log(error);
        req.session.errorLogin = error
        res.redirect('/login')
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
        await customerModel.deleteOne({ _id: req.params.id }) //Il va recuperer l'id de la BDD afin de le supprimer
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

customerRouter.post('/register', async (req, res) => {// Le post lui permet d'ajouter un client dans la base de donnée
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



customerRouter.get('/dashboard', async (req, res) => {
    try {
        console.log(req.session);
        let customers = await customerModel.find({ customerId: req.session.customerId })//le find va recuperer une requete mongoose
        res.render('dashboard.twig', { // je suis bien authentifié mon tableau de bord client apparait
            customers: customers,//la ligne de code customers: customers est un tableau d'objet et permet de donner une étiquette aux données que nous souhaitons afficher dans la vue, 
            //afin que nous puissions les utiliser facilement dans le code Twig pour afficher les informations du client.
            connectedCustomer: req.session.customer//connectedCustomer est égal à la session sur laquelle l'utilisateur est connecté
        })
    } catch (error) {
        console.log(error);
        res.json(error)
    }

});

//-----------------------------------Page Modification des clients-------------------------------------------------



customerRouter.get('/modificationProfil/:id', async (req, res) => {
    try {
        let customer = await customerModel.findOne({ _id: req.params.id })
        res.render("modificationProfil.twig", {
            customer: customer
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.post("/modificationProfil/:id", async (req, res) => {
    try {
        await customerModel.updateOne(({ _id: req.params.id }), req.body)
        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        res.send(error);

    }
})

//-----------------------------------Page paiement des clients-------------------------------------------------


customerRouter.get('/payments', async (req, res) => {
    try {
        res.render("Payment.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})



customerRouter.get('/postPayments', async (req, res) => {
    try {
        res.render("postPayment.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


//-----------------------------------Page Avis des clients-------------------------------------------------

customerRouter.get('/clientreview', async (req, res) => {
    try {
        res.render("clientreview.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


















module.exports = customerRouter;