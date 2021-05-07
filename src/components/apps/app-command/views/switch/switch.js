/* eslint-disable no-new-func */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { defaultTheme } from '../../../../../styles/theme';

// Contexts
import { useBtConnection } from '../../../../../core/contexts/bt-connection';

// Demo model
import { SwitchCommandModel } from '../../../../../models/app-commands/switch-model';

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Style components
import { Card, LabelInput, InputDark, P, Title, Toolbar, ToolbarItem, IconButton } from '../../../../../styles/main';

// Demo dada declaration
const cmdModel = new SwitchCommandModel({
    title: 'Título',
    description: 'Descrição do comando aqui... Caso não quera adicionar título ou descrição é só deixar o campo em branco.',
    helpText: 'Você pode inserir alguma observação aqui também...',
    labelFalse: 'Opção A',
    labelTrue: 'Opção B',
});

export default function SwitchCommand({ initialData, mode, formHandleChanges, viewType, deleteCommand }) {
    const [demoData, setDemoData] = useState(cmdModel);
    const { btConnection } = useBtConnection();
    
    if (mode === 'view') {
        var handleChanges = new Function();
        var setSwitchData;
        if (viewType === 'demo'){
            handleChanges = cmdModel.sendCommandDemo;
            setSwitchData = setDemoData;
        } else {
            handleChanges = cmdModel.sendCommand;
            setSwitchData = formHandleChanges;
        }

        return <SwitchCommandView
            btConnection={btConnection}
            switchData={initialData || demoData}
            setSwitchData={setSwitchData}
            handleChanges={handleChanges}
            viewType={viewType}
        />;
    } else if (mode === 'form') {
        var handleChanges = new Function();
        handleChanges = formHandleChanges;

        return <SwitchCommandForm
            initialData={initialData}
            handleChanges={handleChanges}
            deleteCommand={deleteCommand}
        />;
    } else {
        return <></>;
    }
}

export function SwitchCommandView({ btConnection, switchData, setSwitchData, handleChanges, viewType }) {
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
            {switchData.title ? <Title>{switchData.title}</Title> : <></>}
            {switchData.description ? <P style={{ marginBottom: 10 }}>{switchData.description}</P> : <></>}
            <Toolbar>
                <ToolbarItem style={{ flex: 1}}>
                    {(switchData.labelFalse && switchData.labelTrue) ? <P>{switchData.labelFalse} / {switchData.labelTrue}</P> : <></>}
                </ToolbarItem>
                <ToolbarItem>
                    <Switch
                        value={switchData.value}
                        thumbColor={switchData.value ? defaultTheme.contrast : defaultTheme['secondary-light']}
                        trackColor={{
                            true: defaultTheme['contrast-dark'],
                            false: defaultTheme['secondary-dark'],
                        }}
                        onValueChange={() => handleChanges({ btConnection: btConnection, data: switchData, setter: setSwitchData  })}
                    />
                </ToolbarItem>
            </Toolbar>
            {switchData.helpText ? <P size="0.8" color={defaultTheme.text[3]}>{switchData.helpText}</P> : <></>}
        </Card>
    );
}

export function SwitchCommandForm({ handleChanges, initialData, deleteCommand }) {
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

            <LabelInput style={{ color: defaultTheme.text[0] }}>Texto de ajuda:</LabelInput>
            <InputDark
                color={defaultTheme.text[0]}
                onChangeText={(text) => handleThisChanges('helpText', text)}
                value={initialData.helpText}
            />

            <Card color={defaultTheme['primary-dark']} rounded="soft">
                <LabelInput style={{ color: defaultTheme.text[0] }}>Etiqueta do False:</LabelInput>
                <InputDark
                    color={defaultTheme.text[0]}
                    onChangeText={(text) => handleThisChanges('labelFalse', text)}
                    value={initialData.labelFalse}
                />
                {initialData.labelFalse ? (<>
                <LabelInput style={{ color: defaultTheme.text[0] }}>Comando do {initialData.labelFalse}:</LabelInput>
                <InputDark
                    color={defaultTheme.text[0]}
                    onChangeText={(text) => handleThisChanges('commandFalse', text)}
                    value={initialData.commandFalse}
                /></>) : <></>}
            </Card>

            <Card color={defaultTheme['primary-dark']} rounded="soft">
                <LabelInput style={{ color: defaultTheme.text[0] }}>Etiqueta do True:</LabelInput>
                <InputDark
                    color={defaultTheme.text[0]}
                    onChangeText={(text) => handleThisChanges('labelTrue', text)}
                    value={initialData.labelTrue}
                />

                {initialData.labelTrue ? (<>
                <LabelInput style={{ color: defaultTheme.text[0] }}>Comando do {initialData.labelTrue}:</LabelInput>
                <InputDark
                    color={defaultTheme.text[0]}
                    onChangeText={(text) => handleThisChanges('commandTrue', text)}
                    value={initialData.commandTrue}
                /></>) : <></>}
            </Card>

        </View>
    );
}


