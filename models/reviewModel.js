const mongoose = require('mongoose'); // model pour les avis

const reviewSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "nom requis"],
        
    },
    avis: {
        type: String,
        required: [true, "avis requis"],
      
    },
    note:{
        type: String,
        required: [true, "note requise"],
    }
});

const reviewModel = mongoose.model ('review', reviewSchema);
exports.reviewModel = reviewModel;