import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js"
import {shortUrl ,  getShortUrl} from "../controllers/shortUrlController.js"

const shortURLRouter = Router();


shortURLRouter.post("",protect,shortUrl);
shortURLRouter.get("/:shortcode",getShortUrl);


export default shortURLRouter;

