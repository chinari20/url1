import { ShortURL } from "../models/shorturl.model.js";
import{nanoid} from "nanoid";
export const shortUrl=async(req,res)=>{
    try{
        const userId = req.user.id;
        const{originalUrl,expiesAt,title,customUrl} = req.body;
        if(!originalUrl){
            return res.status(400).send({status:"missing originalUrl in the payload"});
        }

        let shortCode ="";
        if(customUrl){
            shortCode=customUrl;
            let exitData = await ShortURL.findOne({shortCode});
            if(exitData) return res.status(400).send({status:"it is bad request"});
        }
        else{
            shortCode=nanoid(7);
            let isUnique = false;
            while(!isUnique){
                const exitData = await ShortURL.findOne({shortCode});
                if(!exitData) isUnique=true;
                shortCode = nanoid(7);
            }
        }
        const newUser = new ShortURL({
            originalUrl,
            shortCode,
            userId,
        })
        await newUser.save();
        return res.status(200).send(newUser);

    }
    catch(error){
        console.log(error);
        return res.status(500).send({status:"INTERNAL_SERVER_ERROR"});
    }

}

export const getShortUrl=async(req,res)=>{
    try{
        const shortCode = req.params.shortcode;
         
        const data = await ShortURL.findOne({shortCode});
        console.log(data);
        if(!data){
            return res.status(404).send({status:"Not found"});
        }
       
        return res.redirect(data.originalUrl);

    }
    catch(error){
        console.log(error);
        return res.status(500).send({status:"INTERNAL_SERVER_ERROR"});
    }
}