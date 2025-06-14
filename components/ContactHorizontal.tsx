import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AvatarContact from './AvatarContact';
import { router } from 'expo-router';

interface ContactHorizontalProps {
  receiver: User;
}

export default function ContactHorizontal({
  receiver
} : ContactHorizontalProps) {
  // const DECODE_BASE64 = atob(`${receiver.avatarImage}`);
  // const svgXmlData = `
  //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231">
  //     <path d="M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z" style="fill:#0079b1;"/>
  //     <path d="m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z" style="fill:#FFD79D;"/>
  //     <path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5l13.85 13.85v-1.2h17.86v3.1h5z" style="fill:#101010;"/>
  //     <polygon points="115.36 207.65 123.37 224.2 148.3 196.86 143.08 189.95" style="fill:#fff;"/>
  //     <polygon points="115.36 207.65 107.35 224.2 82.42 196.86 87.63 189.95" style="fill:#fff;"/>
  //     <path d="m52.107 57.293c-1.3411 14.839-3.8707 52.771 1.3145 72.715-0.67572-43.829 12.389-70.177 62.078-70.187 49.689 0.010061 62.754 26.359 62.078 70.187 5.1852-19.944 2.6556-57.876 1.3145-72.715h-63.393-63.393z" style="fill:#53ffff;"/>
  //     <path d="m52.339 30.629c-1.3825 24.448-2.1216 45.905-1.4497 66.517 9.4643-48.304 112.77-54.916 129.22 0 0.67191-20.612-0.3798-47.256-1.4928-66.517-32.241 14.296-91.346 18.861-126.28 0z" style="fill:#53ffff;"/>
  //     <path d="m115.5 24.92c-22.25 0-44.5 4.2296-56.72 12.69-3.32 2.3-5.0602 6.4392-5.5903 10.269-0.45275 3.23-0.84043 6.7561-1.1785 10.461h126.98c-0.33704-3.7047-0.72492-7.2306-1.1775-10.461-0.53009-3.8301-2.2697-7.9992-5.5897-10.269-12.22-8.4601-34.47-12.69-56.72-12.69z" style="fill:none;"/>
  //     <path d="m76.521 39.139c21.233 3.3965 33.116-13.392 37.59-31.72 4.3614 17.158 14.175 34.968 36.577 31.584-33.921 20.594-57.646 11.594-74.167 0.1345z" style="fill:none;"/>
  //     <path d="m133 108.17h14.17m-63.26 0h14.09m-20.69-8.93a21.31 21.31 0 0 1 27.29 0m21.8 0a21.31 21.31 0 0 1 27.29 0" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:4.8243px;stroke:#000;"/>
  //     <path d="m127.84 146.73c-2.24 8.93-6.92 15.08-12.34 15.08s-10.1-6.15-12.34-15.08z" style="fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.9999px;stroke:#000;"/>
  //   </svg>
  // `;

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/(tabs)/chat/conversation/[id]', params: { id: receiver.id, receiverStr: JSON.stringify(receiver) } })}
    >
      <View style={styles.container}>
        <AvatarContact svgBase64={receiver.avatarImage} isShowOnline={receiver.isOnline}/>
        <Text style={styles.username}>{receiver.username}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    marginRight: 16
  },
  username: {
    color: "#fff"
  }
});
