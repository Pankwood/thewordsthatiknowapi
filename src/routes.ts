import { Router } from 'express';
import LanguageController from './controller/LanguageController';
import WordController from './controller/WordController';

const routes = Router();

routes.get("/word", WordController.find);
routes.post("/word", WordController.create);
routes.get("/language", LanguageController.find);


export default routes;