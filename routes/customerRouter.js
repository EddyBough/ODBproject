const { customerModel } = require("../models/customerModel"); // j'importe customerModel pour pouvoir l'utiliser
const { reviewModel } = require("../models/reviewModel"); // j'importe reviewModel pour pouvoir l'utiliser dans la gestion d'avis
const customerRouter = require("express").Router(); // Constante pour créer un routeur qui a pour nom customerRouter
const crypto = require("../service/crypto");
const eventModel = require("../models/eventModel");
const nodemailer = require("nodemailer") // nodemailer
const { prestationModel } = require("../models/prestationModel"); // j'importe prestationModel pour pouvoir l'utiliser sur la page dashboard
const upload = require('../service/uploaderImg') // multer pour la gestion d'upload d'image
const authGuard = require("../service/authguard");

//----------Route du NODEMAILER-------------------------------//

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
  tls: { rejectUnauthorized: false }
})

customerRouter.get('/sendMail', async (req, res) => { // repasser en POST lorsque ce sera mis en place
  try {

    let info = await transporter.sendMail({
      from: process.env.USER_MAIL, // on va chercher mon mail dans le .env
      to: "boughanmieddy@outlook.fr",
      subject: "Inscription validée",
      html: "Bienvenue chez ODB !",
    })
    res.redirect('/login')
  } catch (err) {
    console.log(err);
    res.send(err)
  }
})

//-----------------------------------Page Home------------------------------------------------------------------

customerRouter.get("/home", async (req, res) => {
  // le get permet d'afficher la page home
  try {
    res.render("home.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



//-----------------------------------Page login--------------------------------------------------------------

customerRouter.get("/login", async (req, res) => {
  // le get permet de récupérer la page de login 
  try {
    
    let errorLogin = "";
    if (req.session.errorLogin) { // Si la variable errorLogin est présente dans la session de l'utilisateur
      errorLogin = req.session.errorLogin;// On assigne la valeur de la variable errorLogin de la session à la variable errorLogin locale
      delete req.session.errorLogin;// On supprime la variable errorLogin de la session.
    }
    console.log(req.body);
    res.render("login.twig", {
      errorLogin: errorLogin,// On passe la valeur de la variable errorLogin à la vue pour l'afficher
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.post("/login", async (req, res) => {
  // le post va envoyer les données qu'on a entré dans le formulaire de connexion

  try {
    let customer = await customerModel.findOne({ email: req.body.email }); // la méthode findOne va rechercher un email sur 
    //mongoDB qui correspond ou pas à l'email entré par l'utilisateur
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
      throw "mot de passe ou email invalide";// si les conditions échouent on affiche un message à l'utilisateur
    }
  } catch (error) {
    console.log(error);
    req.session.errorLogin = error; //Ensuite, ce message d'erreur est assigné à la variable req.session.errorLogin
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
//-----------------------------------Fonction supprimer evenement--------------------------------------------------------------

customerRouter.get("/eventDelete/:id", authGuard, async (req, res) => {
  try {
    await eventModel.eventModel.deleteOne({ _id: req.params.id }); //Il va recuperer l'id de la BDD afin de le supprimer
    res.redirect("/dashboard"); //Ensuite il le redirige vers la page connexion
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page Modification evenement-------------------------------------------------

customerRouter.get("/modificationEvent/:id", async (req, res) => {
  try {
    let event = await eventModel.eventModel.findOne({ _id: req.params.id }); // ici on a une requête mongoose qui va récupérer les données du client grâce à son id connecté afin qu'il puisse les modifier dans le form post
    res.render("customerAgenda.twig", {
      event: event,
      eventId: req.params.id
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.get("/modificationEventDate/:id/:date", async (req, res) => { // dans ce post on va modifier toutes les données grâce au post du form
  try {
    let date = new Date(req.params.date)
    date.setSeconds(0)
    date.setMilliseconds(0)
    let dateEnd = new Date(req.params.date)
    dateEnd.setMinutes(date.getMinutes() + 30),

      obj = {
        title: req.session.customer.firstname,
        start: date.toISOString(),
        end: dateEnd.toISOString(),
        dateString: date.toLocaleDateString('fr-fr', {
          weekday: "long",
          day: "numeric",
          month: 'long',
          year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('fr-FR'),
        allDay: 0,
        userId: req.session.customer._id,
      }
    await eventModel.eventModel.updateOne({ _id: req.params.id }, obj); // on a deux argument : modifier l'id et envoyer un req.body parce qu'on envoi une nouvelle requête qui va modifier grâce au UpdateOne
    res.redirect("/dashboard"); // une fois que c'est fait, redirection sur dashboard.twig
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
    let usersearch = await customerModel.findOne({ email: req.body.email })
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
      let info = await transporter.sendMail({
        from: process.env.USER_MAIL, // on va chercher mon mail dans le .env
        to: req.body.email,
        subject: "Bienvenue chez Tonton",
        html: "Bienvenue chez ODB",
      })
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
    const prestations = await prestationModel.find() // je veux récupérer les données du tableau prestationmodel afin d'afficher les prestations en bdd pour les afficher sur la page dashboard
    const event = await eventModel.eventModel.find({ userId: req.session.customer }); //Dans le modele event, on va récupérer l'id du customer qui a créé l'évenement !
    console.log(event);
    res.render("dashboard.twig", {
      connectedCustomer: req.session.customer,
      prestation: prestations,
      event: event,
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

customerRouter.get("/modificationProfil/:id", authGuard, async (req, res) => {
  try {
    let customer = await customerModel.findOne({ _id: req.params.id }); // ici on a une requête mongoose qui va récupérer les données du client grâce à son id connecté afin qu'il puisse les modifier dans le form post
    res.render("modificationProfil.twig", {
      customer: customer,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

customerRouter.post("/modificationProfil/:id", authGuard, async (req, res) => { // dans ce post on va modifier toutes les données grâce au post du form
  try {
    await customerModel.updateOne({ _id: req.params.id }, req.body); // on a deux argument : modifier l'id et envoyer un req.body parce qu'on envoi une nouvelle requête qui va modifier grâce au UpdateOne
    res.redirect("/dashboard"); // une fois que c'est fait, redirection sur dashboard.twig
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page paiement des clients-------------------------------------------------

customerRouter.get("/payment", authGuard, async (req, res) => {
  try {
    // Récupérer les événements du client connecté depuis la base de données
    const events = await eventModel.eventModel.find({ userId: req.session.customer._id });

    // Passer les événements à la vue "Payment.twig"
    res.render("Payment.twig", { events });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


customerRouter.get("/postPayment", authGuard, async (req, res) => {
  try {
    res.render("postPayment.twig");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//-----------------------------------Page Clientview-------------------------------------------------

customerRouter.get("/clientreview", authGuard, async (req, res) => {
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

customerRouter.post("/clientreview", authGuard, async (req, res) => {
  try {
    let review = new reviewModel(req.body); //On prend en compte le reviewModel
    review.save(); // On l'ajoute
    res.redirect("/dashboard"); //Il sera ensuite redirigé vers son dashboard
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



//------------Route pour la création d'évenement---------------

customerRouter.get("/custumerAgenda/:date/:price", authGuard, async (req, res) => {
  try {
    let date = new Date(req.params.date)
    let dateEnd = new Date(req.params.date)
    dateEnd.setMinutes(date.getMinutes() + 30),

      obj = {
        title: req.session.customer.firstname,
        start: req.params.date,
        end: dateEnd.toISOString(),
        dateString: date.toLocaleDateString('fr-fr', {
          weekday: "long",
          day: "numeric",
          month: 'long',
          year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('fr-FR'),
        allDay: 0,
        userId: req.session.customer._id,
      }
    let event = new eventModel.eventModel(obj);
    event.save()
    res.redirect("/payment"); //Il sera ensuite redirigé vers son dashboard
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = customerRouter;