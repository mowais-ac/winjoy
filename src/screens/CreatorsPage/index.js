import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView
} from "react-native";
import Header from "../../Components/Header";
import { ExperienceCard, FanJoyCard, SecondExperienceCard, TrendingCards, WjBackground } from "../../Components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import EncryptedStorage from "react-native-encrypted-storage";
import I18n from 'react-native-i18n';
import axios from "axios";
import Config from "react-native-config";
I18n.locale = "ar";
import { strings } from "../../i18n";
import { Avatar } from "react-native-elements";
import ExperienceCelebrityModal from '../../Components/ExperienceCelebrityModal';
const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {
  const ModalState = useRef();
  const [data, setData] = useState([]);
  useEffect(() => {
    GetData()
  }, []);
  const GetData = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);
    await axios
      .get(`${Config.API_URL}/funJoy`, requestOptions)
      .then((response) => {
        let res = response.data;
        if (res.status === "success") {

          setData(res.user)
        }

      });
  };
  const onPressContinue = () => {
    ModalState.current(false)
}

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={["#f8d7e8", "#c7dfe8"]}
        >
          <Image
            source={require('../../assets/imgs/creatorImage.png')}
            style={styles.mainView}
          />

          <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />
          <View style={{ marginTop: height * 0.188, alignItems: 'center', flexDirection: 'row', marginLeft: width * 0.02 }}>

            <Avatar
              rounded
              size={80}

              // title="MD"
              source={{
                uri:
                  "https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"
              }}
            />
            <View>
              <Text style={[styles.headerText, { marginLeft: 10,top:15 }]}>Omarosa</Text>
              <Text style={{
                fontFamily: 'Axiforma Regular',
                color: '#000000',
                width: width * 0.7,
                textAlign: 'justify',
                marginTop: height * 0.02,
                height: height * 0.10,
                marginLeft: 10
              }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .

              </Text>
            </View>
          </View>

          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={["#420E92", "#E7003F"]}
            style={{ width: '100%', height: height * 0.4, justifyContent: 'center', paddingLeft: 5, marginTop: 10 }}
          >
            <View style={{ width: "95%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
              <View>
                <Text style={{ color: '#fff', fontSize: 14, fontFamily: "Axiforma Bold", width: '100%' }}>Trending Products</Text>
              </View>

            </View>

            <FlatList
              data={[1, 2, 3]}
              horizontal={true}
              renderItem={({ item }) =>
                <TrendingCards
                  onPress={() => navigation.navigate("AllCreatorsPage")}
                  name={item.user_name}
                  style={{ width: 150, height: height*0.33, marginRight: 20,}}
                  imageStyle={{width: 150, height: height*0.25,borderRadius: 15}}
                />
              }
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={(item) => item.id}
            />
          </LinearGradient>
          <View style={{ width: '100%', alignItems: 'center', marginLeft: 5, marginTop: 15, paddingBottom: 15 }}>
            <Text style={{ fontFamily: 'Axiforma Bold', color: '#eb3d6e', width: '100%' }}>
              Buy experience with celebrities
            </Text>
            <FlatList
              data={[1, 2, 3]}
              horizontal={true}
              renderItem={({ item }) =>
                <SecondExperienceCard
                  onPress={() =>  ModalState.current(true)} 
                  heading={"Q/A"}
                  style={{}}
                />
              }
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={(item) => item.id}
            />
          </View>
          <ExperienceCelebrityModal
            ModalRef={ModalState}
            details
          onPressContinue={onPressContinue} 
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;