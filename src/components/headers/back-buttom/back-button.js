/* eslint-disable react-native/no-inline-styles */
import React from 'react';

// Styled components
import { Header, Toolbar, ToolbarItem, DefaultButton, P } from '../../../styles/main';

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Styles
import { defaultTheme } from '../../../styles/theme';

export default function BackButtomHeader({ backBtnSetter, backAction }){
    let backHandle;
    if(backAction){
        backHandle = backAction;
    } else {
        backHandle = backBtnSetter;
    }

    return (
        <Header color={defaultTheme.secondary}>
            <Toolbar>
                <ToolbarItem>
                    <DefaultButton
                        style={{ padding: 0, paddingRight: 20, height: 'auto', backgroundColor: 'transparent' }}
                        onPress={() => backHandle(false)}
                    >
                        <FontAwesome5 name="chevron-left" color={defaultTheme.text[0]} size={20} style={{ marginRight: 10 }} />
                        <P size="1.2">Voltar</P>
                    </DefaultButton>
                </ToolbarItem>
            </Toolbar>
        </Header>
    );
}
