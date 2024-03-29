const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nom requis"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
          v
        );
      },
      message: "Entrez un nom valide",
    },
  },
  firstname: {
    type: String,
    required: [true, "prenom requis"],
    validator: function (v) {
      return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
        v
      );
    },
    message: "Entrez un prenom valide",
  },
  email: {
    type: String,
    required: [true, "mail requis"],
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
      },
      message: "Entrez un mail valide",
    },
  },
  phone: {
    type: String,
    required: [true, "telephone requis"],
    validate: {
      validator: function (v) {
        return /^(\+33|0)[0-9]{9}$/.test(v);
      },
      message: "Le format du n° de tel est incorrect",
    },
  },
  password: {
    type: String,
    required: [true, "mot de passe requis"],
  },
  role: {
    type: String,
    required: [true],
    enum: ["user", "admin"],
    default: "user",
  },
  fidelityPoint: {
    type: Number,
    default: 0,
  },
});

const customerModel = mongoose.model("customer", customerSchema);
exports.customerModel = customerModel;
