import ErrorEnum from "../dao/errors/error.enum.js";

export const ErrorHandler = (error, req, res, next) => {


    switch (error.code) {
        case ErrorEnum.CREATE_ERROR:
            return res.status(404).send({ error: error.name})
            break;
        case ErrorEnum.READ_ERROR:
            return res.status(404).send({ error: error.name})
            break;
        case ErrorEnum.UPDATE_ERROR:

            break;
        case ErrorEnum.DELETE_ERROR:

            break;

        default:
            return res.status(400).send({ error: 'Unhandled error' })
            break;
    }
   return next()
};