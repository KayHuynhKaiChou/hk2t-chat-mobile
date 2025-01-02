import { formatDateBetweenMsg } from '@/utils/formatDate';
import { Text, View, StyleSheet, TouchableOpacity  } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SenderMessageProps {
  senderMessage : MessageData;
  formatDate : any;
  isLastMessageInGroup: boolean;
  onShowDialog : (id: string) => void;
  onCopyToClipboard: (msg: string) => void
}

export default function SenderMessage({
  senderMessage,
  formatDate,
  isLastMessageInGroup,
  onShowDialog,
  onCopyToClipboard
} : SenderMessageProps) {
  return (
    <View style={{ marginBottom: isLastMessageInGroup ? 10 : 0 }}>
      {formatDate.isShowDate && (
        <Text style={styles.date}>{formatDate.date}</Text>
      )}
      {senderMessage.isDeleted ? (
        <View style={styles.messageWrapper}>
          <Text style={[styles.message, styles.messageDeleted]}>You has deleted this message.</Text>
        </View>
      ) : (
        <Swipeable
          friction={2}
          rightThreshold={40}
          renderRightActions={() => (
            <View style={[styles.actionWrapper]}>
              <TouchableOpacity style={styles.iconAction}>
                <MaterialCommunityIcons 
                  name="delete" 
                  size={18} 
                  color={"##e2e5e942"} 
                  onPress={() => onShowDialog(senderMessage._id)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconAction}>
                <FontAwesome5 
                  name="copy" 
                  size={18} 
                  color="##e2e5e942" 
                  onPress={() => onCopyToClipboard(senderMessage.message)}
                />
              </TouchableOpacity>
          </View>
          )}
          onSwipeableWillOpen={() => {}}
          onSwipeableWillClose={() => {}}
        >
          <View style={styles.messageWrapper}>
            <Text style={styles.message}>{senderMessage.message}</Text>
          </View>
        </Swipeable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  messageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  message: {
    backgroundColor: '#a725e4',
    color: "#fff",
    textAlign: 'left',
    padding: 12,
    borderRadius: 12,
    minWidth: 62,
    maxWidth: '70%'
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
    marginLeft: 5
  },
  iconAction: {
    padding: 5,
    borderRadius: '50%',
    backgroundColor: '#7a7777',
  }
});
