import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import useEffectSkipFirstRender from '../useEffectSkipFirstRender';

type AsyncStorageContextProps = {
    user?: User, 
    updateUser: (user: User) => void,
    clearUser: () => void
};

const defaultProps = {
    user: undefined,
    updateUser: (user: User) => {},
    clearUser: () => {}
}

export const AsyncStorageContext = createContext<AsyncStorageContextProps>(defaultProps)

export const AsyncStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | undefined>();

    function updateUser(user: User) {
        setUser(user);
    }

    function clearUser() {
        setUser(undefined);
    }

    useEffect(() => {
        AsyncStorage.getItem('auth')
            .then((jsonString) => {
                if(jsonString) {
                    const user : User = JSON.parse(jsonString || '');
                    setUser(user);
                }
            })
            .catch(err => console.log(err));
    },[])

    useEffectSkipFirstRender(() => {
        if (user) {
            AsyncStorage.setItem('auth', JSON.stringify(user));
        } else {
            AsyncStorage.removeItem("auth");
        }
    }, [user])

    return (
        <AsyncStorageContext.Provider 
            value={{user, updateUser, clearUser}}
        >
            {children}
        </AsyncStorageContext.Provider>
    )
}

export function useAsyncStorageContext(): AsyncStorageContextProps {
    return useContext(AsyncStorageContext)
}