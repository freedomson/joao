import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native'; 

import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow"
import DialogBridge from "./dialog/bridge.js"
export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            result: "",
            buttonText: "Start Listening",
            listening: false
        };

        // console.log('\n\n\n\n*******-----------******** \n\n',Dialogflow.LANG_PORTUGUESE),"\n\n\n\n";
        // ./gcloud auth activate-service-account --key-file=/Users/freedomson/Downloads/newagent-293f5-ac379c9ab40c.json 
        // ./gcloud auth print-access-token

        const dbridge = new DialogBridge()
        dbridge.init(Dialogflow_V2)
        
    }
    
    render() { 
        return (
            <View style={styles.container}>

                <View    style={{ flex: 4 }}>
                    <Text>{"Result: " + this.state.result}</Text>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                    <Button title={this.state.buttonText} onPress={() => {

                        if (this.state.listening) {
                            Dialogflow_V2.finishListening();
                            this.setState({ buttonText: "Start Listening", listening: false })
                        } else {
                            Dialogflow_V2.startListening(
                              result => {
                                this.setState({ date: new Date(),result: JSON.stringify(result) });
                            }, error => {
                                this.setState({ rdate: new Date(),result: JSON.stringify(error) });
                            },
                            (STOUT)=>{console.log("\n\n***updating\n\n",STOUT)}
                            );
                            this.setState({ buttonText: "Stop Listening", listening: true })
                        }
                    }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },

});

AppRegistry.registerComponent('ApiAiExample', () => App);