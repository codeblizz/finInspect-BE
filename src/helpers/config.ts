import dotenv from 'dotenv';
dotenv.config();

const config:any = {};

for(const key in process.env) {
    config[key] = process.env[key]
}

export default config;