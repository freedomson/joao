import Tts from 'react-native-tts';
import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow"
function Assistant(bar) {
    this.started = 0
}
  // class methods



Assistant.prototype.intro = function(dialogflow,cb) {
    console.log('this.started',this.started)
    if (this.started===1)return
    this.started=1
    cb('gg')
    dialogflow.startListening(
        result => {
            console.log("\n\n***result\n\n",JSON.stringify(result))
          //this.setState({ date: new Date(),result: JSON.stringify(result) });
      }, error => {
        console.log("\n\n***error\n\n",JSON.stringify(error))
          //this.setState({ rdate: new Date(),result: JSON.stringify(error) });
      },
      (STOUT)=>{
          console.log("\n\n***updating\n\n",STOUT)
          cb(STOUT)
        }
      );

};

Assistant.prototype.help = function(assistantname) {
    Tts.getInitStatus().then(() => {
    Tts.speak(`Exemplo: Olá ${assistantname}, que horas são`); 
        // São 14 horas e 26 minutos em Portugal Continental. 
        // É agosto do ano 2020, é dia 17, e é domingo.
    }); 
};

module.exports = Assistant;