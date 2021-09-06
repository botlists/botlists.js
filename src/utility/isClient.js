/**
 * An module to check client's validity
 * @param {*} client 
 * @returns 
 */
module.exports = (client) => {
    if (!client || client == null || !("isReady" in client)) return false;
    return true;
}