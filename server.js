const express = require("express")
const mongoose = require("mongoose");// Mongoose est le lien entre mongoDB et le serveur
require('dotenv').config() // cache les données afin que le mdp et le lien github ne soit pas lu (comme des exceptions lorsqu'on exportera notre dossier)
const adminRouter = require('./routes/adminRouter'); //ici on appelle la route adminRouter
const customerRouter = require('./routes/customerRouter'); // ici on appelle la route customerRouter
const db = process.env.BDD_URL // on a crypté l'url de mongoDB dans le fichier .env afin qu'elle ne soit pas lisible lors de l'export du projet
const session = require("express-session") // gère les sessions par l'id et fait en sorte qu'il n'y en ait qu'un par session de connecté
const app = express() // on démarre l'appli
const eventModel = require("./models/eventModel")

app.use(session({ secret: 'key', saveUninitialized: true, resave: true })) // pour sécuriser les pages auxquels on accédera une fois connecté
app.use(express.static("./assets")) // démarre tout ce qui est image etc...
app.use(express.urlencoded({ extended: true })) // on encode notre form et on va le décoder pour qu'il soit utilisable sur notre route
app.use(express.json()) // on met du json au cas où on a besoin du json
app.use(adminRouter) // autorisation d'utiliser le adminRouter sinon ca ne marche pas 
app.use(customerRouter)// autorisation d'utiliser le adminRouter sinon ca ne marche pas


app.listen(3005, async(err) => { // ecoute le port 3005
  if (err) {
    console.log(err); // affiche l'erreur s'il y a erreur
  } else {
    //await eventModel.eventModel.deleteMany()
    console.log("vous êtes connecté"); // sinon ca marche 
  }
})
mongoose.set('strictQuery', true); // c'est grâce à ca qu'on fera en sorte que dans le Schema ce sera exactement ce qu'on mettra dans le Model
mongoose.connect(db)
  .then(() => {
    console.log("base de donnée opérationnelle");
  })
  .catch(err => {
    console.log(err);
  });


//*****************Algo pour créer les rendez-vous directement dans le serveur grace au modelEvent*************/


//  for (let i = 0; i < 10; i++) {
//    let date = new Date();
//  date.setMinutes(date.getMinutes() + (i*30));
//  dateEnd = new Date()
//  dateEnd.setMinutes(date.getMinutes() + 30),
//    obj = {
//     title:"Rendez-vous",
//     start:date.toISOString(),
//     end: dateEnd.toISOString(),
//     allDay: 0,
//      userId: "643d56ecfe93fca1e3650bbe",
//    }
//    let event = new eventModel.eventModel(obj);
//    event.save()
    
//  }
  
