interface User extends Omit<FormSignIn , 'password'>{
    id : string;
    email : string;
    avatarImage : string;
    isOnline : boolean; 
}

interface Contact {
    receiver : User;
    newMessage : MessageData;
}

interface MessagePayload {
    from : User['id'],
    to : User['id'],
    message : string
}

interface MessageData {
    _id : string;
    users : [
        MessagePayload['from'],
        MessagePayload['to']
    ],
    sender : MessagePayload['from'];
    viewers : Array<User['id']>
    message : MessagePayload['message'];
    isDeleted : boolean;
    createdAt: string;
}