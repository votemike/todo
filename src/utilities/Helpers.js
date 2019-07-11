function decimalToHex(decimal) {
    let hex = Number(decimal).toString(16);

    while (hex.length < 2) {
        hex = "0" + hex;
    }

    return hex;
}

function truncateText(text, length) {
    return text.length > length ? `${text.substring(0, length)}...` : text;
}

module.exports = {
    decimalToHex,
    truncateText
};
