const adminRouter = require("express").Router() // Constante pour créer un routeur qui a pour nom AdminRouter
const crypto = require('../service/crypto')


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

// Route qui sert à afficher la page ClientList

adminRouter.get("/ClientList", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil ClientList
    try {
        res.render("ClientList.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

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








module.exports = adminRouter;