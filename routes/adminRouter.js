const adminRouter = require("express").Router(); // Constante pour créer un routeur qui a pour nom AdminRouter
const { customerModel } = require("../models/customerModel"); 
const { prestationModel } = require("../models/prestationModel");
const eventModel = require("../models/eventModel"); 
const upload = require('../service/uploaderImg')
const crypto = require('../service/crypto');
const adminGuard = require("../service/adminguard");


//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page adminhome

adminRouter.get("/adminhome", adminGuard,async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
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

adminRouter.get("/AdminAgenda", adminGuard,async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil AdminAgenda
    try {
        res.render("AdminAgenda.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ClientList et récupérer la liste de tous les clients

adminRouter.get('/ClientList', adminGuard,async (req, res) => {
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

adminRouter.get('/AddServices', adminGuard,upload.single('photo'), async (req, res) => {
    try {
        console.log(req.session);
        let prestations = await prestationModel.find({}) // le find va récupérer tous les clients créés par le model customerModel
        res.render('AddServices.twig', {
            prestation: prestations, // on a créé une boucle for pour récupérer la liste de customer crée dans la bdd 
            connectedCustomer: req.session.customer // on récupère le customer en session qui est connecté ( l'admin dans notre cas)
        })
    } catch (error) {
        console.log(error);
        res.json(error)
    }

});

adminRouter.post('/AddPrestation', adminGuard,upload.single('photo'), async (req, res) => { // fonction qui sert à ajouter les prestations (page AddForm)
    try {
      const { title, category, price, type } = req.body;
      const photo = req.file.filename;
      const prestations = new prestationModel({ title, category, price, type, photo }); // ajout de la prestation en suivant le prestationModel
      await prestations.save(); // Ajout de la prestation dans la bdd 
      res.redirect('/AddServices'); // lorsque l'ajout est fait, redirection vers AddServices
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });



//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page AddForm

adminRouter.get("/AddForm", adminGuard,async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    try {
        res.render("AddForm.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ModifyForm et faire les modifications des prestations

adminRouter.get('/ModifyForm/:id', adminGuard,async (req, res) => { 
    try {
        let prestation = await prestationModel.findOne({ _id: req.params.id }) // on va récupérer les données sur la page modificationCustomer
        res.render("ModifyForm.twig", {
            prestation: prestation
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    } 
})


adminRouter.post("/ModifyForm/:id", adminGuard,upload.single('photo'), async (req, res) => { // ici en cliquant sur valider dans le form de modificationCustomer, on va post les validations sur mongoDB sur l'id (l'utilisateur donc).
    try {
        
        if (req.file) { // file est une expression de multer donc la requête recupère file
          req.body.photo = req.file.filename //Cette ligne vérifie si un fichier a été téléchargé dans la requête. Si c'est le cas, elle met à jour le champ "photo" de l'objet "req.body" avec le nom du fichier téléchargé.
        }
        await prestationModel.updateOne(({ _id: req.params.id }), req.body)//Cette ligne utilise la méthode "updateOne" du modèle "prestationModel" pour mettre à jour un document de la collection "prestations" avec l'ID correspondant à "req.params.id". Elle passe l'objet "req.body" comme argument pour définir les nouvelles valeurs des champs de la collection. Cette méthode est asynchrone, donc nous utilisons le mot clé "await" pour attendre sa résolution avant de continuer.
        res.redirect("/AddServices");
    } catch (error) {
        console.log(error);
        res.send(error);

    }
})




//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page DeleteForm (ne sert à rien pour l'instant car on rentre dans le get de la route juste en dessous)

adminRouter.get("/DeleteForm", async (req, res)=>{ //Cette ligne grâce au get permet de récupérer la page d'accueil adminhome
    try {
        res.render("DeleteForm.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


// fonction qui permet de supprimer la prestation
adminRouter.get("/DeleteForm/:id", adminGuard,async (req, res) => { 
    try {
      await prestationModel.deleteOne({ _id: req.params.id }); //Il va recuperer l'id de la prestation séléctionné dans la BDD afin de le supprimer
      res.redirect("/AddServices"); //Ensuite il le redirige vers la page AddServices
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à afficher la page ModificationCustomer et modifier un client dans la bdd

adminRouter.get('/modificationCustomer/:id', adminGuard,async (req, res) => { 
    try {
        let customer = await customerModel.findOne({ _id: req.params.id }) // on va récupérer les données sur la page modificationCustomer
        res.render("modificationCustomer.twig", {
            customer: customer
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

adminRouter.post("/modificationCustomer/:id", adminGuard, async (req, res) => {
    try {
        
       let fidelity = parseInt(req.body.fidelityPoint)
        if ( fidelity > 10 ) {
            req.body.fidelityPoint = 10
        }
        await customerModel.updateOne(({ _id: req.params.id }), req.body)
        res.redirect("/ClientList");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });
  

//---------------------------------------------------------------------------------------------------------------------------------

// Route qui sert à se déconnecter

adminRouter.get("/logout", async (req, res) => {//
    try {
        req.session.destroy() //Le destroy va récupérer l'id en cours et va le detruire afin de se deconnecter
        res.redirect("/login")// Il redige par la suite à la page login
    } catch (error) {
        console.log(error);
        res.send(error)
    }
});

//-----------------------------------Page AdminAgenda------------------------------------------------------------------

adminRouter.get("/adminagenda", adminGuard,async (req, res) => { 
    // le get permet d'afficher la page d'inscription (register)
    let events = await eventModel.eventModel.find();
    res.render("adminAgenda.twig", {});
});

  adminRouter.get("/events",async (req, res) => { // on va afficher tout les events
    // La route du fetch pour le calendrier sur la page test
    let events = await eventModel.eventModel.find();
    res.json(events);
});




module.exports = adminRouter;