import React from 'react'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function ToastHk2t() {
    const toastConfig = {
        /*
          Overwrite 'success' type,
          by modifying the existing `BaseToast` component
        */
        success: (props: any) => (
          <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#12aa26' }}
            text1Style={{
              fontSize: 15,
              fontWeight: '400',
              color: '#fff'
            }}
          />
        ),
        /*
          Overwrite 'error' type,
          by modifying the existing `ErrorToast` component
        */
        error: (props: any) => (
          <ErrorToast
            {...props}
            style={{ backgroundColor: '#e64444', borderLeftColor: '#ff0000' }}
            text1Style={{
              fontSize: 15,
              color: '#fff'
            }}
            text2Style={{
              fontSize: 15,
              color: '#fff'
            }}
          />
        ),
        /*
          Or create a completely new type - `tomatoToast`,
          building the layout from scratch.
      
          I can consume any custom `props` I want.
          They will be passed when calling the `show` method (see below)
        */
        // tomatoToast: ({ text1, props }) => (
        //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        //     <Text>{text1}</Text>
        //     <Text>{props.uuid}</Text>
        //   </View>
        // )
    };
    return (
        <Toast config={toastConfig}/>
    )
}
