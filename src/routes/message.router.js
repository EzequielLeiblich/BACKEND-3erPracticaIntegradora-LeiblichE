import { Router } from "express";
import MessageController from "../controllers/messageController.js";
import passport from "passport";

import { rolesMiddlewareUser } from './middlewares/roles.middleware.js';

const msmRouter = Router();
let messageController = new MessageController();

msmRouter.post('/', passport.authenticate('jwt', {session: false}), rolesMiddlewareUser, async (req, res) => {
    const result = await messageController.createMessageController(req, res);
    res.status(result.statusCode).send(result);
});

msmRouter.get('/', async (req, res) => {
    const result = await messageController.getAllMessageController(req, res);
    res.status(result.statusCode).send(result);
});

msmRouter.delete('/:mid', async (req, res) => {
    const result = await messageController.deleteMessageController(req, res);
    res.status(result.statusCode).send(result);
});

export default msmRouter;