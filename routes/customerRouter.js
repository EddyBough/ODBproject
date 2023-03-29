const customerRouter = require("express").Router();// Constante pour créer un routeur qui a pour nom customerRouter


customerRouter.get('/dashboard', async (req, res)=>{
    res.render('dashBoard.twig',{ //Renvoie moi au navigateur et affiche moi la page 
        customerName : req.session.customerName,

    });
});

customerRouter.get('/login', async (req, res)=>{
    res.render('login.twig',{ //Renvoie moi au navigateur et affiche moi la page 
        customerName : req.session.customerName,

    });    
});

customerRouter.get('/base', async (req, res)=>{
    res.render('base.twig',{ //Renvoie moi au navigateur et affiche moi la page 
        customerName : req.session.customerName,

    });    
});

customerRouter.get('/payment', async (req, res)=>{
    res.render('payment.twig',{ //Renvoie moi au navigateur et affiche moi la page 
        customerName : req.session.customerName,

    });    
});

customerRouter.get('/confirmed', async (req, res)=>{
    res.render('confirmed.twig',{ //Renvoie moi au navigateur et affiche moi la page 
        customerName : req.session.customerName,

    });    
});

module.exports = customerRouter;