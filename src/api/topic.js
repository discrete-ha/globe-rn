
const TOPIC_ENDPOINT = 'http://api-globe.7e14.starter-us-west-2.openshiftapps.com';
const APPID = require("../../config.json").appid;

class TopicService {

  async getTopicsByLocation(lat = '35.79449997305192' , lon = '139.79078800000002') {

    const url = `${TOPIC_ENDPOINT}/topics/${APPID}/${lat}/${lon}`;

    let _handleError = function(msg){
      throw new Error(msg);
    };
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(response){ 
      console.log('api:',response);
      if (response.ok) {
        return {error:false , topics:response._bodyText};   
      }else{
        return {error:true};
        // _handleError(`something went wrong: ${response.status}, ${response.statusText}`);
      }
    }) 
    .catch(function(error) { 
      throw new Error(`TopicService getTopicsByLocation failed, HTTP status ${response.status}`);
    }); 
  }
}

export default new TopicService();