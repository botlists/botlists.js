const Axios = require('axios').default;

module.exports = async (url, token = "no_token", h) => {
    try {
        const data = await Axios.get(`https://api.botlists.com${url}`, { headers: { Authorization: token } });

        return data.data;
    } catch (e) {
        return h !== false ? e.toJSON() : e.response.data;
    }
}