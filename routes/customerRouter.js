const customerRouter = require("express").Router();// Constante pour créer un routeur qui a pour nom customerRouter


customerRouter.get('/dashboard', async (req, res)=>{
    res.render('dashBoard.twig');
});