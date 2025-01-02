import React from "react";
import { noop } from "../../utils/noop";
import { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import ButtonHk2t from "./ButtonHk2t";

type TypeDialog = 'CONFIRM' | 'ERROR'

type DialogContextProps = {
    show: (comp: JSX.Element, callback?: () => void, typeDialog?: TypeDialog) => void;
    hide: (callback?: () => void) => void
}

const defaultProps = {
    show: () => {},
    hide: () => {}
}

export const DialogHk2tContext = createContext<DialogContextProps>(defaultProps)

export const DialogHk2tProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [contentComp, setContentComp] = useState(<></>);
    const [typeDialog, setTypeDialog] = useState<TypeDialog>('ERROR')
    const ref = useRef<() => void>()

    const show : DialogContextProps['show'] = useCallback(
        (comp, callback, type) => {
            type && type !== typeDialog && setTypeDialog(type)
            setOpen(true)
            setContentComp(comp)
            ref.current = callback || noop
        },
        [open]
    )

    const hide : DialogContextProps['hide'] = useCallback(
        (callback) => {
            setOpen(false)

            if(callback && typeof callback === 'function'){
                ref.current = noop
                callback()
            } else if (ref.current){
                ref.current()
            }
        },
        [open]
    )

    const cancel = () => {
        setOpen(false)
        ref.current = noop
    }

    return (
        <DialogHk2tContext.Provider value={{ show, hide }}>
            {children}
            <Portal>
                <Dialog visible={open} onDismiss={hide}>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{contentComp}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        {typeDialog === 'ERROR' ? (
                            <ButtonHk2t
                                content='OK'
                                onPress={() => hide()}
                            />
                        ) : (
                            <>
                                <ButtonHk2t
                                    content='OK'
                                    onPress={() => hide()}
                                    style={{ marginRight: 10 }}
                                />
                                <ButtonHk2t
                                    buttonColor="red"
                                    content='CANCEL'
                                    onPress={() => cancel()}
                                />
                            </>
                        )}
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </DialogHk2tContext.Provider>
    )
}

export function useDialogHk2t(): DialogContextProps {
    return useContext(DialogHk2tContext)
}