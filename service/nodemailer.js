const nodemailer = require("nodemailer");//On a installé une dependance dans le package json qui va servir à envoyé des mail à l'utilisateur

async function sendMail(userEmail, newPassword) {// Creer une fonction qui va envoyer un email à l'utilisateur
try {
    let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tonEmail@gmail.com",
        pass: "tonMotDePasse",
    },
    });

    let info = await transporter.sendMail({
    from: "tonEmail@gmail.com",
    to: userEmail,
    subject: "Nouveau mot de passe",
    text: `Votre nouveau mot de passe est : ${newPassword}`,
    });

    console.log(`Email sent to ${userEmail}: ${info.messageId}`);
} catch (error) {
    console.log(error);
}
}

module.exports = { sendMail };
