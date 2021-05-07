import { ToastAndroid, Alert } from 'react-native';

// Services
import BluetoothClassic from '../../services/bluetooth-service';

// Main decalrations
const btService = new BluetoothClassic();

export class SwitchCommandModel {
    constructor(props = {
        title: String(),
        description: String(),
        labelFalse: String(),
        commandFalse: String(),
        labelTrue: String(),
        commandTrue: String(),
        helpText: String(),
        value: Boolean(),
    }) {

        this.title = props.title;
        this.description = props.description;
        this.labelFalse = props.labelFalse;
        this.commandFalse = props.commandFalse;
        this.labelTrue = props.labelTrue;
        this.commandTrue = props.commandTrue;
        this.helpText = props.helpText;
        this.value = props.value || false;

    }

    sendCommand({ btConnection, data, setter }) {
        function sendSwitchCMD({ cmd }) {

            if (btConnection && btConnection.type === 'classic') {
                btService.sendCmd({ device: btConnection.device, cmd: cmd }).then(res => {
                    setter('typeData', { ...data, value: res.result });
                }).catch(err => {
                    ToastAndroid.show(
                        err.message,
                        ToastAndroid.LONG
                    );
                });
            } else {
                Alert.alert(
                    'Erro',
                    'Você precisa estar conectado a um dispositivo bluetooth serial para enviar comandos!',
                    [{ text: 'OK' }]
                );
            }
        }

        if (data.value) {
            sendSwitchCMD({ cmd: data.commandFalse });
        } else {
            sendSwitchCMD({ cmd: data.commandTrue });
        }
    }

    sendCommandDemo({ data, setter }) {
        setter({ ...data, value: !data.value });
    }
}
