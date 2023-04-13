const mongoose = require('mongoose');

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
    phone:{
        type: Number,
        required: [true, "telephone requis"],
    },
    password:{
        type: String,
        required: [true, "mot de passe requis"],
    },
    role:{
        type: String,
        required: [true],
        enum:['user','admin'],
        default: 'user',
    }
});

const prestationModel = mongoose.model ('prestation', prestationSchema);
exports.prestationModel = prestationModel;