const express = require('express');
const SessionController = require('./controllers/SessionController');
const ONGController = require('./controllers/ONGController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.get('/about', (request, response) => {
    return response.json({
        evento: 'Semana OmniStack 11',
        aluno: 'Guilherme Schick'
    });
});

routes.post('/session', SessionController.login);

routes.post('/ongs', ONGController.create);
routes.get('/ongs', ONGController.list);

routes.get('/incidents', IncidentController.list);
routes.get('/incidents/:id', IncidentController.details );

routes.get('/profile', ProfileController.list);
routes.post('/incidents', ProfileController.create);
routes.delete('/incidents/:id', ProfileController.delete);

module.exports = routes;