import React, { Component } from 'react';
import {
    TextInput,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    WebView
} from 'react-native'; 
import FitImage from 'react-native-fit-image';
import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow"
import DialogBridge from "./dialog/bridge.js"
import Assistant from "./dialog/assistant.js"
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    updateTranslation(r){
        this.setState({result:r})
    }
    render() { 

        return (
            <WebView 
            source={{uri: "http://192.168.1.160:8080/"}}
            style={styles.container}>

            </WebView> 
        );
    }
} 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#000',
    },

});

AppRegistry.registerComponent('ApiAiExample', () => App);