/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// Contexts
import { useBtListener } from '../../../core/contexts/bt-listener';
import { useBtConnection } from '../../../core/contexts/bt-connection';

// Services
import BluetoothService from '../../../services/bluetooth-service';

// Components
import Header from '../../../components/headers/back-buttom/back-button';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Styled components
import { DefaultModal, FullModalBox, RoundFlotButton } from '../../../styles/main';
import { defaultTheme } from '../../../styles/theme';

// Main declarations
const btService = new BluetoothService();
const styles = StyleSheet.create({
    mapView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});


export default function MapsModal({ modalControl, cmdData }) {
    const { btConnection, setBtConnection } = useBtConnection();
    const { btListener, setBtListener } = useBtListener();
    const [currLocation, setCurrLocation] = useState({ latitude: -25.418267, longitude: -49.264517 });
    const [region, setRegion] = useState({ latitude: -25.418267, longitude: -49.264517 });
    const [myLocation, setMyLocation] = useState(false);

    async function closeModal(){
        
        btService.removeListeners({listeners: btListener});
        btService.sendCmd({ device: btConnection.device, cmd: cmdData.commandStop}).then(response=>{
     
        }).catch(err=>{
            console.error(err);
        }).finally(()=>{
            modalControl(false);
        });
    }

    useEffect(async ()=>{
        getMyLocation({setMyLocation, setRegion});

        let response = await btService.sendCmd({ device: btConnection.device, cmd: cmdData.commandStart});

        if (response.result){
            btService.listenSerial({
                name: 'track-device',
                btConnection,
                listeners: btListener,
                listenersSetter: setBtListener,
                wantedCMD: 'device=trackLocation',
                callback: (data, callbackParams)=>{
                    if (data.result.latitude && data.result.longitude)
                    setCurrLocation({latitude: Number(data.result.latitude), longitude: Number(data.result.longitude) });
                    // setRegion({latitude: Number(parsed.result.latitude), longitude: Number(parsed.result.longitude) });
                },
                callbackParams: {},
            });
        }
    }, []);

    return (
        <DefaultModal>
            <FullModalBox color="#fff">

                <MapView
                    initialRegion={{
                        latitude: currLocation.latitude,
                        longitude: currLocation.longitude,
                        latitudeDelta: 0.0042,
                        longitudeDelta: 0.0031,
                    }}
                    // region={{
                    //     latitude: region.latitude,
                    //     longitude: region.longitude,
                    //     latitudeDelta: 0.0042,
                    //     longitudeDelta: 0.0031,
                    // }}
                    style={styles.mapView}
                >

                    {currLocation && <Marker
                        coordinate={currLocation}
                    />}

                    {myLocation && <Marker
                        coordinate={myLocation}
                    />}
                </MapView>

                <Header backBtnSetter={modalControl} backAction={closeModal} />

                <RoundFlotButton color={defaultTheme.contrast} onPress={() => getMyLocation({setMyLocation,setRegion})}>
                    <MaterialIcons name="my-location" size={20} color={defaultTheme.text[0]} />
                </RoundFlotButton>

            </FullModalBox>
        </DefaultModal>
    );
}

function getMyLocation({setMyLocation,setRegion}) {
    let myLocationListener = Geolocation.watchPosition(geo => {

        let latitude = geo.coords.latitude;
        let longitude = geo.coords.longitude;
        setMyLocation({ latitude, longitude });
        setRegion({ latitude, longitude });

    }, err => {
        Alert.alert(
            'Erro',
            'Ocorreu um erro ao consultar sua localização: ' + err.message,
            [{ text: 'OK' }]
        );
    },
    {
        maximumAge: 1000,
        timeout: 120000,
    });
}


