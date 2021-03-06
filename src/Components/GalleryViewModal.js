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
  TextInput
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
import { useSelector, useDispatch } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter } from "./Helpers/Responsive";
import Entypo from 'react-native-vector-icons/Entypo';
import Video from "react-native-video";
import * as Progress from 'react-native-progress';
import LoaderImage from "./LoaderImage";
const { width, height } = Dimensions.get("window");
//let timer = () => { };
const WatchAddModal = (props) => {
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
  useEffect(() => {

  }, []);
  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({ state, details, ForceSuccess });
  };

  // const startTimer = () => {
  //   timer = setTimeout(() => {
  //     if (timeLeft >= 30) {

  //       clearTimeout(timer);
  //       setModelState({
  //         ...ModelState,
  //         state: ModelState.state=false,
  //       });
  //      // getData()
  //       return false;


  //     }
  //     setTimeLeft(timeLeft +0.1);
  //   }, 100)
  // }

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
        <TouchableOpacity
          onPress={() => {
            setModelState({
              ...ModelState,
              state: !ModelState.state,
            });
          }}
          style={{ position: 'absolute', bottom: height * 0.62, right: 0 ,height:30,width:30,justifyContent:'center',alignItems:'center',}}>
          <Image
            style={{
              width: 15,
              height: 20,
            }}
            resizeMode="center"
            source={require('../assets/imgs/cross.png')}
          />
        </TouchableOpacity>
        <LoaderImage
          source={{
            // uri: ImgUrl.replace("http://", "https://"),
            uri: props?.imageUrl
          }}
          style={{ width: width * 0.9, height: height * 0.48, borderRadius: 15, marginTop: 10 }}
          resizeMode="stretch"
        />
        <View style={{ width: width * 0.3, flexDirection: 'row', justifyContent: 'space-between', left: width * 0.3, position: 'absolute', top: height * 0.7 }}>
          <TouchableOpacity
            onPress={props.onPressPrevious}
            style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              style={{
                width: 15,
                height: 20,
              }}
              resizeMode="center"
              source={require('../assets/leftArrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props?.onPressNext}
            style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              style={{
                width: 15,
                height: 20,
              }}
              resizeMode="center"
              source={require('../assets/rightArrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

    </Modal>
  );
};

export default WatchAddModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
    alignItems: 'flex-end'

  },
  ModalView: {
    width: width * 0.9,
    height: height * 0.48,
    marginTop: height * 0.2,
    borderRadius: 10,
    marginLeft: width * 0.049
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
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: height * 0.02,
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
  },
  text: {
    color: '#420E92', fontFamily: 'Axiforma-Bold', fontSize: RFValue(14)
  },
  descriptionText: {
    color: '#000000', fontFamily: 'Axiforma-Regular', fontSize: RFValue(13), textAlign: 'center', lineHeight: height * 0.03
  },
  backgroundVideo: {
    height: height * 0.3,
    width: "100%",
    position: "absolute",
    // top: 70,
    left: 0,
    alignItems: "stretch",
    top: 0,
    right: 0,
    borderRadius: 10,

  },
});
