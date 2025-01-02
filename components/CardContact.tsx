import React from 'react'
import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'
import AvatarContact from './AvatarContact';
import { router } from 'expo-router';

interface CardContactProps {
    contact: Contact;
    user?: User;
    isUseForSearch?: boolean;
}

export default function CardContact({
    contact,
    user,
    isUseForSearch = false
}: CardContactProps) {

    const showNewMessage = () => {
        const { newMessage, receiver } = contact;
        if (newMessage && user){
            if (newMessage.sender == user.id){
                return newMessage.isDeleted ? 'You has deleted this message.' : `You: ${newMessage.message}`
            }else{
                return newMessage.isDeleted ? `${receiver.username} has deleted this message.` : `${newMessage.message}`
            }
        }else{
            return 'Not message in this conversation.'
        }
    }

    const styleViewedMessage = (newMessage : MessageData) : TextStyle => {
        if(!newMessage) return {};
        if(
            user &&
            newMessage.sender == user.id ||
            newMessage.viewers.includes(user ? user.id : '')
        ){
            return {}
        }else{
            return {
                color: '#fff',
                fontWeight: 'bold'
            }
        }
    }

    return (
        <TouchableOpacity 
            onPress={() => router.push({ pathname: '/(tabs)/chat/conversation/[id]', params: { id: contact.receiver.id, receiverStr: JSON.stringify(contact.receiver) } })}
        >
            <Card.Title
                style={[styles.container, { gap: isUseForSearch? 0 : 25}]}
                title={contact.receiver.username}
                titleVariant="titleMedium"
                titleStyle={styles.title}
                subtitle={isUseForSearch ? undefined : showNewMessage()}
                subtitleStyle={[styles.subTitle, styleViewedMessage(contact.newMessage)]}
                leftStyle={{ marginLeft: -12 }}
                left={() => (
                    <AvatarContact width={isUseForSearch ? 40 : 70} svgBase64={contact.receiver.avatarImage} isShowOnline={contact.receiver.isOnline}/>
                )}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  title: {
    fontWeight: 'bold'
  },
  subTitle: {
    color: 'gray'
  }
});
