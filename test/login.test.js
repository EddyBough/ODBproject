const request = require('supertest');
const app = require('../server.js'); 



describe('Test de la route de connexion', ()=>{
    test('Test de la route de connexion avec les bon login customer', async()=>{
        const response = await request(app).post('/login').send({
            email: 'di@yahoo.fr',
            password: '123'
        }).set("Accept", "application/json");
    
    
        expect(response.statusCode).toBe(302);//Le nombre 302 corresponds au code d'une redirection de page
        expect(response.headers.location).toBe("/dashboard"); //Le test compare la valeur de (response.header.location) à /dashboard
    
        
    })

    test('Test de la route de connexion avec mauvais mot de passe', async()=>{
        const response = await request(app).post('/login').send({
            email: 'di@yahoo.fr',
            password: '456'
        }).set("Accept", "application/json");
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/login"); 
    
        
    })

    test('Test de la route de connexion avec bon login admin', async()=>{
        const response = await request(app).post('/login').send({
            email: 'mileu@chelsea.fr',
            password: '456'
        }).set("Accept", "application/json");
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/adminhome");
    
        
    })

    test('Test de la route de connexion avec mauvais login admin', async()=>{
        const response = await request(app).post('/login').send({
            email: 'mileu@chelsea.fr',
            password: '789'
        }).set("Accept", "application/json");
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/login");
    
        
    })
})
