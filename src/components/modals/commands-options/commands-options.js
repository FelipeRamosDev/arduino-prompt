/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

// Components
import Header from '../../../components/headers/back-buttom/back-button';

// Controllers
import { selectCommandType } from '../edit-app/edit-app-controllers';

// Models
import { commandTypes } from '../../../models/apps-model';

// Styled components
import {
    DefaultModal,
    FullModalBox,
    Title,
    CenterP,
    Container,
} from '../../../styles/main';

// Styles
import { defaultTheme } from '../../../styles/theme';

export default function CommandsOptionsModal({ modalControl, currCmd, setCurrCmd, setCommandComponent }) {
    return (
        <DefaultModal>
            <FullModalBox color={defaultTheme.tertiary}>
                <Header backBtnSetter={modalControl} />

                <ScrollView contentContainerStyle={{
                    padding: 10,
                    minHeight: '90%',
                }}>
                    <Container>
                        <Title align="center">Tipo de comando</Title>
                        <CenterP>Escolha entre os exemplos abaixo, o tipo de comando que deseja adicionar ao seu aplicativo.</CenterP>
                    </Container>

                    {Object.keys(commandTypes).map((type, i) => {
                        let curr = commandTypes[type];
                        let Component = curr.Component;

                        return (
                            <TouchableOpacity
                                key={String(currCmd.key) + i}
                                onPress={() => selectCommandType({
                                    choosedKey: type,
                                    modalControl,
                                    currCmd,
                                    setCurrCmd,
                                    setCommandComponent,
                                    DataModel: curr.DataModel,
                                })}
                            >
                                <Component mode="view" viewType="demo" />
                            </TouchableOpacity>
                        );
                    })}

                </ScrollView>
            </FullModalBox>
        </DefaultModal>
    );
}
