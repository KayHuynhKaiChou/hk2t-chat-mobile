import SearchBarHk2t from '@/components/common/SearchBarHk2t';
import ListContacts from '@/components/ListContacts';
import { useSocketContext } from '@/hooks/provider/SocketProvider';
import useContact from '@/hooks/useContact';
import useEffectSkipFirstRender from '@/hooks/useEffectSkipFirstRender';
import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useChatBadgeContext } from '@/hooks/provider/ChatBadgeProvider';
import ListContactSearch from '@/components/ListContactSearch';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

export default function ChatPage() {
  const pathname = usePathname();
  const [isFocusSearchBar, setIsFocusSearchBar] = useState(false);
  const {badgeCount, setBadgeCount} = useChatBadgeContext();
  const heightAnimation = useSharedValue(50);
  const opacityAnimation = useSharedValue(1);
  const opacityAnimationSearch = useSharedValue(0);
  const [nameQuery, setNameQuery] = useState('');

  const {
    socket,
    userOnlineIds,
    handleSocketOn,
    handleSocketOff
  } = useSocketContext(); 

  const {
    user,
    listContacts,
    listContactsFilter,
    isLoadingListContacts,
    showListContacts,
    updateCurrentContact,
    updateContactsOnline,
    filterListContactsByName
  } = useContact();

  const handleCancelSearch = () => {
    setIsFocusSearchBar(false);
    setNameQuery('');
    Keyboard.dismiss();
  }

  const handleChangeNameQuery = (name : string) => {
    setNameQuery(name);
    filterListContactsByName(name);
  }

  useEffect(() => {
    if (listContacts && user) {
      const numberNotReadLastMessage = 
        listContacts
          .filter(con => con?.newMessage)
          .filter(con => !con.newMessage.viewers.includes(user.id)).length
      numberNotReadLastMessage !== badgeCount && setBadgeCount(numberNotReadLastMessage);
    }
  }, [listContacts])

  useEffectSkipFirstRender(() => {
    if(userOnlineIds.length > 0){ 
      updateContactsOnline(userOnlineIds)
    }
    // nếu ko có dependency listContacts.length thì lần đầu chạy useEffect này thì listContacts vẫn là []
    // sau khi call API setListContacts thì nên kích hoạt lại useEffect này 1 lần nữa
  },[userOnlineIds])

  useEffectSkipFirstRender(() => {
    if(pathname == '/chat'){
      showListContacts();
    }
  }, [user, pathname])

  useEffectSkipFirstRender(() => {
    if (socket && pathname == '/chat') {
      handleSocketOn([updateCurrentContact]);
      return () => {
        handleSocketOff()
      }
    }
  }, [socket, pathname, listContacts])

  useEffect(() => {
    heightAnimation.value = withTiming(isFocusSearchBar ? 0 : 50)
    opacityAnimation.value = withTiming(isFocusSearchBar ? 0 : 1)
    opacityAnimationSearch.value = withTiming(isFocusSearchBar ? 1 : 0)
  }, [isFocusSearchBar]);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View 
          style={[styles.mainTitleWrap, {height: heightAnimation}]}
        >
          <Text style={styles.mainTitle}>hk2t chat</Text>
        </Animated.View>
        <View style={styles.listHorizontal}>
          <View style={styles.searchBarWrapper}>
            <View style={{ flex: 1 }}>
              <SearchBarHk2t
                value={nameQuery}
                onChangeText={handleChangeNameQuery} 
                onFocus={() => setIsFocusSearchBar(true)}
              />
            </View>
            {isFocusSearchBar && (
              <TouchableOpacity>
                <Text 
                  onPress={handleCancelSearch}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {user && !isFocusSearchBar ? (
            <Animated.View style={{opacity: opacityAnimation}}>
              <ListContacts
                isLoadingListContacts={isLoadingListContacts}
                listContacts={listContacts}
                user={user}
              />
            </Animated.View>
          ) : (
            <Animated.View style={{opacity: opacityAnimationSearch}}>
              <ListContactSearch listContacts={nameQuery == '' ? listContacts : listContactsFilter} />
            </Animated.View>
          )}

        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#131324',
    padding: 15
  },
  mainTitleWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12, // Applies to top and bottom
  },
  mainTitle: {
    fontSize: 22,
    textTransform: 'uppercase'
  },
  listHorizontal: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18
  },
  searchBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  animatedView: {
    flex: 1,
  },
});
