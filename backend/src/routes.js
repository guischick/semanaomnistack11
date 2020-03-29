const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
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

routes.post('/session', celebrate({ 
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.login);

routes.post('/ongs', celebrate({ 
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2)
    })
}), ONGController.create);
routes.get('/ongs', ONGController.list);

routes.get('/incidents', celebrate({ 
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.list);
routes.get('/incidents/:id', IncidentController.details );

routes.get('/profile', celebrate({ 
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.list);
routes.post('/incidents', celebrate({ 
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), ProfileController.create);
routes.delete('/incidents/:id', celebrate({ 
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), ProfileController.delete);

module.exports = routes;