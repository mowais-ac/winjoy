import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  Text,
  FlatList
} from "react-native";
import Label from "./Label";
import LabelButton from "./LabelButton";
import { Colors, Images } from "../Constants/Index";
import LongButton from "./LongButton";
import { useNavigation } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import { GetDate } from "../Constants/Functions";
import ProfilePicture from "./ProfilePicture";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter } from "./Helpers/Responsive";
import { Avatar } from "react-native-elements";
const { width, height } = Dimensions.get("window");

const ExperienceCelebrityModal = (props) => {
  console.log("props.experienceDetail", props.experienceDetail);
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const ApproveRef = useRef();
  const DeclineRef = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({ state, details, ForceSuccess });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        setModelState({
          ...ModelState,
          state: !ModelState.state,
        });
        if (props.onClose) props.onClose();
      }}
    >

      <View style={styles.MainView} />

      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />

        <View style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
          <View style={{
            height: height * 0.18,
            width: width * 0.9,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 10
              }}
              source={{
                uri: props?.experienceDetail?.experience?.thumbnail,
              }}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ color: '#0B2142', fontFamily: 'Axiforma SemiBold', fontSize: RFValue(14) }}>
                {props?.experienceDetail?.experience?.title}
              </Text>
              <Text style={{ color: '#420E92', fontFamily: 'Axiforma Bold', fontSize: RFValue(14) }}>
                AED{" "}{props?.experienceDetail?.experience?.price}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1.3, width: '100%', backgroundColor: '#E6DFEE' }} />
        <View style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
          <View style={{
            height: height * 0.18,
            width: width * 0.9,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Avatar
              rounded
              size={75}

              // title="MD"
              source={{
                uri: props?.celebrityData?.profile_image,
              }}
            />
            <View style={{ marginLeft: 20, width: '70%' }}>
              <Text style={{
                color: '#000000',
                fontFamily: 'Axiforma Regular',
                fontSize: RFValue(12),
                textAlign: 'left'
              }}>
                {props?.celebrityData?.bio}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1.3, width: '100%', backgroundColor: '#E6DFEE' }} />
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ color: '#000000', fontFamily: 'Axiforma SemiBold', fontSize: RFValue(12) }}>Portfolio</Text>
          {/* <View style={{
            width: width * 0.6,
            height: height * 0.16,
            justifyContent:'center',
            alignItems:'center' 
          }}>
            <Image
              style={{
                width: width * 0.6,
                height: height * 0.16,
                borderRadius: 10,
                position: 'absolute'
              }}
              source={{
                uri: 'https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg',
              }}
            />
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 10
              }}
              source={require('../assets/imgs/playbutton.png')}
            />
          </View> */}
          <FlatList
            data={props?.experienceDetail?.celebrity_porttfolio}
            horizontal={true}
            ListEmptyComponent={() => (
              <Text style={{ color: '#000000' }}>The list is empty</Text>
            )
            }
            renderItem={({ item }) =>
              <View style={{
                width: width * 0.6,
                height: height * 0.16,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft:10
               
              }}>
                <Image
                  style={{
                    width: width * 0.6,
                    height: height * 0.16,
                    borderRadius: 10,
                    position: 'absolute'
                  }}
                  source={{
                    uri: item?.thumbnail,
                  }}
                />
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10
                  }}
                  resizeMode="center"
                  source={require('../assets/imgs/playbutton.png')}
                />
              </View>
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              marginTop: 10,
              paddingRight:10
             // marginLeft: width * 0.03
            }}
            // refreshControl={
            //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            // }
            keyExtractor={(item) => item.id}
          />
          <View style={{ height: 1.3, width: '100%', backgroundColor: '#E6DFEE', marginTop: 25 }} />
          <Text style={{
            color: '#000000',
            fontFamily: 'Axiforma SemiBold',
            fontSize: RFValue(12),
            width: '90%',
            textAlign: 'center',
            marginTop: 10,
            color: '#420E92'
          }}>Total: <Text style={{ fontSize: RFValue(16) }}>AED{" "}{props?.experienceDetail?.experience?.price}</Text></Text>
        </View>

        <View style={styles.ModalBody}>
          <TouchableOpacity
            onPress={() => { props.onPressContinue() }}
            style={{
              height: heightConverter(15),
              width: width * 0.9,

              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height * 0.04,
              marginLeft: width * 0.04,
            }}
          >
            <View

              style={{
                height: heightConverter(55),
                width: width * 0.9,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#420e92',
                borderRadius: 40,
              }}


            >

              <Label primary font={16} bold style={{ color: "#ffffff" }}>
                Pay Now
              </Label>
            </View>
          </TouchableOpacity>
          <LabelButton
            primary
            headingtype="h3"
            bold
            style={[styles.CloseBtn, { color: '#6F5F87', fontSize: RFValue(14) }]}
            onPress={() => {
              setModelState({
                ...ModelState,
                state: !ModelState.state,
              });
            }}
          >
            Close
          </LabelButton>
        </View>
      </View>
    </Modal>
  );
};

export default ExperienceCelebrityModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.77,
    marginTop: height * 0.13,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.01,

  },

  ModalBody: {
    backgroundColor: Colors.WHITE,
    height: height * 0.3,
  },
  CheckImage: {
    alignSelf: "center",
    resizeMode: "contain",
    height: height * 0.1,
    marginTop: height * 0.09,
  },
  TextHeading: {
    marginTop: height * 0.02,
  },
  RequestMsg: {
    marginTop: height * 0.01,
    width: width * 0.75,
    lineHeight: height * 0.03,
  },


  CloseBtn: {
    marginTop: height * 0.02,
  },

  ConView: {
    height: height * 0.1,
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 1,
  },
  ProfilePicture: {
    marginLeft: width * 0.03,
  },
  ProfileInfo: {
    marginLeft: width * 0.02,
    justifyContent: "center",
  },
  ReqMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.035,
  },
  ConfirmMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.03,
  },
  ApproveBtn: {
    marginTop: height * 0.01,
  },
  DeclineBtn: {
    marginTop: height * 0.02,
  },

  ErrorView: {
    height: height * 0.44,
    marginTop: height * 0.56,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  ErrorBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.4,
  },

  ErrorTxt: {
    width: width * 0.9,
    alignSelf: "center",
  },
  ///new added
  Main1: {
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: width * 0.4,
    borderRadius: 55,
    alignSelf: "center",
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL
  },
  Main2: {
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: "center",
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL
  },
  mView: {
    justifyContent: "center",

    alignSelf: "center",

  },
  MarginLarge: {
    paddingLeft: width * 0.06,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL
  },
  MarginLargeNumber: {
    paddingLeft: width * 0.02,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
    letterSpacing: width * 0.03, width: width * 0.2,
  },
  titleTxt: {
    marginTop: height * 0.01
  }
});
