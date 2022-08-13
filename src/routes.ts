import { Router } from 'express';
import WordController from './controller/WordController';

const routes = Router();

routes.get("/word", WordController.find);
routes.post("/word", WordController.create);

export default routes;