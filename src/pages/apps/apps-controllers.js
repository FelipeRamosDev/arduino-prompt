
export function addNewApp({modalControl, setEditModalType}){
    modalControl(true);
}

export function editApp({modalControl, setEditModalType}){
    if (setEditModalType){
        setEditModalType('edit');
    }
    modalControl(true);
}