/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

// Controlers
import {
    handleInputCMD,
    sendCMD,
    startMonitor,
} from './prompt-controllers';
// Contexts
import { useBtConnection } from '../../core/contexts/bt-connection';
import { useBtListener } from '../../core/contexts/bt-listener';
// Components
import Header from '../../components/headers/connected-device/connected-device-header';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Style components
import {
    Activity,
    Footer,
    IconButton,
    RoundFlotButton,
    Toolbar,
    ToolbarItem,
} from '../../styles/main';
import {
    Prompt,
    PromptP,
    PromptInput,
} from './prompt-styles';
// Styles
import { defaultTheme } from '../../styles/theme';

export default function PromptPage({ navigation }) {
    const [historyCMD, setHistoryCMD] = useState([]);
    const [currCMD, setCurrCMD] = useState('');
    const { btConnection } = useBtConnection();
    const { btListener, setBtListener } = useBtListener();
  
    return (
        <Activity>
            <Header />

            <Toolbar style={{justifyContent: 'flex-end', padding: 7}}>
                <ToolbarItem style={{marginHorizontal: 3}}>
                    <IconButton onPress={() => startMonitor({
                            btConnection,
                            listeners: btListener,
                            listenersSetter: setBtListener,
                            history: historyCMD,
                            historySetter: setHistoryCMD,
                        })}
                    >
                        <MaterialCommunityIcons name="monitor-eye" color={defaultTheme.text[0]} size={28} />
                    </IconButton>
                </ToolbarItem>
            </Toolbar>

            <Prompt>
                {historyCMD.map((item, i) => <PromptP key={i}>{'>'} {item}</PromptP>)}

                <PromptInput
                    value={currCMD}
                    onChangeText={(ev) => handleInputCMD(ev, setCurrCMD)}
                    placeholder=">> Insira um comando aqui"
                    placeholderTextColor="#777"
                />
            </Prompt>
            <Footer>
                <RoundFlotButton
                    onPress={() => sendCMD({btConnection, historyCMD, setHistoryCMD, currCMD, setCurrCMD})}
                >
                    <Ionicons name="send" color={defaultTheme.text[0]} size={25} />
                </RoundFlotButton>
            </Footer>
        </Activity>
    );
}

