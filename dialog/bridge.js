// Constructor

function Bridge(bar) {
    // always initialize all instance properties
    this.df = null
    //this.gtoken = null
    this.serviceAccount=''
    this.authenticationHeaderToken = ''; // default value
    this.url=''
  }
  // class methods

  Bridge.prototype.init = function(df) {
      this.df=df
      this.getToken()
  };

  Bridge.prototype.setConfiguration = function(token){
    /* console.log(      
      token,
      this.df.LANG_PORTUGUESE,
      this.serviceAccount) */
    this.df.setConfiguration(
      token,
      this.df.LANG_PORTUGUESE,
      this.serviceAccount
      );
  };   

  Bridge.prototype.getToken = function(){
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
          // console.log('***** TOKEN RESPONSE *****',responseJson.token)
          this.setConfiguration(responseJson.token)
    })
    .catch((error) => {
      console.error(error);   
    });
  }
  // export the class
  module.exports = Bridge;

 