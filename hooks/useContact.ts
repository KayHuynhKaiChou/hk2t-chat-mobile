import { useEffect, useState } from "react";
import userServices from "../services/userServices";
import messageServices from "../services/messageServices";
import useEffectSkipFirstRender from "./useEffectSkipFirstRender";
import { useAsyncStorageContext } from "./provider/AsyncStorageProvider";

export default function useContact() {
    //store
    const {user} = useAsyncStorageContext();
    
    //state
    const [listContacts , setListContacts] = useState<Contact[]>([]);
    const [listContactsFilter , setListContactsFilter] = useState<Contact[]>([]);
    const [isLoadingListContacts , setIsLoadingListContacts] = useState<boolean>(true);
    
    // function handle logic and change state
    const showListContacts = () => {
        userServices.getListContactsService(user?.id || '')
            .then(res => {
                if(res.status == 200){
                    setIsLoadingListContacts(false);
                }
                let listContactsData : Contact[] = res.data;
                listContactsData = listContactsData.map(con => {
                    const foundContact = listContacts.find(contact => contact.receiver.id == con.receiver.id);
                    return {
                        ...con,
                        receiver : {
                            ...con.receiver,
                            isOnline : foundContact ? foundContact?.receiver?.isOnline : false
                        }
                    }
                })
                setListContacts(listContactsData)
            })
    }

    const updateContactsOnline = (userOnlineIds : User['id'][]) => {
        const mapListContacts = listContacts.map(con => {
            const isOnline = userOnlineIds.includes(con.receiver.id)
            return {
                ...con,
                receiver : {
                    ...con.receiver,
                    isOnline : isOnline
                }
            }
        })
        setListContacts(mapListContacts)
    }

    const updateViewersMessage = async (newMessage : MessageData) => {
        if(newMessage.viewers.length == 2) return;
        if(user) {
            newMessage.viewers.push(user.id)
            await messageServices.updateViewersMessage(newMessage)
        }
    }

    const sortListContacts = () => {
        const listContactsNotMessage = listContacts.filter(con => !con.newMessage)
        const listContactsHasMessage = listContacts.filter(con => con.newMessage)
        listContactsHasMessage.sort((conPrev , conNext) => {
            const datePrev = new Date(conPrev.newMessage.createdAt).getTime();
            const dateNext = new Date(conNext.newMessage.createdAt).getTime();
            return dateNext - datePrev
        })
        setListContacts([...listContactsHasMessage , ...listContactsNotMessage])
    }

    /**
     * update lại listContacts và current contact cho receiver khi socket.on()
     * ko nên call API ở func này sẽ làm cho quá trình real-time bị chậm giữa sender and receiver
     * @param newMessage có thể là msg được gửi hoặc msg đã bị xóa từ sender
     */
    const updateCurrentContact = async (newMessage : MessageData) => {
        const listContactsClone = [...listContacts];
        const foundSenderContact = listContactsClone.find(contact => newMessage.users.includes(contact.receiver.id));
        if(foundSenderContact){ // ở màn hình chính của receiver
            if (foundSenderContact.newMessage?._id == newMessage._id && !newMessage.isDeleted) return;
            if (newMessage.isDeleted) {
                foundSenderContact.newMessage.isDeleted = true;
            } else {
                foundSenderContact.newMessage = newMessage;
            }
            // if (isUpdateViewers) {
            //     await updateViewersMessage(foundSenderContact.newMessage);
            // }
        }
        sortListContacts()
    }

    const filterListContactsByName = (nameQuery : string) => {
        const listContactsResult = listContacts.filter(con => con.receiver.username.toLowerCase().includes(nameQuery.toLowerCase()))
        setListContactsFilter(listContactsResult)
    }

    // hook useEffect
    useEffect(() => {
        showListContacts();
    },[])

    return {
        //state
        user,
        listContacts,
        listContactsFilter,
        isLoadingListContacts,
        // function handler
        setListContacts,
        showListContacts,
        updateCurrentContact,
        updateContactsOnline,
        updateViewersMessage,
        filterListContactsByName
    }
}