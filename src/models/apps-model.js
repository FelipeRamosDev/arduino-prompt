import SwitchCommand from '../components/apps/app-command/views/switch/switch';
import DevicePositionCommand from '../components/apps/app-command/views/device-position/device-position';

// Models
import { SwitchCommandModel } from '../models/app-commands/switch-model';
import { DevicePositionCommandModel } from '../models/app-commands/device-position-model';

export default class AppModel{
    constructor(props = {
            key: Number(),
            value: String(),
            label: String(),
            description: String(),
            commands: [],
        }
    ){

        this.key = props.key || Date.now();
        this.value = props.value;
        this.label = props.label;
        this.description = props.description;
        this.commands = props.commands;
    }
}

export class CommandModel{
    constructor(props = {
        key: Number(),
        type: String(),
        typeData: Object(),
    }){
        this.key = props.key || Date.now();
        this.type = props.type;
        this.typeData = props.typeData;
    }
}


export const commandTypes = {
    switch: {
        Component: SwitchCommand,
        DataModel: SwitchCommandModel,
    },
    getDevicePosition: {
        Component: DevicePositionCommand,
        DataModel: DevicePositionCommandModel,
    },
};
