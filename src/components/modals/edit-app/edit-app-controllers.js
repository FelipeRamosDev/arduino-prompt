import { Alert } from 'react-native';
import { CommandModel } from '../../../models/apps-model';

// Services
import AsyncStorageService from '../../../services/asyncstorage-service';

// Main declarations
const asService = new AsyncStorageService();

export async function saveApp({ type, currApp, setAppsList, modalControl }) {

    if (type === 'create') {
        try {
            let created = await asService.setItem({ collection: 'apps', item: currApp });
            setAppsList(created);
            modalControl(false);

        } catch (err) {
            Alert.alert(
                'Erro',
                'Ocorreu um erro ao salvar o aplicativo: ' + err.message,
                [{ text: 'OK' }]
            );

        }
    } else if (type === 'edit') {

        Alert.alert(
            'Confirmação',
            'Você tem certeza que deseja salvar as alterações?',
            [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            let updated = await asService.updateItem({
                                collection: 'apps',
                                keyProp: 'key',
                                newItem: currApp,
                            });

                            if (updated) {
                                setAppsList(updated);
                                modalControl(false);
                            }

                        } catch (err) {
                            console.error(err);
                            Alert.alert(
                                'Erro',
                                'Ocorreu um erro ao salvar o aplicativo: ' + err.message,
                                [{ text: 'OK' }]
                            );
                        }
                    },
                },
            ]
        );
    }


}

export function addCommand({ currApp, setCurrApp }) {
    let commands = currApp.commands;
    let newCmd = new CommandModel();

    setCurrApp({
        ...currApp,
        commands: [
            ...commands,
            newCmd,
        ],
    });
}

export function selectCommandType({ choosedKey, modalControl, currCmd, setCurrCmd, DataModel }) {
    setCurrCmd({ ...currCmd, type: choosedKey, typeData: new DataModel() });
    modalControl(false);
}


