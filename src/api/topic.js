var CONFIG = require("../config.json");
const TOPIC_ENDPOINT = CONFIG.API_SERVER_URL;
const APPID = CONFIG.APPID;

class TopicService {

  async getTopicsByLocation(lat = '35.79449997305192' , lon = '139.79078800000002') {
    
    const url = `${TOPIC_ENDPOINT}/topics/${APPID}/${lat}/${lon}`;
    console.log("getTopicsByLocation",url);
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
    .then((response) => response.json())
    .then((responseJson) => {
       console.log('api:',responseJson);
      if (responseJson.status === 200) {
        return {error:false , topics:{topics:responseJson.topics,totalPoint:responseJson.totalPoint}};   
      }else{
        return {error:true};
        // _handleError(`something went wrong: ${response.status}, ${response.statusText}`);
      }
    })
    .catch(function(error) { 
      throw new Error(`TopicService getTopicsByLocation failed -, ${error}`);
    }); 
  }
}

export default new TopicService();