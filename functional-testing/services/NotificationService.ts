import 'regenerator-runtime/runtime';
const axios = require('axios');
import {getToken5} from '../Token';
import {creds} from '../constant.json';
import { toUUID } from 'to-uuid'

export var createNotification = async() =>{
    let token = await getToken5(creds.user, process.env.PASSWORD);
    try {
        let url = `${process.env.API_CS}/api/tenant`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'

            }
        }
    let response = await axios.get(url, config);
    let userId = await toUUID(response.data.id)
    url  = `${process.env.URL_NOTIF}/api/messages/user/${userId}`
    response = await axios.post(url,{
    body: "Testing Automation Purpose",
    isEphemeral: false },config);

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
export var createMultipleNotification = async() =>{
    let token = await getToken5(process.env.USERNAME, process.env.PASSWORD);
    try {
        let url = `${process.env.API_CS}/api/tenant`;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'

            }
        }
    let response = await axios.get(url, config);
    let userId = await toUUID(response.data.id)
for (let n = 0; n < 11; n++) {
    url  = `${process.env.URL_NOTIF}/api/messages/user/${userId}`
    response = await axios.post(url,{
    body: "Testing Automation Purpose",
    isEphemeral: false },config);
}

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export var getAllNotifications = async() =>{
    let token = await getToken5(creds.user, process.env.PASSWORD);
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }
    const response = await axios.get(url,config);
    return response.status;
    } catch (error) {
        return error.response.status;
    }
}

export var getMessageById = async() =>{
    let token = await getToken5(creds.user, process.env.PASSWORD);
    let msgtenantId = await createNotification();
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages/${msgtenantId.id}`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }
    const response = await axios.get(url,config);
    return response.status;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export var deleteAllMessages = async() =>{
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
        }
    }
    const response = await axios.delete(url,config);
    return response.status;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}



