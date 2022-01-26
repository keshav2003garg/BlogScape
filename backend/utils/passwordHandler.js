const bcrypt = require('bcryptjs');


const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(password, salt);
    return securedPassword;
}

const matchPassword = async (password, compPassword) => {
    const comparePassword = await bcrypt.compare(password, compPassword);
    return comparePassword;
}


module.exports = { generateHash, matchPassword };