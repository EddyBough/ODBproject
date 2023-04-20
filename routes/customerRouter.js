const { customerModel } = require("../models/customerModel");
const { reviewModel } = require("../models/reviewModel");
const customerRouter = require("express").Router(); // Constante pour créer un routeur qui a pour nom customerRouter
const crypto = require("../service/crypto");
const eventModel = require("../models/eventModel");
const nodemailer = require("nodemailer") // nodemailer


//----------Route du NODEMAILER-------------------------------//

const transporter = nodemailer.createTransport({        
  service: "Outlook365",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
  tls: {rejectUnauthorized: false}
})

customerRouter.get('/sendMail', async (req, res) =>{ // repasser en POST lorsque ce sera mis en place
  try{
    
     let info = await transporter.sendMail({
        from: process.env.USER_MAIL, // on va chercher mon mail dans le .env
        to: "boughanmieddy@outlook.fr",
        subject: "test",
        html: "test dddd",
     })
     res.redirect('/login')
  }catch (err){
     console.log(err);
     res.send(err)
  }
})

//-----------------------------------Page Home------------------------------------------------------------------

customerRouter.get("/home", async (req, res) => {
  // le get permet d'afficher la page d'inscription (register)
  try {
    res.render("home.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page TEST------------------------------------------------------------------

customerRouter.get("/adminagenda", async (req, res) => {
  // le get permet d'afficher la page d'inscription (register)
  let events = await eventModel.eventModel.find();
  res.render("adminAgenda.twig", {});
});

customerRouter.get("/events", async (req, res) => {
  // La route du fetch pour le calendrier sur la page test
  let events = await eventModel.eventModel.find();
  res.json(events);
});

//-----------------------------------Page Connexion--------------------------------------------------------------

customerRouter.get("/login", async (req, res) => {
  // le get permet d'afficher la page de connexion (register)
  try {
    let errorLogin = "";
    if (req.session.errorLogin) {
      errorLogin = req.session.errorLogin;
      delete req.session.errorLogin;
    }
    res.render("login.twig", {
      errorLogin: errorLogin,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.post("/login", async (req, res) => {
  // le post va envoyer les donnée qu'on a entré dans le formulaire de connexion

  try {
    let customer = await customerModel.findOne({ email: req.body.email }); // le findOne va rechercher un email sur mongoDB qui correspond ou pas à l'email entré par l'utilisateur
    if (
      customer &&
      (await crypto.comparePassword(req.body.password, customer.password))
    ) {
      //Si l'email correspond le comparePassword va comparer le mot de passe dans la BDD
      req.session.customer = customer; //L'utilisateur sera récupéré
      if (customer.role == "admin") {
        //Si c'est l'admin
        res.redirect("/adminhome"); // Il sera redirigé vers adminhome
      } else {
        //si c'est autre que l'admin ( user donc )
        res.redirect("/dashboard"); // Il sera redirigé vers le dashboard
      }
    } else {
      throw "mot de passe ou email invalide";
    }
  } catch (error) {
    console.log(error);
    req.session.errorLogin = error;
    res.redirect("/login");
  }
});

//-----------------------------------Page déconnexion du Dashboard--------------------------------------------------------------

customerRouter.get("/logout", async (req, res) => {
  //
  try {
    req.session.destroy(); //Le destroy va récupérer l'id en cours et va le detruire afin de se deconnecter
    res.redirect("/login"); // Il redige par la suite à la page login
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Fonction supprimer compte--------------------------------------------------------------

customerRouter.get("/customerDelete/:id", async (req, res) => {
  try {
    await customerModel.deleteOne({ _id: req.params.id }); //Il va recuperer l'id de la BDD afin de le supprimer
    res.redirect("/login"); //Ensuite il le redirige vers la page connexion
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Mot de passe oublié-------------------------------------------------

customerRouter.get("/forgotPassword", async (req, res) => {
  try {
    res.render("forgotPassword.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page Inscription des clients-------------------------------------------------

customerRouter.get("/register", async (req, res) => {
  // le get permet d'afficher la page d'inscription (register)
  try {
    res.render("register.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.post("/register", async (req, res) => {
  // Le post lui permet d'ajouter un client dans la base de donnée
  try {
    let errors = {}; //Variable qui va contenir les erreurs
    if (req.body.password !== req.body.confirmPassword) {
      // Cette étape permet de vérifier si les MDP sont identique
      errors.confirmPassword = "*Les mots de passe doivent être identiques"; //Si ils ne correspondent pas le message d'erreur sera stocké dans la variable errors
      return res.render("register.twig", { errors: errors }); // et seront renvoyé dans la page register
    }
    let usersearch = await customerModel.findOne({email:req.body.email})
    if (usersearch) {
      errors.email = "cette email existe déjà";
      return res.render("register.twig", { errors: errors });
    }

    if (Object.keys(errors).length > 0) {
      //la longeur de l'erreur est vérifié, si elle est supérieur à 0 cela veut dire qu'il y a  des erreurs dans les données du formulaire
      return res.render("register", { errors: errors }); //elles seront renvoyé au register.twig
    } else {
      //si il ne trouve pas d'erreur, le MDP est crypté à l'aide de la fonction cryptopassword avant d'etre enregistré dans la base de données
      req.body.password = await crypto.cryptPassword(req.body.password); //Await est utilisé pour attendre la fin de l'éxécution du crypto.
      //le crypto permet lui de crypter le password afin qu'il ne soit pas visible dans la BDD
      let customer = new customerModel(req.body);
      let err = customer.validateSync();
      console.log(err);
      if (err) {
        console.log(err);
        throw err
      }

      customer.save(); // Le client est enregistré dans la BDD
      req.session.customer = customer; // récupérer le customer qui vient d'être créé en session ( le sauvegarder le réutiliser dans le dashboard)
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
    return res.render("register.twig", { errors: error.errors });
  }
});

//-----------------------------------Page Tableau de board des clients-------------------------------------------------

customerRouter.get("/dashboard", async (req, res) => {
  try {
    console.log(req.session);
    res.render("dashboard.twig", {
      // je suis bien authentifié mon tableau de bord client apparait
      connectedCustomer: req.session.customer, //connectedCustomer est égal à la session sur laquelle l'utilisateur est connecté
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
//-----------------------------------Page agenda des clients-------------------------------------------------

customerRouter.get("/customerAgenda", async (req, res) => {
  try {
    res.render("customerAgenda.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page Modification profil-------------------------------------------------

customerRouter.get("/modificationProfil/:id", async (req, res) => {
  try {
    let customer = await customerModel.findOne({ _id: req.params.id });
    res.render("modificationProfil.twig", {
      customer: customer,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.post("/modificationProfil/:id", async (req, res) => {
  try {
    await customerModel.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page paiement des clients-------------------------------------------------

customerRouter.get("/payment", async (req, res) => {
  try {
    res.render("Payment.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.get("/postPayment", async (req, res) => {
  try {
    res.render("postPayment.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page Clientview-------------------------------------------------

customerRouter.get("/clientreview", async (req, res) => {
  // fonction qui servira à récupéré la page clientreview et récupéré les avis de clientreview
  try {
    let reviews = await reviewModel.find(); // récupéré les données du reviewModel postées du formulaire post clientreview
    res.render("clientreview.twig", {
      reviews: reviews, // récupérer du FOR review: reviews de la page clientreview tous les avis des clients
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.post("/clientreview", async (req, res) => {
  try {
    let review = new reviewModel(req.body); //On prend en compte le reviewModel
    review.save(); // On l'ajoute
    res.redirect("/dashboard"); //Il sera ensuite redirigé vers son dashboard
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = customerRouter;
