const customerRouter = require("express").Router();// Constante pour créer un routeur qui a pour nom customerRouter


customerRouter.get('/dashboard', async (req, res)=>{
    try {
        res.render('dashBoard.twig',{ //Renvoie moi au navigateur et affiche moi la page 
            customerName : req.session.customerName,
            customerFirstname : req.session.customerFirstname,
        });
    } catch (error) {
        console.log(error);
        res.json(error)
    }
    
});

customerRouter.get('/register', async (req, res) => {
    try {
        res.render("register.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.get('/modificationCustomer', async (req, res) => {
    try {
        res.render("modificationCustomer.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

customerRouter.get('/modificationProfil', async (req, res) => {
    try {
        res.render("modificationProfil.twig")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


















module.exports = customerRouter;