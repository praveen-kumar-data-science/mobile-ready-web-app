import { Request, Response } from 'express';

export class IndexController {
    public async getIndex(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: "Welcome to the mobile-ready web app API!" });
    }

    public async getHealth(req: Request, res: Response): Promise<void> {
        res.status(200).json({ status: "OK" });
    }
}

export default new IndexController();