const {body, validationResult, checkSchema} = require('express-validator');

function validate() {
    return [
        body('id', 'id not valid number').exists().isNumeric(),
        body('name', 'name dosn`t not exists or invalid').exists().isString().escape(),
        body('gender', 'password doesn\'t exists').isIn(['male', 'female']),
        (req, res, next) => {
            try {
                validationResult(req).throw();
                next();
            } catch (err) {
                console.log(err);
                res.status(400).json({
                    status: 400,
                    error: err.errors.map(value => value.msg).join()
                });
            }
        }
    ];
}

function validateSchema(schema) {
    const validationMiddleware = checkSchema(schema);
    return async (req, res, next) => {
        await validationMiddleware.run(req);
        const result = validationResult(req);
        if (result.isEmpty()) {
            next();
            return;
        }
        const error = Error(result.array().map(value => value.msg).join());
        error.statusCode = 400;
        next(error);
    };
}

//TODO 5: Add missing fields
const jediSchema = {
    id: {
        isInt: true,
        errorMessage: 'ID is wrong',
        in: ['body']
    },
    name: {
        isString: {
            errorMessage: "Name is wrong"
        },
        isLength: {
            errorMessage: 'Name should be 4 chars long',
            options: { min: 4 },
        },
        in: ['body']
    },
    height: {
        isInt: {
            errorMessage: 'height should be between 10 and 300',
            options: { 
                gt: 0, 
                lt:300
            }
        },
        in: ['body']
    },
    mass: {
        isInt: {
            errorMessage: 'mass should be grater than 0',
            options: {
                gt: 0
            }
        },
        in: ['body']
    },
    hair_color: {
        isString:{
            errorMessage: "hair color is wrong"
        },
        isLength: {
            errorMessage: "Length should be at least 3 chars long",
            options: {min: 3}
        },
        in: ['body']
    },
    skin_color:{
        isString:{
            errorMessage: "skin color is wrong",
        },
        isLength: {
            errorMessage: "skin color should be at least 3 chars long",
            options: { 
                min: 3 
            }
        },
        in: ['body']
    },
    birth_year: {
        isString:{
            errorMessage: "birth year is wrong"
        },
        isLength: {
            errorMessage: "birth year should be at least 4 chars long",
            options: { min: 4 }
        },
        in: ['body']
    },
    eye_color: {
        isString: {
            errorMessage: "eye color is wrong"
        },
        isLength: {
            errorMessage: "eye color should be at least 4 chars long",
            options: {min: 4}
        },
        in: ['body']
    },
    gender: {
        isString: {
            errorMessage: "gender is wrong",
            options: ['male', 'female', 'unknown']
        },
        in: ['body']
    }
};

module.exports = {
    validateSchema,
    jediSchema
};