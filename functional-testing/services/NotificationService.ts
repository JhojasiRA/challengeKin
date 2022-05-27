import 'regenerator-runtime/runtime';
const axios = require('axios');
import {getToken5, getToken} from '../Token';
import { toUUID } from 'to-uuid'

export var createNotification = async() =>{
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
export var createTenantNotification = async() =>{
    let token = await getToken();
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages/tenant/654afe138843574c8a7cf198cedc04e3`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
            body: "Automation tenant Test message",
            isEphemeral: true
    },config);
    var messageAndStatus = {id:response.data.id,status:response.status};
    return messageAndStatus;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


//--------------get messages
export var getAllNotifications = async() =>{
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
        }
    }
    const response = await axios.get(url,config);
    var count = 0;
    var flag = false;
     while (flag == false) {
        var userInfo = {status:response.status,Message:response.data[count].body,role:response.data[count].role};
        if (userInfo.Message == 'Your have been granted access to test automation tenant') {
            flag = true;
        }
        if(userInfo.Message == 'Invitation accepted by Tester4 User for accessing Vault' && userInfo.role == 'Admin'){
            flag = true;
        }

        else {
            count++;
        }
     }
    return userInfo;
    } catch (error) {
        return error.response.status;
    }
}


export var getMessageByTenantId = async() =>{
    let msgtenantId = await createTenantNotification();
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages/${msgtenantId.id}`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
        }
    }
    const response = await axios.get(url,config);
    return response.status;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export var patchAllProperties = async() =>{
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.patch(url,{
        isRead: true
      },config);
    return response.status;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
//Deletes

export var deleteByMessageId = async() =>{
    let msgtenantId = await createTenantNotification();
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages/${msgtenantId.id}`
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

export var deleteAllMessages = async() =>{
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
        }
    }
    const response = await axios.delete(url,config);
    console.log("Delete ALL messages");
    console.log(response.data);
    console.log(response.status);
    return response.status;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}



