const adminRouter = require("express").Router(); // Constante pour créer un routeur qui a pour nom AdminRouter
const { customerModel } = require("../models/customerModel"); 
const { prestationModel } = require("../models/prestationModel"); 
const upload = require('../service/uploaderImg')
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

adminRouter.get('/AddServices', upload.single('photo'), async (req, res) => {
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

adminRouter.post('/AddPrestation', upload.single('photo'), async (req, res) => { // fonction qui sert à ajouter les prestations (page AddForm)
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

  adminRouter.post('/ModifyForm/:id', upload.single('photo'), async (req, res) => {
    try {
      const id = req.body.id;
      const updatedPrestation = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        type: req.body.type,
        photo: req.body.photo
      };
      const result = await prestationModel.findByIdAndUpdate(id, updatedPrestation);
      if (!result) {
        return res.status(404).send('Prestation non trouvée');
      }
      res.redirect('/AddServices');
    } catch (error) {
      console.log(error);
      res.status(500).send('Erreur lors de la modification de la prestation');
    }
  });



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

// Route qui sert à afficher la page ModificationCustomer et modifier un client dans la bdd

adminRouter.get('/modificationCustomer/:id', async (req, res) => { 
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

adminRouter.post("/modificationCustomer/:id", async (req, res) => { // ici en cliquant sur valider dans le form de modificationCustomer, on va post les validations sur mongoDB sur l'id (l'utilisateur donc).
    try {
        await customerModel.updateOne(({ _id: req.params.id }), req.body)
        res.redirect("/ClientList");
    } catch (error) {
        console.log(error);
        res.send(error);

    }
})

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






module.exports = adminRouter;