const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "titre requis"],
    },
    start: {
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
    type: mongoose.Schema.Types.ObjectId,
   }
});

const eventModel = mongoose.model ('event', eventSchema);
exports.eventModel = eventModel;