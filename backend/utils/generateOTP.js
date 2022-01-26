const generateOTP = (digit) => {
    if (digit == 1) {
        return Math.ceil(1 + (100 - (100 - (9 - 1))) * Math.random());
    }
    if (digit == 2) {
        return Math.ceil(10 + (100 - (100 - (99 - 10))) * Math.random());
    }
    if (digit == 3) {
        return Math.ceil(100 + (100 - (100 - (999 - 100))) * Math.random());
    }
    if (digit == 4) {
        return Math.ceil(1000 + (100 - (100 - (9999 - 1000))) * Math.random());
    }
    if (digit == 5) {
        return Math.ceil(10000 + (100 - (100 - (99999 - 10000))) * Math.random());
    }
    if (digit == 6) {
        return Math.ceil(100000 + (100 - (100 - (999999 - 100000))) * Math.random());
    }
    if (digit == 7) {
        return Math.ceil(1000000 + (100 - (100 - (9999999 - 1000000))) * Math.random());
    }
    if (digit == 7) {
        return Math.ceil(10000000 + (100 - (100 - (99999999 - 10000000))) * Math.random());
    }
    if (digit == 8) {
        return Math.ceil(100000000 + (100 - (100 - (999999999 - 100000000))) * Math.random());
    }
    if (digit == 9) {
        return Math.ceil(1000000000 + (100 - (100 - (9999999999 - 1000000000))) * Math.random());
    }
    if (digit == 10) {
        return Math.ceil(10000000000 + (100 - (100 - (99999999999 - 10000000000))) * Math.random());
    }
}

module.exports = generateOTP;