/* eslint-disable no-new-func */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { defaultTheme } from '../../../../../styles/theme';

// Modals
import MapsModal from '../../../../modals/maps/maps-modal';

// Contexts
import { useBtConnection } from '../../../../../core/contexts/bt-connection';

// Demo model
import { DevicePositionCommandModel } from '../../../../../models/app-commands/device-position-model';

// Icons
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Style components
import { Card, LabelInput, InputDark, P, CenterP, Title, Toolbar, ToolbarItem, IconButton, DefaultButton } from '../../../../../styles/main';

// Demo dada declaration
const cmdModel = new DevicePositionCommandModel({
    title: 'Título',
    description: 'Descrição do comando aqui... Caso não quera adicionar título ou descrição é só deixar o campo em branco.',
    helpText: 'Você pode inserir alguma observação aqui também...',
});

export default function DevicePositionCommand({ initialData, mode, formHandleChanges, viewType, deleteCommand }) {
    const [ demoData, setDemoData ] = useState(cmdModel);
    const { btConnection } = useBtConnection();
    
    if (mode === 'view') {
        var handleChanges = new Function();
        var setDevicePositionData;

        if (viewType === 'demo'){
            handleChanges = cmdModel.sendCommandDemo;
            setDevicePositionData = setDemoData;
        } else {
            handleChanges = cmdModel.sendCommand;
            setDevicePositionData = formHandleChanges;
        }

        return <DevicePositionCommandView
            btConnection={btConnection}
            devicePositionData={initialData || demoData}
            setDevicePositionData={setDevicePositionData}
            handleChanges={handleChanges}
            viewType={viewType}
        />;
    } else if (mode === 'form') {
        var handleChanges = new Function();
        handleChanges = formHandleChanges;

        return <DevicePositionCommandForm
            initialData={initialData}
            handleChanges={handleChanges}
            deleteCommand={deleteCommand}
        />;
    } else {
        return <></>;
    }
}

export function DevicePositionCommandView({ btConnection, devicePositionData, setDevicePositionData, handleChanges, viewType }) {
    const [ mapsModalCtrl, setMapsModalCtrl ] = useState(false);
    let cardStyle = {};
    
    if (viewType === 'demo') {
        cardStyle = {
            borderWidth: 2,
            borderColor: defaultTheme.text[0],
            borderStyle: 'dashed',
        };
    }

    return (
        <Card rounded="soft" style={cardStyle}>
            {devicePositionData.title ? <Title>{devicePositionData.title}</Title> : <></>}
            {devicePositionData.description ? <P style={{ marginBottom: 10 }}>{devicePositionData.description}</P> : <></>}

            <DefaultButton
                rounded="soft"
                style={{marginBottom: 3}}
                onPress={()=>handleChanges({ btConnection: btConnection, data: devicePositionData, setter: setDevicePositionData, setMapsModalCtrl })}
            >
                <IonIcons name="location" size={15} color={defaultTheme.text[0]} style={{marginRight: 1}} />
                <P>{devicePositionData.buttonText}</P>
            </DefaultButton>

            {devicePositionData.helpText ? <CenterP size="0.8" color={defaultTheme.text[3]}>{devicePositionData.helpText}</CenterP> : <></>}

            <Modal visible={mapsModalCtrl} transparent={true} animationType="slide">
                <MapsModal modalControl={setMapsModalCtrl} cmdData={devicePositionData} />
            </Modal>
        </Card>
    );
}

export function DevicePositionCommandForm({ handleChanges, initialData, deleteCommand }) {
    function handleThisChanges(prop, text) {
        handleChanges('typeData', { ...initialData, [prop]: text });
    }

    return (
        <View>
            <Toolbar style={{justifyContent: 'flex-end'}}>
                <ToolbarItem>
                    <IconButton onPress={() => deleteCommand()}>
                        <FontAwesome5 name="trash-alt" size={20} color={defaultTheme.text[0]} />
                    </IconButton>
                </ToolbarItem>
            </Toolbar>

            <LabelInput style={{ color: defaultTheme.text[0] }}>Título:</LabelInput>
            <InputDark
                color={defaultTheme.text[0]}
                onChangeText={(text) => handleThisChanges('title', text)}
                value={initialData.title}
            />

            <LabelInput style={{ color: defaultTheme.text[0] }}>Descrição:</LabelInput>
            <InputDark
                color={defaultTheme.text[0]}
                onChangeText={(text) => handleThisChanges('description', text)}
                value={initialData.description}
            />

            <LabelInput style={{ color: defaultTheme.text[0] }}>Comando para iniciar:</LabelInput>
            <InputDark
                color={defaultTheme.text[0]}
                onChangeText={(text) => handleThisChanges('commandStart', text)}
                value={initialData.commandStart}
            />
            <LabelInput style={{ color: defaultTheme.text[0] }}>Comando para parar:</LabelInput>
            <InputDark
                color={defaultTheme.text[0]}
                onChangeText={(text) => handleThisChanges('commandStop', text)}
                value={initialData.commandStop}
            />

            <LabelInput style={{ color: defaultTheme.text[0] }}>Texto de botão:</LabelInput>
            <InputDark
                color={defaultTheme.text[0]}
                onChangeText={(text) => handleThisChanges('buttonText', text)}
                value={initialData.buttonText}
            />

            <LabelInput style={{ color: defaultTheme.text[0] }}>Texto de ajuda:</LabelInput>
            <InputDark
                color={defaultTheme.text[0]}
                onChangeText={(text) => handleThisChanges('helpText', text)}
                value={initialData.helpText}
            />
        </View>
    );
}
