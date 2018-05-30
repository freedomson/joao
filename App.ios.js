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
            buttonText: "Start Listening",
            listening: false
        };

        console.log('\n\n*******-----------******** \n\n',Dialogflow.LANG_PORTUGUESE);

        Dialogflow_V2.setConfiguration(
            "0f8ecacaf23449b1abd9dc80a884069a", Dialogflow.LANG_PORTUGUESE
        );
    } 

    
    render() { 
        Dialogflow_V2.requestEvent("WELCOME", null, r => console.log(r), e => console.log(e));
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
                                this.setState({ result: JSON.stringify(result) });
                            }, error => {
                                this.setState({ result: JSON.stringify(error) });
                            },
                            ()=>{console.log("\n\n***updating\n\n")}
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