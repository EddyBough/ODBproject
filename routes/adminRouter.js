const adminRouter = require("express").Router() // Constante pour créer un routeur qui a pour nom AdminRouter


adminRouter.get("/adminhome", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    res.render('adminhome.twig')// Là elle va s'afficher
})

//----------------------------------------------------------------------------------------------------------------------------------

module.exports = adminRouter;