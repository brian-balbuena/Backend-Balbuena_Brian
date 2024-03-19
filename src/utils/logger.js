import winston from "winston";

const customLevelOPtions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5

    }
}

const devLogger = winston.createLogger({
    levels: customLevelOPtions.levels,
    transports: [
        new winston.transports.Console({level: 'debug'})
    ]


});

const prodLogger = winston.createLogger({
    levels: customLevelOPtions.levels,
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.File({filename: './errors.log', level: 'error'})
    ]
});


export const addLogger = (work_environment) => {
    return (req, res, next) => {
   
        switch (work_environment) {
            case 'development':
                req.logger = devLogger;
                break;

            case 'production' :
            req.logger = prodLogger;
            break;

            default:
                throw new Error("enviroment doesnt exists")
        }
        next(); 
    };
};