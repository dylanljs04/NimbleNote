import {rateLimit} from '../config/upstash.js'


export const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await rateLimit.limit("my-limit-key");

        if (!success) return res.status(429).json({
            message: "Too many requests, try again later"
        });
        next();

    } catch(error){
        console.log("Error at rateLimiter in middleware", error);
        next(error);
    }
}

