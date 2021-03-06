import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import styles from "./Styles";
import Label from "../Label";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthPercentageToDP } from "../Helpers/Responsive";
import LoaderImage from "../LoaderImage";
import Config from "react-native-config";
import ProgressCircle from 'react-native-progress-circle'
const { width, height } = Dimensions.get("window");
function SecondExperienceCard({ style, onPress, heading, cover_photo, short_desc, price }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ width: 200 }, style]}
    >
      <View>
        <Image
          style={styles.bgImage}
          source={{
            uri: cover_photo,
          }}
        />
      </View>
      <Text style={{ color: '#000000', fontFamily: 'Axiforma-SemiBold',width:width*0.44,textAlign:'center' }}>{short_desc}</Text>
      <Text style={{ color: 'blue', fontFamily: 'Axiforma-Regular', textAlign: 'center',width:'85%', }}>{price} AED</Text>
    </TouchableOpacity>
  );
}

export { SecondExperienceCard };
