import 'regenerator-runtime/runtime';
const axios = require('axios');
import {getToken} from '../Token';

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

export var createUserNotification = async() =>{
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages/user/654afe138843574c8a7cf198cedc04e3`
    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.accessToken,
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post(url,{
            body: "Automation User Test message",
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

export var getMessageByUserId = async() =>{
    let messageId = await createUserNotification();
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages/${messageId.id}`
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

//--------------patch

export var patchReadProperty = async() =>{
    let messageId = await createUserNotification();
    try {
    let url  = `${process.env.URL_NOTIF}/api/messages/${messageId.id}`
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



