const validate = require('validator');

const validateEmail = (email) => {
    return validate.isEmail(email);
};

module.exports = validateEmail;