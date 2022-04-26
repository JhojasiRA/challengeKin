import 'regenerator-runtime/runtime';
import { creds } from './constant.json';;
const axios = require('axios');

export var getToken = async () => {
    try {
        let url = `${process.env.IS_URL}`
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'No-cache': 'no-cache'
            }
        }
        let params;
        params = new URLSearchParams();
        params.append("client_id", "aaBfPCIAl15xFjeRLXIFSFryVWP5j63M");
        params.append("client_secret", process.env.CLIENT_SECRET);
        params.append("scope", "openid profile email phone address my_rockwell");
        params.append("grant_type", "password");
        params.append("audience", "https://lemans.common");
        params.append("username", creds.user);
        params.append("password", process.env.PASSWORD);
        const response = await axios.post(url, params, config);
        global.accessToken = response.data.access_token;
        var token = response.data.access_token;
        return token;
    } catch (error) {
    }
}
export var getToken2 = async () => {
    try {
        let url = `${process.env.IS_URL}`
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'No-cache': 'no-cache'
            }
        }
        let params;
        params = new URLSearchParams();
        params.append("client_id", "aaBfPCIAl15xFjeRLXIFSFryVWP5j63M");
        params.append("client_secret", process.env.CLIENT_SECRET);
        params.append("scope", "openid profile email phone address my_rockwell");
        params.append("grant_type", "password");
        params.append("audience", "https://lemans.common");
        params.append("username", creds.user2);
        params.append("password", process.env.PASSWORD);

        const response = await axios.post(url, params, config);
        global.accessToken2 = response.data.access_token;
        var token = response.data.access_token;
        return token;
    } catch (error) {
    }
}

export var getToken4 = async () => {
    try {
        let url = `${process.env.IS_URL}`
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'No-cache': 'no-cache'
            }
        }
        let params;
        params = new URLSearchParams();
        params.append("client_id", "aaBfPCIAl15xFjeRLXIFSFryVWP5j63M");
        params.append("client_secret", process.env.CLIENT_SECRET);
        params.append("scope", "openid profile email phone address my_rockwell");
        params.append("grant_type", "password");
        params.append("audience", "https://lemans.common");
        params.append("username", "testuser8@rockwellautomation.com");
        params.append("password", process.env.PASSWORD);
        const response = await axios.post(url, params, config);
        global.accessToken = response.data.access_token;
        var token = response.data.access_token;
        return token;
    } catch (error) {
    }
}

    export var getToken5 = async (user: string, password:string) => {
        try {
            let url = `${process.env.IS_URL}`
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'No-cache': 'no-cache'
                }
            }
            let params;
            params = new URLSearchParams();
            params.append("client_id", "aaBfPCIAl15xFjeRLXIFSFryVWP5j63M");
            params.append("client_secret", process.env.CLIENT_SECRET);
            params.append("scope", "openid profile email phone address my_rockwell");
            params.append("grant_type", "password");
            params.append("audience", "https://lemans.common");
            params.append("username", user);
            params.append("password", password);
            const response = await axios.post(url, params, config);
            var token = response.data.access_token;
            return token;
        } catch (error) {
        }
    }