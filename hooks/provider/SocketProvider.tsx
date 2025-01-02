import { createContext, ReactNode, useContext, useState } from 'react';
import useSocketConnect from '../useSocketConnect';

type SocketContextProps = ReturnType<typeof useSocketConnect>;

const defaultProps = {
    socket: null,
    userOnlineIds: [],
    handleSocketOn: () => {},
    handleSocketEmit: () => {},
    handleSocketOff: () => {}
}

export const SocketContext = createContext<SocketContextProps>(defaultProps)

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socket = useSocketConnect(); 

    return (
        <SocketContext.Provider 
            value={socket}
        >
            {children}
        </SocketContext.Provider>
    )
}

export function useSocketContext(): SocketContextProps {
    return useContext(SocketContext)
}