// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import {getMydetails} from '../controllers/userController.js'
import {protect} from '../middlewares/authMiddleware.js'



const userRouter = Router();
console.log("im at user router")
userRouter.get("/me", protect, getMydetails)


export default userRouter;