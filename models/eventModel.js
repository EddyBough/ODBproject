const mongoose = require('mongoose');//Modele pour les evenements dans le calendrier 

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "titre requis"],
    },
    start: {
        type: String,
        required: [true, "début requis"],
    },
    dateString: {
        type: String,
        required: [true, "début requis"],
    },
    end: {
        type: String,
        required: [true, "fin requise"],

    },
    allDay:{
        type: Number,
        required: [true, "toute la journée"],
    },
   userId: {
    type: mongoose.Schema.Types.ObjectId,//Mongoose recupere dans le userID de l'evenement, l'id du customer qui a creer l'évènement
    ref: "customer"
   }
});

const eventModel = mongoose.model ('event', eventSchema);
exports.eventModel = eventModel;