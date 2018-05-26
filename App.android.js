import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      listeningState: "not started",
      audioLevel: 0,
    };


    Dialogflow.setConfiguration(
      "3080c09bf2f04ecdb8f82225741070fb", Dialogflow.LANG_PORTUGUESE
    );

    Dialogflow_V2.setConfiguration(
      "3080c09bf2f04ecdb8f82225741070fb",
      Dialogflow_V2.LANG_PORTUGUESE,
      'testv2-3b5ca'
    );



    const contexts = [{
      "name": "deals",
      "lifespan": 1,
      "parameters": {
        "name": "Sam"
      }
    }];



    //Dialogflow.setContexts(contexts);
    //Dialogflow_V2.setContexts(contexts);


    const permanentContexts = [{
      "name": "config",
      "parameters": {
        "access_token": "42 yo 42 tiny rick"
      }
    }];


    //Dialogflow.setPermanentContexts(permanentContexts);
    //Dialogflow_V2.setPermanentContexts(permanentContexts);


    const entities = [{
      "name": "shop",
      "extend": true,
      "entries": [
        {
          "value": "Media Markt",
          "synonyms": [
            "Media Markt",
          ]
        }
      ]
    }];


    //Dialogflow.setEntities(entities);
    //Dialogflow_V2.setEntities(entities);
  }

 connect(){
                 // V2 
                 Dialogflow_V2.onListeningStarted(() => {
                    this.setState({ listeningState: "started" });
                    console.log("*******************started**********************");
                  });
      
                  Dialogflow_V2.onListeningCanceled(() => {
                    this.setState({ listeningState: "canceled" });
                    console.log("*******************canceled**********************");
                  });
      
                  Dialogflow_V2.onListeningFinished(() => {
                    this.setState({ listeningState: "finished" });
                    console.log("*******************finished**********************");
                  });
      
                  Dialogflow_V2.onAudioLevel(level => {
                    this.setState({ audioLevel: level });
                    console.log("*******************onAudioLevel**********************");
                  });
      
                  Dialogflow_V2.startListening(result => {
                    console.log("*******************startListening**********************");
                    console.log(result);
                    this.setState({ result: JSON.stringify(result) });
                  }, error => {
                    this.setState({ result: JSON.stringify(error) });
                    console.log("*******************startListening.error**********************");
                  });
 }
  render() {
    Dialogflow.requestEvent("HORAS", null, r => console.log(r), e => console.log(e));
/*
    Dialogflow_V2.requestEvent("WELCOME", null,
            r => {
                console.log("*******************WELCOME**********************");
                //console.log(r)

            },
      e => console.log(e));*/


    return (
      <View style={styles.container}>

        <View style={{ flex: 4 }}>
          <Text>{"Listening State: " + this.state.listeningState}</Text>
          <Text>{"Audio Level: " + this.state.audioLevel}</Text>
          <Text>{"Result: " + this.state.result}</Text>
        </View> 

        <View style={{ flex: 1, padding: 10 }}>

          <Button title="Start Listening" onPress={() => {


            // V1
            Dialogflow.onListeningStarted(() => {
              this.setState({ listeningState: "started" });
            });

            Dialogflow.onListeningCanceled(() => {
              this.setState({ listeningState: "canceled" });
            });

            Dialogflow.onListeningFinished(() => {
              this.setState({ listeningState: "finished" });
            });

            Dialogflow.onAudioLevel(level => {
              this.setState({ audioLevel: level });
            });

            Dialogflow.startListening(result => {
              console.log(result);
              this.setState({ result: JSON.stringify(result) });
            }, error => {
              this.setState({ result: JSON.stringify(error) });
            });
          }} />

          <Button color="orange" title="Start Listening V2" onPress={() => {
             this.connect()
          }} />
                  <Button  title="Start Listening b" onPress={() => {
            Dialogflow.startListening(result=>{
                console.log(result,'************');
            }, error=>{
                console.log(error);
            });
        }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('DialogflowExample', () => App);