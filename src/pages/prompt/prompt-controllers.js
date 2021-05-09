import {
    ToastAndroid,
    Alert,
} from 'react-native';
// Services
import BluetoothService from '../../services/bluetooth-service';

// Main declarations
const btService = new BluetoothService();

export function handleInputCMD(ev, setCurrCMD) {
    setCurrCMD(ev);
}

export function sendCMD({btConnection, historyCMD, setHistoryCMD, currCMD, setCurrCMD}) {
    if (btConnection && btConnection.type === 'classic'){
        btService.sendCmd({ device: btConnection.device, cmd: currCMD }).then(res => {
            setHistoryCMD([...historyCMD, currCMD, res.message]);
            setCurrCMD('');
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
            [{ text: 'OK'}]
        );
    }
}

export function startMonitor({ btConnection, listeners, listenersSetter, history, historySetter }){
    btService.listenSerial({
        name: 'serial-monitor',
        btConnection,
        listeners,
        listenersSetter,
        callback: (received, { historyCMD, historyCMDSetter })=>{
            let data = JSON.stringify(received.data);
            console.log(data)
            historyCMDSetter([...historyCMD, data]);
        },
        callbackParams: { historyCMD: history, historyCMDSetter: historySetter },
    });
}
