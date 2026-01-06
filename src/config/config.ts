import { config as conF } from 'dotenv'
conF()

const _config = {
    port: process.env.PORT,
    mongoDb_uri: process.env.MONGO_URI_STRING,
    env: process.env.NODE_ENV,
    jwt: process.env.JWT_ACCESS_TOKEN,
    cloudinary_cloud_name: process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.API_KEY,
    cloudinary_api_secret:process.env.API_SECRET,
};

export const config = Object.freeze(_config); 