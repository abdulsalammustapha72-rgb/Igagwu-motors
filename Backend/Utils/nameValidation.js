const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s'-]{2,50}$/;

    return nameRegex.test(name.trim());
};

module.exports = validateName;