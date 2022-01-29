import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  I18nManager
} from "react-native";
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from "../../Components/Helpers/Responsive";
import Header from "../../Components/Header";
import { Avatar } from "react-native-elements";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from "axios";
import ProfilePicture from "../../Components/ProfilePicture";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LongButton from "../../Components/LongButton";
import { AuthContext } from "../../Components/context";
import I18n from 'react-native-i18n';
import { RFValue } from "react-native-responsive-fontsize";
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { WjBackground } from "../../Components";

const index = ({ props, navigation }) => {
  const { t, i18n } = useTranslation();
  const [headerValue, setHeaderValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(I18n.locale);
  const [items, setItems] = useState([
    { label: 'AR', value: 'ar' },
    { label: 'EN', value: 'en' }
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState("AED");
  const [items2, setItems2] = useState([
    { label: 'AED', value: 'AED' },
    { label: 'PKR', value: 'PKR' }
  ]);


  const [userData, setUserData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const { signOut } = React.useContext(AuthContext);
  const UserInfo = async () => {
    const userInfo = JSON.parse(await EncryptedStorage.getItem("User"));
    setUserData(userInfo);
    console.log(userInfo);
  };
  let data2 = [
    {
      name: t("wallet"),
      icon: require('../../assets/imgs/humburgerIcons/wallet.png')
    },
    {
      name: t("played_games"),
      icon: require('../../assets/imgs/humburgerIcons/playedGames.png')

    },
    {
      name: t("my_order"),
      icon: require('../../assets/imgs/humburgerIcons/myOrders.png')

    },
    {
      name: t("leaderboard"),
      icon: require('../../assets/imgs/humburgerIcons/leaderBoard.png')

    },
    {
      name: t("Buy Lives"),
      icon: require('../../assets/imgs/humburgerIcons/buyLives.png')

    },
    {
      name: t("refer_&_Earn"),
      icon: require('../../assets/imgs/humburgerIcons/reffer.png')

    },
    {
      name: t("view_profile"),
      icon: require('../../assets/imgs/humburgerIcons/viewProfile.png')

    },
    {
      name: t("friends"),
      icon: require('../../assets/imgs/humburgerIcons/friends.png')

    },
    {
      name: t("logout"),
      icon: require('../../assets/imgs/humburgerIcons/logout.png')

    },
  ];
  const MyFriends = async () => {
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
      .get(`${Config.API_URL}/accepted-connections/list`, requestOptions)
      .then((response) => {
        let res = response.data;
        setFriendData(res.data[0]);
      });
  };
  const languageRestart = async (item) => {
    console.log("lang", item.value);

    if (item.value === "ar") {
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
      }
    } else {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true);
      }
    }
    RNRestart.Restart();
  };
  useEffect(() => {
    UserInfo();
    MyFriends();
  }, []);
  return (

    <View style={{ backgroundColor: '#ffffff' }}>
      <Header
        noBell={true}
        back={true}
        style={{
          position: 'absolute',
          zIndex: 1000,
          height: height * 0.06,
          backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
          width: '100%',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          paddingTop:height * 0.017,
        }} />
      <ScrollView
        onScroll={(e) => {
          setHeaderValue(e.nativeEvent.contentOffset.y)
        }}
      >
        <WjBackground
          style={{ height: height * 0.37, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
        />
        <View style={styles.aView}>
          <View style={styles.bView}>
            <View style={styles.topView}>
              <ProfilePicture
                picture={userData?.profile_image}
                id={userData?.id}
                name={
                  userData?.first_name?.slice(0, 1) +
                  userData?.last_name?.slice(0, 1)
                }
                style={styles.avatarView}
              />

              <View style={{ width: widthConverter(250), marginLeft: 20 }}>
                <Label
                  font={14}
                  notAlign
                  bold
                  style={{ color: "#FFFFFF", marginTop: 8 }}
                >
                  {userData?.first_name?.charAt(0)?.toUpperCase() + userData?.first_name?.slice(1)} {userData?.last_name?.charAt(0)?.toUpperCase() + userData?.last_name?.slice(1)}
                </Label>
                <Label
                  primary
                  notAlign
                  font={14}
                  bold
                  style={{ color: "#FFFFFF", marginTop: 6 }}
                >
                  {userData?.designation} {"\n"}
                  <Label
                    primary
                    font={14}
                    style={{ color: "#e2acc7" }}
                  >
                    {userData?.company_name ? " at \n" : null}
                  </Label>
                  {userData?.company_name}
                </Label>
              </View>
            </View>
            <View
              style={{
                marginTop: height * 0.012,
                height: 1,
                width: widthConverter(375),
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            />
            <Text style={[styles.text, { color: "#ffffff", paddingLeft: 15, paddingTop: height * 0.01, paddingBottom: 2, }]}>
              {t("my_friends")}
            </Text>
            <View style={{ height: height * 0.1, marginTop: height * 0.01 }}>
              <FlatList
                data={friendData}
                horizontal={true}
                renderItem={({ item, index }) => {
                  return (
                    <ProfilePicture
                      picture={item?.profile_image}
                      id={item?.id}
                      name={
                        item?.first_name?.slice(0, 1) +
                        item?.last_name?.slice(0, 1)
                      }
                      style={styles.avatarView}
                    />
                  );
                }}
              />
            </View>
            <View style={styles.footer}>
              <Text style={[styles.text, { color: '#ffffff' }]}>{friendData.length} {friendData.length < 2 ? "Friend" : "Freinds"}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TabsStack", {
                    screen: "Profile",
                    params: {
                      screen: "ProfileScreen",
                      params: { selected: 3 },
                    },
                  })
                }
              >
                <Text style={[styles.text, { color: "#ffff00" }]}>
                  {t("view_all_friends")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={data2}
            contentContainerStyle={{
              paddingBottom: height * 0.02,
            }}
            // horizontal={true}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    marginTop: 5,
                    height: 1,
                    width: "100%",
                    backgroundColor: "#E6DFEE",
                  }}
                />
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: width,
                    marginTop: 5,

                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (item === "Friends") {
                        navigation.navigate("Friends", {
                          selected: 3
                        });
                      }
                      if (item === "Wallet") {
                        // navigation.navigate("BottomTabStack"); 
                        navigation.navigate("BottomTabStack", {
                          screen: "WALLET",

                        });
                      }
                      if (item === "Leaderboard") {
                        navigation.navigate("SimpeStackScreen", {
                          screen: "LeaderBoard",
                        });
                      }
                      if (item === "View profile") {
                        navigation.navigate("TabsStack", {
                          screen: "Profile",
                          params: {
                            screen: "ProfileScreen",
                            params: { selected: 2 },
                          },
                        });
                      }
                      if (item === "Played games") {
                        navigation.navigate("TabsStack", {
                          screen: "Profile",
                          params: {
                            screen: "ProfileScreen",
                            params: { selected: 1 },
                          },
                        });
                      }
                      if (item === "My orders") {
                        navigation.navigate("Orders");
                      }
                      if (item === "Logout") {
                        signOut()
                      }
                      if (item === "Settings") {
                        navigation.navigate("Settings")
                      }
                      if (item === "Buy Lifes") {
                        navigation.navigate("BuyLife")
                      }

                    }}
                  >
                    <View style={{ flexDirection: 'row', marginLeft: width * 0.05 }}>
                      <Image
                        style={styles.iconImage}
                        source={item?.icon}
                        resizeMode='center'
                      />
                      <Text
                        style={[
                          styles.text,
                          {
                            color: "#0B2142",
                            height: heightPercentageToDP("5%"),
                            top: 10,
                          },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <View
            style={{
              height: 1,
              width: width,
              backgroundColor: "#E6DFEE",
            }}
          />
          <View style={{ width: "95%", alignItems: 'center', marginTop: 10 }}>

            <Text
              style={[
                styles.text,
                {
                  color: "#E7003F",
                  height: heightPercentageToDP("5%"),
                  width: "93%",
                  fontSize: RFValue(16),
                  fontFamily: 'Axiforma SemiBold'
                },
              ]}
            >
              {t("setting")}
            </Text>

            <View style={styles.rowView}>
              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={styles.innerRow}>
                  <MaterialIcons name="language" size={23} color="#fff" style={{ marginTop: 6.5, marginRight: 7 }} />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: "#ffffff",
                        height: heightPercentageToDP("5%"),
                        top: 10,
                      },
                    ]}
                  >
                    {t("language")}
                  </Text>
                </View>
                <View>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onSelectItem={(item) => {
                      i18n
                        .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                        .then(() => {
                          I18nManager.forceRTL(i18n.language === 'ar');
                          RNRestart.Restart();
                        });
                    }}
                    containerStyle={{
                      width: width * 0.25,
                    }}
                    zIndex={2000}
                    textStyle={{
                      fontSize: RFValue(14),
                      fontFamily: "Axiforma-Regular",
                      color: "#ffffff",
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: "#fff",
                      marginTop: -height * 0.02,


                    }}
                    arrowIconStyle={{
                      marginTop: -height * 0.023
                    }}


                    listItemLabelStyle={{
                      color: '#000000',
                      fontFamily: "Axiforma-Regular",

                    }}
                    labelStyle={{
                      fontFamily: "Axiforma-Regular",
                      color: "#ffffff",
                      fontSize: RFValue(13),

                      marginTop: -height * 0.028

                    }}
                    style={[

                      styles.text,
                      {

                        color: "#ffffff",
                        //height: heightPercentageToDP("5%"),
                        width: width * 0.2,

                        backgroundColor: null,
                        borderWidth: 0,
                        marginTop: 5
                      },
                    ]}
                    disableBorderRadius={false}
                  />
                </View>
                
              </View> */}
              <View style={styles.twoBtnView}>
                <Text style={[styles.text, { color: '#E9E3F0' }]}>
                  Language:{' '}
                  <Text style={styles.text}>
                    EN
                  </Text>
                </Text>
              </View>
              <View style={styles.twoBtnView}>
                <Text style={[styles.text, { color: '#E9E3F0' }]}>
                  Currency:{' '}
                  <Text style={styles.text}>
                    AED
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                // marginTop: height * 0.001,
                height: 1,
                width: width,
                backgroundColor: "#E6DFEE",
              }}
            />


            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: "100%", marginTop: height * 0.001 }}>
              <Image
                style={styles.bottomImage}
                source={require('../../assets/imgs/humburgerIcons/insta.png')}
                resizeMode='center'
              />
              <Image
                style={styles.bottomImage}
                source={require('../../assets/imgs/humburgerIcons/faceBook.png')}
                resizeMode='center'
              />
              <Image
                style={styles.bottomImage}
                source={require('../../assets/imgs/humburgerIcons/whatsApp.png')}
                resizeMode='center'
              />
              <Image
                style={styles.bottomImage}
                source={require('../../assets/imgs/humburgerIcons/linkedIn.png')}
                resizeMode='center'
              />
              <Image
                style={styles.bottomImage}
                source={require('../../assets/imgs/humburgerIcons/twiter.png')}
                resizeMode='center'
              />
            </View>
            <View
              style={{
                marginTop: height * 0.001,
                height: 1,
                width: width,
                backgroundColor: "#E6DFEE",
              }}
            />

            <View style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              width: width,
              height: height * 0.15,
              marginTop: 5
            }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: "#E7003F",
                    width: width,
                    fontSize: RFValue(16),
                    fontFamily: 'Axiforma SemiBold',
                    textAlign: 'center',
                  },
                ]}
              >
                Need Help?
              </Text>
              <View style={{
                width: width * 0.9,
                height: height * 0.058,
                borderWidth: 1,
                borderColor: '#E9E3F0',
                borderRadius: height * 0.07,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: -10

              }}>
                <View style={[styles.bottomBtnView, {
                  backgroundColor: '#E9E3F0',
                  borderTopLeftRadius: height * 0.035,
                  borderBottomLeftRadius: height * 0.035,
                }]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: "#420E92",
                        fontSize: RFValue(16),
                        fontFamily: 'Axiforma SemiBold',
                        textAlign: 'center'
                      },
                    ]}
                  >
                    Call Us
                  </Text>
                </View>
                <View style={[styles.bottomBtnView, {
                  borderTopRightRadius: height * 0.035,
                  borderBottomRightRadius: height * 0.035,
                }]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: "#420E92",
                        fontSize: RFValue(16),
                        fontFamily: 'Axiforma SemiBold',
                        textAlign: 'center'
                      },
                    ]}
                  >
                    Email Us
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 800,
    width: width,
    alignItems: "center",
  },
  newGameView: {
    marginTop: 10,
    width: width - 25,
    height: height - 600,
    justifyContent: "center",
    borderRadius: 20,
  },
  btnView: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    width: width - 200,
    height: height - 665,
    justifyContent: "center",
    borderRadius: 30,
  },

  aView: {
    alignItems: 'center',
    width: widthPercentageToDP("100%"),
    marginTop: height * 0.05,

  },
  bView: {
    // backgroundColor: "rgba(0,0,0,0.4)",
    height: heightPercentageToDP("34.5%"),
  },
  flatListHeader: {
    marginTop: heightConverter(20),
    width: widthPercentageToDP("100%"),
    backgroundColor: "rgba(0,0,0,0.4)",
    height: heightConverter(65),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footer: {
    width: widthPercentageToDP("100%"),
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topView: {
    width: widthPercentageToDP("100%"),
    paddingTop: 10,
    flexDirection: "row",
  },
  avatarView: {
    width: widthConverter(65),
    height: widthConverter(65),
    borderRadius: heightConverter(65),
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffffff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    marginLeft: 15,
  },
  text: {
    fontFamily: "Axiformam Regular",
    color: "#0B2142",
    fontSize: RFValue(13),
  },
  rowView: {
    width: width * 0.9,
    justifyContent: 'space-between',
    // borderWidth:3
    //elevation:3,
    flexDirection: 'row',

    marginBottom: 10,
    // backgroundColor: "rgba(128,0,128,0.5)",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innerRow: {
    flexDirection: 'row'
  },
  iconImage: {
    width: width * 0.06,
    height: height * 0.04,
    resizeMode: "contain",
    marginTop: 6,
    marginRight: 10
  },
  bottomImage: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
  },
  Margin: {
    height: height * 0.065,
    width: width * 0.36,
    backgroundColor: "#fcd9e2",
    borderRadius: 10
  },
  twoBtnView: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6DFEE',
    borderRadius: height * 0.06,
  },
  bottomBtnView: {
    width: width * 0.45,
    height: height * 0.058,
    justifyContent: 'center',
  }
});

export default index;