import { config as conF } from 'dotenv'
conF()

const _config = {
    port: process.env.PORT,
    mongoDb_uri:process.env.MONGO_URI_STRING
};

export const config = Object.freeze(_config); 