// Constructor
import cfg from '../config.js';
function Bridge(bar) {
    // always initialize all instance properties
    this.df = null
    //this.gtoken = null
    this.serviceAccount=cfg.serviceAccount
    this.authenticationHeaderToken = cfg.authenticationHeaderToken; // default value
    this.url=cfg.url
  }
  // class methods

  Bridge.prototype.init = function(dialogflow,assistant) {
      //return;
      this.dialogflow=dialogflow
      this.assistant=assistant
      this.getToken()
  }; 

  Bridge.prototype.setConfiguration = function(token){

    this.dialogflow.setConfiguration(
      token,
      this.dialogflow.LANG_PORTUGUESE,
      this.serviceAccount
      );
      this.assistant.intro
  };   

  Bridge.prototype.getToken = function(){
    console.log(     
      this.url, 
      this.authenticationHeaderToken,
      this.dialogflow.LANG_PORTUGUESE,
      this.serviceAccount)
    fetch(this.url, {
      method: 'GET',
      headers: {
        token: this.authenticationHeaderToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
          console.log('***** TOKEN RESPONSE *****'/*,responseJson.token*/)
          this.setConfiguration(responseJson.token)
    })
    .catch((error) => { 
      console.error('DASSSSSSS',responseJson.token);  
      this.setConfiguration("openshift tokenserver outage") 
    });
  }
  // export the class
  module.exports = Bridge;

 