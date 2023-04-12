const adminRouter = require("express").Router(); // Constante pour créer un routeur qui a pour nom AdminRouter
const { customerModel } = require("../models/customerModel"); 
const crypto = require('../service/crypto');


//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page adminhome

adminRouter.get("/adminhome", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    try {
        res.render("adminhome.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

// Route qui sert à déconnecter l'admin

adminRouter.get("/logout", async (req, res) => {//
    try {
        req.session.destroy() //Le destroy va récupérer l'id en cours et va le detruire afin de se deconnecter
        res.redirect("/login")// Il redige par la suite à la page login
    } catch (error) {
        console.log(error);
        res.send(error)
    }
});

//----------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page AdminAgenda

adminRouter.get("/AdminAgenda", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil AdminAgenda
    try {
        res.render("AdminAgenda.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ClientList et récupérer la liste de tous les clients

adminRouter.get('/ClientList', async (req, res) => {
    try {
        console.log(req.session);
        let customers = await customerModel.find({}) // le find va récupérer tous les clients créés par le model customerModel
        res.render('ClientList.twig', {
            customers: customers, // on a créé une boucle for pour récupérer la liste de customer crée dans la bdd 
            connectedCustomer: req.session.customer
        })
    } catch (error) {
        console.log(error);
        res.json(error)
    }

});



//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page AddServices

adminRouter.get("/AddServices", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil AddServices
    try {
        res.render("AddServices.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page AddForm

adminRouter.get("/AddForm", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    try {
        res.render("AddForm.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ModifyForm

adminRouter.get("/ModifyForm", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    try {
        res.render("ModifyForm.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page DeleteForm

adminRouter.get("/DeleteForm", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    try {
        res.render("DeleteForm.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ModificationCustomer

adminRouter.get('/modificationCustomer', async (req, res) => {
    try {
        res.render("modificationCustomer.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})






module.exports = adminRouter;