/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { Card, P, LinedButton } from '../../../styles/main';

// Context
import { useCurrApp } from '../../../core/contexts/curr-app';

// Components
import CommandsOptionsModal from '../../modals/commands-options/commands-options';

// Models
import { commandTypes } from '../../../models/apps-model';


export default function AppCommand({ cmd, mode }) {
    const { currApp, setCurrApp } = useCurrApp();
    let commands = currApp.commands;
    const [currCmd, setCurrCmd] = useState(cmd);
    const [visibleCommandsOptions, setVisibleCommandsOptions] = useState(false);

    function handleChanges(prop, value) {
        setCurrCmd({ ...currCmd, [prop]: value });
    }

    function deleteCommand() {
        let index = commands.indexOf(currCmd);
        commands.splice(index, 1);

        setCurrApp({
            ...currApp,
            commands: commands,
        });
    }

    useEffect(() => {
        commands.map((curr, i) => {
            if (currCmd && curr.key === cmd.key) {
                commands[i] = currCmd;
            }
        });

        setCurrApp({
            ...currApp,
            commands: commands,
        });

    }, [currCmd]);

    return (<>
        <Card rounded="soft">
            {!currCmd.type && (
                <LinedButton
                    onPress={() => setVisibleCommandsOptions(true)}
                    rounded="soft"
                >
                    <P>Selecionar tipo</P>
                </LinedButton>
            )}

            {Object.keys(commandTypes).map((x, i) => {
                let curr = commandTypes[x];
                if (x === currCmd.type) {
                    let CommandForm = curr.Component;
                    if (mode === 'view') {
                        return <CommandForm key={i} mode="view" initialData={currCmd.typeData} formHandleChanges={handleChanges} />;
                    } else {
                        return <CommandForm key={i} mode="form" initialData={currCmd.typeData} formHandleChanges={handleChanges} deleteCommand={deleteCommand} />;
                    }
                }
            })}

            <Modal
                visible={visibleCommandsOptions}
                transparent={true}
                animationType="slide"
            >
                <CommandsOptionsModal modalControl={setVisibleCommandsOptions} currCmd={currCmd} setCurrCmd={setCurrCmd} />
            </Modal>
        </Card>
    </>);
}
