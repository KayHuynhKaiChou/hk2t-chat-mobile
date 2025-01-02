import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import useEffectSkipFirstRender from "./useEffectSkipFirstRender";

export default function useSocketConnect(){
    const socket = useRef<Socket | null>(null);
    const [userOnlineIds , setUserOnlineIds] = useState<User['id'][]>([])
    const [user, setUser] = useState<User | undefined>();

    const handleSocketEmit = (idReceiver : string , sentMessage : MessageData) => {
        socket.current!.emit("send-msg", idReceiver, sentMessage);
    }
    //Array<() => Promise<void>>
    const handleSocketOn = (listCallback : Array<(newMessage : MessageData) => void>) => {
        socket.current!.on("receive-msg", (newMessage : MessageData) => {
            listCallback.forEach(callback => {
                callback(newMessage);
            })
        });
    }

    const handleSocketOff = () => {
        socket.current!.off("receive-msg");
    }

    useEffectSkipFirstRender(() => {
        if (user) {
            socket.current = io(process.env.EXPO_PUBLIC_SOCKET_IO_URL);
            socket.current.emit("add-user", user.id);
            socket.current.on("get-users-online" , (onlineUserIds) => {
                setUserOnlineIds(onlineUserIds)
            })
        }
    }, [user]);

    useEffect(() => {
        AsyncStorage.getItem('auth')
        .then(jsonString => {
            setUser(JSON.parse(jsonString || ''))
        })
    },[])

    return {
        //state
        socket : socket.current,
        userOnlineIds,
        // function handler
        handleSocketOn,
        handleSocketEmit,
        handleSocketOff
    }
}