/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    FlatList,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

// Components
import Header from '../../components/headers/connected-device/connected-device-header';
import EditAppModal from '../../components/modals/edit-app/edit-app';
import AppCommand from '../../components/apps/app-command/app-command';

// Controllers
import {
    addNewApp,
    editApp,
} from './apps-controllers';

// Contexts
import { useAppsList } from '../../core/contexts/apps-list';
import { useCurrApp } from '../../core/contexts/curr-app';

// Services
import AsyncStorageService from '../../services/asyncstorage-service';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Style components
import {
    Activity,
    Container,
    RoundFlotButton,
    Card,
    Title,
    P,
    LinedButton,
    IconButton,
    Toolbar,
    ToolbarItem,
    CardDashedButton,
} from '../../styles/main';

// Styles
import { defaultTheme } from '../../styles/theme';

// Main declarations
const asService = new AsyncStorageService();


export default function AppsPage({ navigation }) {
    const { appsList, setAppsList } = useAppsList();
    const { currApp, setCurrApp } = useCurrApp();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editModalType, setEditModalType] = useState('create');
    const [chooseApp, setChooseApp] = useState(false);
    var commands = currApp.commands || [];

    useEffect(() => {
        getAppsList();
    }, []);

    async function getAppsList(reloadCurrApp) {
        try {
            let coll = await asService.readCollection('apps');

            setCurrApp(false);
            setAppsList(coll);

            if (reloadCurrApp) {
                setCurrApp(reloadCurrApp);
            }
        } catch (err) {
            console.error(err);
            Alert.alert(
                'Erro',
                'Ocorreu um erro ao consultar os aplicativos!',
                [{ text: 'OK' }]
            );
        }
    }

    function deleteApp() {

        Alert.alert(
            'Confirmação',
            'Você tem certeza que deseja excluir o aplicativo?',
            [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            await asService.deleteCollItem({ collection: 'apps', item: appsList });
                            getAppsList();
                        } catch (err) {
                            Alert.alert(
                                'Erro',
                                'Ocorreu um erro ao deletar o aplicativo: ' + err.message,
                                [{ text: 'OK' }]
                            );
                        }
                    },
                },
            ]
        );
    }

    if (appsList) appsList.map(x => { x.key = String(x.key); });

    function itemCmdList({ item }) {
        return (
            <AppCommand key={item.key} cmd={item} mode="view" />
        );
    }

    return (
        <Activity>
            <Header />

            <Card color={defaultTheme['primary-dark']}>
                {currApp && (<Toolbar style={{ marginBottom: 20 }}>
                    <ToolbarItem style={{ flex: 1 }}>
                        <Title>{currApp.label}</Title>
                        <P>{currApp.description}</P>
                    </ToolbarItem>
                    <ToolbarItem style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton onPress={() => getAppsList()}>
                            <MaterialIcons name="refresh" color={defaultTheme.text[0]} size={25} />
                        </IconButton>
                        <IconButton onPress={() => deleteApp()}>
                            <FontAwesome5 name="trash-alt" color={defaultTheme.danger} size={18} />
                        </IconButton>
                    </ToolbarItem>
                </Toolbar>)}

                {appsList.length > 0 ? (
                    <ModalSelector
                        data={appsList}
                        onChange={(option) => setCurrApp(option)}
                        onModalClose={() => setChooseApp(false)}
                        animationType="slide"
                        cancelText="CANCELAR"
                        backdropPressToClose={true}
                        selectTextStyle={{ color: defaultTheme.text[0] }}
                        optionTextStyle={{ color: defaultTheme.primary }}
                        cancelStyle={{ backgroundColor: defaultTheme.danger }}
                        cancelTextStyle={{ color: defaultTheme.text[0] }}
                        customSelector={<LinedButton rounded="soft" onPress={() => setChooseApp(true)}><P>Escolha um aplicativo</P></LinedButton>}
                        visible={chooseApp}
                    />
                ) : (
                    <CardDashedButton rounded="soft" style={{ marginBottom: 0 }} onPress={() => addNewApp({ modalControl: setShowEditModal })}>
                        <Title style={{ textAlign: 'center' }}>Cadastre um aplicativo para começar!</Title>
                    </CardDashedButton>
                )}
            </Card>

            <Container>
                <FlatList
                    data={commands}
                    renderItem={itemCmdList}
                    keyExtractor={item => String(item.key)}
                />
            </Container>

            {currApp && <RoundFlotButton
                onPress={() => editApp({ modalControl: setShowEditModal, setEditModalType })}
            >
                <MaterialIcons name="edit" color={defaultTheme.text[0]} size={25} />
            </RoundFlotButton>}
            {!currApp && <RoundFlotButton
                onPress={() => addNewApp({ modalControl: setShowEditModal })}
            >
                <MaterialIcons name="add" color={defaultTheme.text[0]} size={25} />
            </RoundFlotButton>}
            <Modal
                visible={showEditModal}
                transparent={true}
                animationType="slide"
            >
                <EditAppModal type={editModalType} modalControl={setShowEditModal} />
            </Modal>
        </Activity>
    );
}
