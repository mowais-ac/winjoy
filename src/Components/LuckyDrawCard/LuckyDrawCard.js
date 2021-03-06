import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Image, } from "react-native";
import { widthConverter } from "../Helpers/Responsive";
import styles from "./Styles";
import CountDown from 'react-native-countdown-component';
import LongButton from "../LongButton";
function LuckyDrawCard({ style, onPress, finish, time, image }) {
  const [renderBtn, setRenderBtn] = useState(false);
  return (
      <View style={[styles.mainView, style]}>
        <Image
          style={[styles.mainView, { position: 'absolute' }]}
          source={{uri:image}}
          
        />
            <LongButton
                style={[
                  styles.Margin,
                  { backgroundColor: "#ffffff", position: 'absolute', bottom: 10, left: 15, },
                ]}
                textstyle={{ color: "#000000", fontFamily: "Axiforma-SemiBold", fontSize: 10 }}
                text="Refer Now"
                font={10}
                shadowless
                onPress={onPress}
              />
        {/* <View style={styles.textView}>
        <Text
            style={[styles.commingSoonTxt, { color: '#D9FE51' }]} >
           LUCKY DRAW
          </Text>
            <Text
            style={[styles.commingSoonTxt,{fontFamily: "Axiforma-bold",}]}
          >
            RESULTS
          </Text>
        </View> */}
      </View>

  
  );
}

export { LuckyDrawCard };
