const mongoose = require('mongoose'); // Schema créé pour les prestations ( modification, ajout, suppression dans la view admin )

const prestationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "titre requis"],
        validate:{
            validator: function(v){
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v)
            },
            message: "Entrez un titre valide"
    }
    },
    category: {
        type: String,
        required: [true, "catégorie requise"],
    },
    price: {
        type: Number,
        required: [true, "prix requis"],
    },
    type:{
        type: String,
        required: [true, "type requis"],
    },
    photo:{
        type: String,
        required: [true, "mot de passe requis"],
    },
});

const prestationModel = mongoose.model ('prestations', prestationSchema);
exports.prestationModel = prestationModel;