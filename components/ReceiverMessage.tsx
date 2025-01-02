import React, { useMemo } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AvatarContact from './AvatarContact';
import { formatDateBetweenMsg } from '@/utils/formatDate';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface ReceiverMessageProps {
  receiverMessage : MessageData;
  formatDate : any;
  isLastMessageInGroup : boolean;
  avatarImage : string;
  nameReceiver: string;
  onCopyToClipboard: (msg: string) => void
}
export default function ReceiverMessage({
  receiverMessage,
  formatDate,
  isLastMessageInGroup,
  avatarImage,
  nameReceiver,
  onCopyToClipboard
} : ReceiverMessageProps) {

  const [isHiddenAvaterSwipped, setisHiddenAvaterSwipped] = React.useState(true)

  const SwipeableWrapper = useMemo(() => {
    return ({children } : {children : React.ReactNode}) => (
      <Swipeable
        containerStyle={styles.swipeable}
        friction={2}
        leftThreshold={40}
        renderLeftActions={() => (
          <View style={[styles.actionWrapper]}>
            <TouchableOpacity style={styles.iconAction} onPress={() => onCopyToClipboard(receiverMessage.message)}>
              <FontAwesome5 name="copy" size={18} color="##e2e5e942" />
            </TouchableOpacity>
        </View>
        )}
        onSwipeableWillOpen={() => {isLastMessageInGroup && setisHiddenAvaterSwipped(false)}}
        onSwipeableWillClose={() => {isLastMessageInGroup && setisHiddenAvaterSwipped(true)}}
      >
        {children}
      </Swipeable>
    )
  },[])

  return (
    <View style={{ marginBottom: isLastMessageInGroup ? 10 : 0 }}>
      {formatDate.isShowDate && (
        <Text style={styles.date}>{formatDate.date}</Text>
      )}
      <View style={styles.messageWrapper}>                  
        {isLastMessageInGroup && isHiddenAvaterSwipped ? (
          <AvatarContact svgBase64={avatarImage} width={25} isShowOnline={false}/>
        ) : (
          <View style={{ width: 25}} />
        )}
        {receiverMessage.isDeleted ? (
          <Text style={[styles.message, styles.messageDeleted]}>{`${nameReceiver} has deleted this message.`}</Text>
        ) : (
          <SwipeableWrapper>
            <Text style={styles.message}>{receiverMessage.message}</Text>
          </SwipeableWrapper>
        )}
      </View>               
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-end'
  },
  message: {
    color: "#fff",
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 12,
    minWidth: 62,
    maxWidth: 300
  },
  messageNotLast: {
    marginLeft: 30
  },
  messageDeleted: {
    fontStyle: "italic",
    backgroundColor: "transparent",
    borderWidth: 1, // Độ dày của viền
    borderColor: "gray"
  },
  date: {
    color: "#fff",
    textAlign: 'center',
    marginVertical: 5
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginRight: 5
  },
  iconAction: {
    padding: 5,
    borderRadius: '50%',
    backgroundColor: '#7a7777',
  },
  swipeable: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  }
});
