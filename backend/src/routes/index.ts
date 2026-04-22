import { Router } from 'express';
import { IndexController } from '../controllers';
import { Express } from 'express';

const router = Router();
const indexController = new IndexController();

export function setRoutes(app: Express): void {
    app.use('/api', router);
    router.get('/', indexController.getIndex);
    // Add more routes here as needed
}