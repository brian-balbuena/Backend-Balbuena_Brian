import dotenv from "dotenv";

export const getVariables = (option) => {

    const enviroment = option.opts().mode;
    
    dotenv.config({
        path: enviroment === 'production' ? 'src/configs/.env.production' : 'src/configs/.env.development'
    });

    return {
        port : process.env.PORT,
        mongoURL: process.env.mongoURL,
        secret: process.env.secret,
        work_environment: process.env.work_environment,
        mailing_user: process.env.mailing_user,
        mailing_service: process.env.mailing_service,
        mailing_password: process.env.mailing_password
      }
};
