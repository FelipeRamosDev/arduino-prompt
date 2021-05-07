/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
    DefaultModal,
    FullModalBox,
    DefaultButton,
    P,
    ScrollModal,
    Header, Toolbar,
    ToolbarItem,
    RoundFlotButton,
    LabelInput,
    Input,
    Container,
    TitleLight,
    CenterP,
} from '../../../styles/main';
import { defaultTheme } from '../../../styles/theme';

// Components
import AppCommand from '../../../components/apps/app-command/app-command';

// Controllers
import { saveApp, addCommand } from './edit-app-controllers';

// Controllers
import { useAppsList } from '../../../core/contexts/apps-list';
import { useCurrApp } from '../../../core/contexts/curr-app';

// Models
import AppsModel from '../../../models/apps-model';

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Styled components
import { EmptyBlock } from './edit-app-styles';
import { TouchableOpacity } from 'react-native';

export default function EditAppModal({ type, modalControl }) {
    const { appsList, setAppsList } = useAppsList();
    const { currApp, setCurrApp } = useCurrApp();
    let title, desc;

    if (type === 'create') {
        title = 'Criar aplicativo';
        desc = 'Crie um novo aplicativo inserindo as informações abaixo.';

    } else if (type === 'edit') {
        title = 'Editar aplicativo';
        desc = 'Edite seu aplicativo utilizando os campos abaixo.';
    }

    useEffect(() => {
        if (type === 'create') {
            if (!currApp) {
                setCurrApp(new AppsModel());
            }
        }
    }, []);

    if (currApp) {
        return (
            <DefaultModal>
                <FullModalBox color="#fff">
                    <Header color={defaultTheme.secondary}>
                        <Toolbar>
                            <ToolbarItem>
                                <DefaultButton
                                    style={{ padding: 0, paddingRight: 20, height: 'auto', backgroundColor: 'transparent' }}
                                    onPress={() => modalControl(false)}
                                >
                                    <FontAwesome5 name="chevron-left" color={defaultTheme.text[0]} size={20} style={{ marginRight: 10 }} />
                                    <P size="1.2">Voltar</P>
                                </DefaultButton>
                            </ToolbarItem>
                        </Toolbar>
                    </Header>


                    <ScrollModal contentContainerStyle={{ minHeight: '100%', width: '100%', paddingBottom: 20 }}>
                        <Container style={{ paddingTop: 20 }}>
                            <TitleLight align="center">{title}</TitleLight>
                            <CenterP color={defaultTheme.text[1]}>{desc}</CenterP>
                        </Container>

                        <LabelInput>Nome:</LabelInput>
                        <Input
                            value={currApp.label}
                            onChangeText={(text) => setCurrApp({ ...currApp, label: text })}
                        />

                        <LabelInput>Descrição:</LabelInput>
                        <Input
                            value={currApp.description}
                            onChangeText={(text) => setCurrApp({ ...currApp, description: text })}
                        />

                        <Container style={{ paddingTop: 20 }}>
                            <TitleLight align="center">Comandos do dispositivo</TitleLight>
                            <CenterP color={defaultTheme.text[1]}>Crie comandos para enviar ao dispositivo conectado. Os comandos serão enviados através da conexão que estiver ativa no momento.</CenterP>
                        </Container>

                        {currApp && currApp.commands && currApp.commands.length === 0 && (
                            <TouchableOpacity onPress={() => addCommand({ currApp, setCurrApp })}>
                                <EmptyBlock>
                                    <TitleLight>Insira um comando!</TitleLight>
                                </EmptyBlock>
                            </TouchableOpacity>
                        )}

                        {currApp && currApp.commands && currApp.commands.map((cmd) => {
                            return (
                                <AppCommand key={cmd.key} cmd={cmd} />
                            );
                        })}


                    </ScrollModal>

                    <RoundFlotButton position="fixed" style={{ right: 10, bottom: 60 }} onPress={() => addCommand({ currApp, setCurrApp })}>
                        <MaterialIcons name="add" color={defaultTheme.text[0]} size={25} />
                    </RoundFlotButton>
                    <DefaultButton
                        color="contrast"
                        style={{ height: 50 }}
                        onPress={() => saveApp({ type, currApp, appsList, setAppsList, modalControl })}
                    ><P>SALVAR</P></DefaultButton>

                </FullModalBox>
            </DefaultModal>
        );
    } else {
        return <DefaultModal />;
    }
}
