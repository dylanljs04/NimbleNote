import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import dotenv from 'dotenv'

dotenv.config();


// Create a rate limiter allowing 10 request per 20sec
export const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
})

