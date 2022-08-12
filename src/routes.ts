import { Router } from 'express';
import WordController from './controller/WordController';

const routes = Router();

routes.post("/word", WordController.create);

export default routes;