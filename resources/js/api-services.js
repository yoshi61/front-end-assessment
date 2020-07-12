/*
* --------------------------------
* API configuration file
* --------------------------------
* Define API services and there configurations in this file
* Will be Axios as HTTP /AJAX interface for communicating with API Servers
* REf: https://github.com/axios/axios
* */

// XHR request timeout 1000 = 1sec
const DEFAULT_TIMEOUT = 15000;

// API PREFIX
const BASE_URL = 'https://developers.zomato.com/api/v2.1';


// Main API details for Front-end, User accounts and Application settings
const zomato =  {

                baseURL: BASE_URL,
                timeout: DEFAULT_TIMEOUT,
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'user-key': 'deb8c93fa28f9f47d793c5c45752224a'
                }
};

export default {
    zomato
}
