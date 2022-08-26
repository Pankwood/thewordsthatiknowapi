import { Router } from 'express';
import LanguageController from './controller/LanguageController';
import WordController from './controller/WordController';

const routes = Router();

routes.get("/word", WordController.find);
routes.get("/word/:wordName/language/:languageId", WordController.findByWordAndLanguage);
routes.post("/word", WordController.create);
routes.get("/language", LanguageController.find);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
    customCssUrl: 'custom-swagger-ui.css'
};

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument, options));


export default routes;