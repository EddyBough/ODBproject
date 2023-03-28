const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    nom :{
        type: String,
        required: [true, 'Le nom est obligatoire']
    },
    prenom :{
        type: String,
        required: [true, 'Le prénom est obligatoire']
    },
    email :{
        type: String,
        required: [true, "L'email est obligatoire"]
    },
    phone :{
        type: Number,
        required: [true, 'Le numero de téléphone est obligatoire']
    },
    password : {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    }

})

const customerModel = mongoose.model ('customer', customerSchema);
exports.customerModel = customerModel;

