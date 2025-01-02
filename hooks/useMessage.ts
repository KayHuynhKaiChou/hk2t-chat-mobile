import messageServices from "../services/messageServices"
import { useEffect, useMemo, useState } from "react";
import { useAsyncStorageContext } from "./provider/AsyncStorageProvider";

export default function useMessage(
    idReceiver : User['id']
) {
    //store
    const {user} = useAsyncStorageContext();

    const [msgInput , setMsgInput] = useState('');
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [isLoadingConversation , setIsLoadingConversation] = useState(true);

    // hook useMemo
    const msgSend = useMemo(() => {
        return {
            from : user?.id || '',
            to : idReceiver,
            message : msgInput
        }
    },[user , idReceiver , msgInput])
    
    // function handle logic and change state
    const showMessagesConversation = () => {
        messageServices.getMessageService({
            from : user?.id || '',
            to : idReceiver,
        })
            .then(res => {
                setMessages(res.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoadingConversation(false);
            })
    }
    
    const handleSendMessage = async () => {
        const res = await messageServices.sendMessageService(msgSend);
        setMsgInput('');
        setMessages([
            ...messages,
            res.data
        ]);
        return res.data
    }

    const handleDeleteMessage = async (idMessage : string) => {
        await messageServices.deleteMessageService(idMessage);
        // sau khi xóa msg , tìm lại msg đã bị xóa và update state messages
        const messagesClone = [...messages];
        const deletedMessage = messagesClone.find(msg => msg._id == idMessage);
        if(deletedMessage) { deletedMessage.isDeleted = true };
        setMessages(messagesClone);
        return deletedMessage!
    }

    // const handleSelectEmoji = (emojiObject : EmojiClickData) => {
    //     setMsgInput((prevMsgInput) => prevMsgInput + emojiObject.emoji);
    // };

    const handleChangeTextMessage = (text: string) => {
        setMsgInput(text)
    }

    /**
     * update lại messages (conversation) cho receiver khi socket.on()
     * ko nên call API ở func này sẽ làm cho quá trình real-time bị chậm giữa sender and receiver
     * @param newMessage có thể là msg được gửi hoặc msg đã bị xóa từ sender
     */
    const updateMessages = (newMessage : MessageData) => {
        // Đây là case bên màn hình receiver B , ta có A => current contact B nhưng B => current contact C  
        // ta ko cần thao tác gì với state messages vì messages state là giữa receiver 
        // và ng khác , ko phải giữa receiver và sender
        if(newMessage.sender != idReceiver && newMessage.sender != user?.id) {
            // AsyncStorage.setItem('newMessage' , JSON.stringify(newMessage));
            return ;
        }
        // Đây là case ở màn hình bên nào cx đc, mà màn hình A => current contact B và màn hình B => current contact A
        if(newMessage.isDeleted){
            const messagesClone = [...messages];
            const deletedMessage = messagesClone.find(msg => msg._id == newMessage._id)
            if(deletedMessage) {
                deletedMessage.isDeleted = true
            }
            setMessages(messagesClone)
        }else{
            setMessages([...messages , newMessage])
        }
        
        // mình gửi , nên đã có sẵn id trong viewers rồi nên return
        if(user && newMessage.viewers.includes(user.id)) return ;
        // nó gửi nên cần nhét id của mình viewers
        newMessage.viewers.push(user?.id || '');
        messageServices.updateViewersMessage(newMessage)
    }

    // hook useEffect
    useEffect(() => {
        user && showMessagesConversation()
    },[user])

    return {
        //state
        messages,
        msgInput,
        isLoadingConversation,

        // variable public
        msgSend,

        // function handler
        showMessagesConversation,
        handleSendMessage,
        handleDeleteMessage,
        // handleSelectEmoji,
        handleChangeTextMessage,
        updateMessages
    }
}
