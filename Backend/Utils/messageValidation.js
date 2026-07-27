const validateMessage = (message) => {

    const trimmedMessage = message.trim();

    return trimmedMessage.length >= 10 && trimmedMessage.length <= 1000;
};

module.exports = validateMessage;