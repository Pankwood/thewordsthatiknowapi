import { Router } from 'express';
import BasicAuthentication from './auth';
import LoginController from './controller/account/LoginController';
import SignupController from './controller/account/SignupController';
import LanguageController from './controller/LanguageController';
import WordController from './controller/WordController';

const routes = Router();

routes.get("/word", WordController.find);
routes.get("/word/:wordName/language/:languageId", WordController.findByWordAndLanguage);
routes.post("/word", BasicAuthentication, WordController.create);
routes.delete("/word/:wordName/language/:languageId", BasicAuthentication, WordController.deleteByWordAndLanguage);
routes.delete("/word", BasicAuthentication, WordController.deleteAll);

routes.get("/language", LanguageController.find);

routes.post("/account/login", BasicAuthentication, LoginController.login);
routes.post("/account/signup", BasicAuthentication, SignupController.signup);


export default routes;