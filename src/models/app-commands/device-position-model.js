import { ToastAndroid, Alert } from 'react-native';

// Services
import BluetoothClassic from '../../services/bluetooth-service';

// Main decalrations
const btService = new BluetoothClassic();

export class DevicePositionCommandModel {
    constructor(props = {
        title: String(),
        description: String(),
        helpText: String(),
        buttonText: String(),
        commandStart: String(),
        commandStop: String(),
        value: Boolean(),
    }) {

        this.title = props.title;
        this.description = props.description;
        this.helpText = props.helpText;
        this.buttonText = props.buttonText || 'Acompanhar localização';
        this.commandStart = props.commandStart;
        this.commandStop = props.commandStop;
        this.value = props.value || false;

    }

    sendCommand({ btConnection, data, setter, setMapsModalCtrl }) {

        setMapsModalCtrl(true);
        
        // if (btConnection && btConnection.type === 'classic') {
            // btService.sendCmd({ device: btConnection.device, cmd: data.commandLine }).then(res => {
            //     setter('typeData', { ...data, value: res.result });
            // }).catch(err => {
            //     ToastAndroid.show(
            //         err.message,
            //         ToastAndroid.LONG
            //     );
            // });
        // } else {
            // Alert.alert(
            //     'Erro',
            //     'Você precisa estar conectado a um dispositivo bluetooth serial para enviar comandos!',
            //     [{ text: 'OK' }]
            // );
        // }
    }

    sendCommandDemo({ data, setter }) {
        setter({ ...data, value: !data.value });
    }
}
