const Axios = require('axios').default;

module.exports = async (url, token = "no_token") => {
    try {
        const data = await Axios.get(url, { headers: { Authorization: token } });

        return data.data;
    } catch (e) {
        return e.toJSON();
    }
}