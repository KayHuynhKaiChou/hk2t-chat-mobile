import useKeyboard from '@/hooks/useKeyboard';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface InputMessageProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendMessage: () => void;
}

export default function InputMessage({
  value,
  onChangeText,
  onSendMessage
} : InputMessageProps) {

    const keyBoardOffsetHeight = useKeyboard();

    return (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.inputMessage, 
              keyBoardOffsetHeight ? styles.inputMessageExpanded : styles.inputMessageCollapsed
            ]}
            value={value}
            placeholder="enter message..."
            onChangeText={(text) => onChangeText(text)}
            numberOfLines={keyBoardOffsetHeight ? 4 : 1} // số dòng tối đa
            scrollEnabled={!!keyBoardOffsetHeight}
            multiline={true} // ko hiểu sao ko xử lí đc multiline={!!keyBoardOffsetHeight}
            textAlignVertical="top"
          />
          <View style={styles.buttonSendWrapper}>
            <TouchableOpacity style={styles.buttonSend} onPress={onSendMessage}>
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131324',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal : 15,
    paddingVertical: 20
  },
  inputMessage: {
    flex: 1,
    color: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#6d6d6d',
    padding: 10
  },
  inputMessageExpanded: {
    maxHeight: 120,
    overflow: 'hidden'
  },
  inputMessageCollapsed: {
    maxHeight: 40,
  },
  buttonSendWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonSend: {
    backgroundColor: '#FFA001',
    padding: 10,
    width: 60,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
