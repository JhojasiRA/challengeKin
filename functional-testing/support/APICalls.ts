const axios = require('axios');

// This file is for defining methods that communicate with the API
// This is an example of how a method like this would be implemented
export var getRoles = async(bearerToken: string = null): Promise<any> => {
  let accessToken = bearerToken? bearerToken : global.accessToken
  let url = `${process.env.API_URL}api/user`
  let config = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'X-Stress-Test-ID': process.env.STRESS_TEST_ID
    }
  }
  let response = await axios.get(url, config)
  .catch((error) => {
    throw new Error (`Error getting roles: ${error.message}\n`)
  })
  return response.data
}