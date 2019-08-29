import React, { Component } from 'react';
import {
    TextInput,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native'; 
import FitImage from 'react-native-fit-image';
import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow"
import DialogBridge from "./dialog/bridge.js"
import Assistant from "./dialog/assistant.js"
export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            assistantname:"Rita",
            result: "",
            buttonText: "Start Listening",
            buttonTextHelp: "Help",
            listening: false
        };

        // console.log('\n\n\n\n*******-----------******** \n\n',Dialogflow.LANG_PORTUGUESE),"\n\n\n\n";
        // ./gcloud auth activate-service-account --key-file=/Users/freedomson/Downloads/newagent-293f5-ac379c9ab40c.json 
        // ./gcloud auth print-access-token

        this.dbridge = new DialogBridge()
        this.pliik = new Assistant()
        this.dbridge.init(Dialogflow_V2,this.pliik)  
    }

    componentDidMount(){
    }

    updateTranslation(r){
        this.setState({result:r})
    }
    
    render() { 

        return (
            <View style={styles.container}>
                <FitImage
                source={{ uri: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/1/7/1420639500876/0ae2f93b-7233-4b48-8d89-f1f1d8f95e95-2060x1343.jpeg?w=1065&q=55&auto=format&usm=12&fit=max&s=cddcb2ac9e74d7cc3242c890550afc2b' }}
                originalWidth={400}
                originalHeight={600}
                style={styles.fitImage}
                >
                <View    style={{ flex: 4 }}>
                        <Text>{"Result: " + this.state.result}</Text>
                    </View>
                    <View style={{ flex: 1, padding: 10 }}>

                        <TextInput
                            style={{
                                height: 50, 
                                width:100,
                                backgroundColor: 'white',
                                borderColor: 'gray', 
                                borderWidth: 1}}
                            onChangeText={(assistantname) => this.setState({assistantname})}
                            value={this.state.assistantname}

                        />
                    </View>
                </FitImage>

                        <Button title={this.state.buttonTextHelp} onPress={() => {
                            this.pliik.intro(Dialogflow_V2,this.updateTranslation.bind(this))
                            this.pliik.help(this.state.assistantname)
                        }}/>
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