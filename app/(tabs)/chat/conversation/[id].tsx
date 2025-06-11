import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useLayoutEffect, useMemo, useRef } from "react";
import useMessage from "@/hooks/useMessage";
import AvatarContact from "@/components/AvatarContact";
import ReceiverMessage from "@/components/ReceiverMessage";
import SenderMessage from "@/components/SenderMessage";
import React from "react";
import InputMessage from "@/components/InputMessage";
import useEffectSkipFirstRender from "@/hooks/useEffectSkipFirstRender";
import { useSocketContext } from "@/hooks/provider/SocketProvider";
import { Dimensions } from "react-native";
import SkeletonListMessage from "@/components/SkeletonListMessage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDialogHk2t } from "@/components/common/DialogHk2t";
import * as Clipboard from 'expo-clipboard';
import { formatDateBetweenMsg } from "@/utils/formatDate";

export default function ConversationPage() {
    const { id, receiverStr } = useLocalSearchParams();
    const receiver = JSON.parse(receiverStr as string);
    const [isOnline, setIsOnline] = useState(receiver.isOnline);
    const [numberSlice, setNumberSlice] = useState(0)
    const navigation = useNavigation();

    const dialog = useDialogHk2t();

    const {
      socket,
      userOnlineIds,
      handleSocketOn,
      handleSocketEmit,
      handleSocketOff
    } = useSocketContext(); 

    const {
      msgInput,
      msgSend,
      isLoadingConversation,
      updateMessages,
      handleSendMessage,
      handleDeleteMessage,
      handleChangeTextMessage,
      messages
    } = useMessage(id as string);

    const flatListRef = useRef<FlatList<MessageData>>(null);
    // const chunkMessages = useMemo(() => {
    //   if (messages.length === 0) return [];
    //   return messages
    //     //.reverse()
    //     .reduce<MessageData[][]>((acc, m) => {
    //     const last = acc.pop();
    //     if (last && last.some(ml => ml.sender === m.sender)) {
    //       last.push(m)
    //       acc.push(last)
    //       return acc
    //     } else {
    //       return last ? [...acc, last, [m]] : [...acc, [m]]
    //     }
    //   },[]); // reverse + inverted của flatlist mới giải quyết đc vụ mở keyboard
    // }, [messages])

    const reversedMessages = useMemo(() => {
      return messages.reduceRight<MessageData[]>((acc, curr) => {
        acc.push(curr);
        return acc;
      }, []);
    }, [messages]);

    const getFormatDate = (item: MessageData, index: number) => {
      return formatDateBetweenMsg(
        index !== reversedMessages.length - 1 ? reversedMessages[index + 1].createdAt : null,
        item.createdAt
      );
    }

    const handleLoadMoreMessages = () => {
      if (numberSlice < messages.length && !isLoadingConversation){
        setNumberSlice(numberSlice + 20);
      }
    }

    const handleShowDialog = (id: string) => {
      dialog.show(
        <Text>Are you sure you want to delete this message ?</Text>,
        () => handleDeleteMessageBefore(id),
        'CONFIRM'
      )
    }

    const handleCopyToClipboard = async (msg: string) => {
      await Clipboard.setStringAsync(msg);
    }

    const handleDeleteMessageBefore = async (idMessage : MessageData['_id']) => {
      const deletedMessage = await handleDeleteMessage(idMessage); 
      //await showListContacts();
      updateMessages(deletedMessage);
      handleSocketEmit(msgSend.to , deletedMessage);
    }

    // mình gửi
    const handleSendMessageBefore = async () => {
      const sentMessage : MessageData  = await handleSendMessage();
      updateMessages(sentMessage);
      handleSocketEmit(msgSend.to , sentMessage);
    }

    // thằng bên kia gửi và mình nhận
    useEffectSkipFirstRender(() => {
      handleSocketOn([
        updateMessages
      ])
      
      return () => {
        // Clean up the event listener when the component unmounts
        handleSocketOff()
      };
    }, [socket, messages]);

    useEffectSkipFirstRender(() => {
      setIsOnline(userOnlineIds.includes(receiver.id))
    },[userOnlineIds])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <View
            style={{
              flexDirection: 'row',
              width: 220,
              alignItems: 'center',
              gap: 10,
              paddingBottom: 4,
            }}>
            <AvatarContact svgBase64={receiver.avatarImage} width={40} isShowOnline={isOnline}/>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '500', color: "#fff" }}>{receiver.username}</Text>
              <Text style={{ fontSize: 14, color: isOnline ? "#fff" : "#8f8f8f" }}>{isOnline ? "Online" : "Offline"}</Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 30 }}>
            <TouchableOpacity>
              <Ionicons name="videocam-outline" color={"#3075dd"} size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="call-outline" color={"#3075dd"} size={30} />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: "black",
        }
      });
    }, [navigation, isOnline]);

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <FlatList
            ItemSeparatorComponent={() => <View style={{ marginVertical: 1 }}></View>}
            inverted // reverse data + inverted của flatlist mới giải quyết đc vụ mở keyboard
            ref={flatListRef}
            // onLayout={() => flatListRef && flatListRef.current?.scrollToOffset({animated: true, offset: flatListHeight})}
            // onContentSizeChange={(width, height) => {
            //   flatListRef && flatListRef.current?.scrollToOffset({offset: height});
            // }}
            data={reversedMessages.slice(0, numberSlice + 20)}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => {
              const formatDate = getFormatDate(item, index);
              const isLastMessageInGroup = item.sender !== reversedMessages[index - 1]?.sender
              if (item.sender === id) {
                return (
                  <ReceiverMessage
                    receiverMessage={item}
                    formatDate={formatDate}
                    isLastMessageInGroup={isLastMessageInGroup}
                    avatarImage={receiver.avatarImage} 
                    nameReceiver={receiver.username}
                    onCopyToClipboard={handleCopyToClipboard}
                  />
                )
              } 
              return (
                <SenderMessage 
                  senderMessage={item}
                  formatDate={formatDate} 
                  isLastMessageInGroup={isLastMessageInGroup}
                  onShowDialog={handleShowDialog}
                  onCopyToClipboard={handleCopyToClipboard}
                />
              )
            }}
            scrollEventThrottle={1000}
            onEndReached={handleLoadMoreMessages}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
            ListEmptyComponent={() => {
              if (isLoadingConversation) {
                return (
                  <SkeletonListMessage/>
                )
              }
              return (
                <View style={[styles.emptyConversation, {height: Dimensions.get('window').height - 200}]}>
                  <Text style={styles.emptyText}>Not messages in this conversation</Text>
                </View>
              )
            }}
            // refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
          {!isLoadingConversation && (
            <InputMessage 
              value={msgInput} 
              onChangeText={handleChangeTextMessage}
              onSendMessage={handleSendMessageBefore}
            />
          )}
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#131324',
    padding: 15
  },
  emptyConversation: {
    transform: [{ rotateX: '0deg' }],
    display: 'flex',
  },
  emptyText: {
    fontSize: 18,
    color: "#999999",
    margin: 'auto'
  }
});
