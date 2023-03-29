const adminRouter = require("express").Router() // Constante pour créer un routeur qui a pour nom AdminRouter


//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page adminhome

adminRouter.get("/adminhome", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    res.render('adminhome.twig')// Là elle va s'afficher
})

//----------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page AdminAgenda

adminRouter.get("/AdminAgenda", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    res.render('AdminAgenda.twig')// Là elle va s'afficher
})

//----------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ClientList

adminRouter.get("/ClientList", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    res.render('ClientList.twig')// Là elle va s'afficher
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page AddingServices

adminRouter.get("/AddServices", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    res.render('AddServices.twig')// Là elle va s'afficher
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page AddForm

adminRouter.get("/AddForm", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    res.render('AddForm.twig')// Là elle va s'afficher
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ModifyForm

adminRouter.get("/ModifyForm", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    res.render('ModifyForm.twig')// Là elle va s'afficher
})











module.exports = adminRouter;