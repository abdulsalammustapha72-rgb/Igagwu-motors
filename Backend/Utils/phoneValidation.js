const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+234|0)(7|8|9)\d{9}$/;

    return phoneRegex.test(phone.trim());
};

module.exports = validatePhone;