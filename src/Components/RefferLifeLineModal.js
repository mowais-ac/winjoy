import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Label from './Label';
import {firebase, dynamicLinks} from '@react-native-firebase/dynamic-links';
import LabelButton from './LabelButton';
import {Colors, Images} from '../Constants/Index';
import LongButton from './LongButton';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {GetDate, JSONtoForm} from '../Constants/Functions';
import ProfilePicture from './ProfilePicture';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {heightConverter} from './Helpers/Responsive';
import {RefferalTextInput} from '../Components/index';
import {getLiveShowPlans} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {numericRegex, alphabetRegex} from '../Constants/regex';
import Modals from '../Components/Modals';
import BuyLifeCongrats from './BuyLifeCongrats';
import Clipboard from '@react-native-clipboard/clipboard';
import types from '../redux/types';
//ReferralModal here
const {width, height} = Dimensions.get('window');
let li = [
  {
    sr: 1,
    status: false,
    status2: false,
  },
];
let reff = [
  {
    name: null,
    phone_no: null,
  },
];

const RefferLifeLineModal = props => {
  const ModalState = useRef();
  const ModalStateError = useRef();
  const totalLives = useRef();
  const livePlans = useSelector(state => state.app.livePlans);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [selected, setSelected] = useState(0);
  const [id, setId] = useState(0);
  const [validatorIndex, setValidatorIndex] = useState(false);
  const [mg, setMg] = useState('');
  const [updateData, setUpdateData] = useState(false);
  const [refferalLivePlans, setRefferalLivePlans] = useState([]);
  const [totalRef, setTotalRef] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Link, setLink] = useState('');
  useEffect(() => {
    dispatch(getLiveShowPlans());
    let li = [];
    let idforFirst;
    livePlans?.plan?.forEach(element => {
      if (element.type === 'referral') {
        li.push(element);

        if (element.required_referrals === 1) {
          idforFirst = element.id;
        }
      }
    });
    setRefferalLivePlans(li);
    setId(idforFirst);
    buildLink();
  }, []);
  const buildLink = async () => {
    const link = await firebase.dynamicLinks().buildLink({
      link: 'https://winjoy.ae',
      domainUriPrefix: 'https://winjoyae.page.link/7Yoh',
      analytics: {
        campaign: 'refferal link',
        content: 'Click Me',
      },
      /*  social: {
        title: 'Winjoy',
        descriptionText: 'Reffer a friends and family to win prizes',
        imageUrl:
          'https://lh3.googleusercontent.com/geougc/AF1QipMMFxFa5U5IOkxLkFJEYtiXZPwOOkArwEHiF_4x=w573-h573-p-no',
      }, */
      android: {
        packageName: 'com.winjoy',
        minimumVersion: '35',
      },
    });

    setLink(link);
    console.log('buildLink', link);
    return link;
  };
  // share btn
  //const link = `https://winjoy.ae/invite/token?${livePlans?.refer_code}`;
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Refferal link',
        message: Link,
        url: Link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const ApproveRef = useRef();
  const DeclineRef = useRef();

  const navigation = useNavigation();
  const SucessModalState = useRef();

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({state, details, ForceSuccess});
  };

  const onPressRefTab = (index, item) => {
    li = [];
    reff = [];
    setTotalRef(item.required_referrals);
    setSelected(index);
    setId(item.id);
    for (var i = 0; i < item?.required_referrals; ++i) {
      li.push({
        sr: i + 1,
        status: false,
        status2: false,
      });
      reff.push({
        name: null,
        phone_no: null,
      });
    }
  };
  const SettingName = (name, index) => {
    reff[index].name = name;
  };
  const SettingNumber = (number, index) => {
    reff[index].phone_no = number;
  };
  const SettingCountryCode = (text, index) => {
    reff[index].countrycode = text;

    setUpdateData(!updateData);
  };

  const HandleClick = async () => {
    let validToPost = true;
    var postData = '';
    reff?.forEach((element, index) => {
      if (
        element.name !== '' &&
        element.name !== null &&
        element.name !== undefined &&
        alphabetRegex.test(element?.name)
      ) {
        li[index].status = false;
      } else {
        li[index].status = true;
      }
      if (
        element.phone_no !== '' &&
        element.phone_no !== null &&
        element.phone_no !== undefined
      ) {
        li[index].status2 = false;
      } else {
        li[index].status2 = true;
      }
    });
    li?.forEach(element => {
      if (element.status === true) {
        validToPost = false;
      }
      if (element.status2 === true) {
        validToPost = false;
      }
    });
    setUpdateData(!updateData);
    let fData = [];
    reff.forEach((element, index) => {
      fData.push({
        name: element.name,
        phone_no:
          (element?.countrycode ? element?.countrycode : 971) +
          element.phone_no,
      });
    });

    if (validToPost) {
      postData = {
        referrals: fData,
      };

      PostData(postData);
    }
  };
  const PostData = async postData => {
    setLoader(true);

    var Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(postData),
    };
    await fetch(`${Config.API_URL}/buy_lives_plan/${id}`, requestOptions)
      .then(response => response.json())
      .then(async res => {
        setLoader(false);
        if (res.status === 'success') {
          setMg(res.message);
          dispatch(getLiveShowPlans());
          totalLives.current = res?.lives;
          SucessModalState.current(true);
        } else {
          ModalStateError.current(true, {
            heading: 'Error',
            Error:
              res.message.substring(0, 16) === 'SQLSTATE[23000]:'
                ? "We're sorry, one or more referrals are already exist in our system. Please try the different."
                : res.message,
          });
        }
      })
      .catch(e => {
        setLoader(false);
      });
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
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModelState({
            ...ModelState,
            state: !ModelState.state,
          });
          if (props.onClose) props.onClose();
        }}>
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>
      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />

        <Text
          style={[
            styles.text,
            {textAlign: 'center', marginTop: height * 0.03, width: width},
          ]}>
          Refer To Earn Lives
        </Text>

        <View style={styles.ModalBody}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: width * 0.93,
                height: height * 0.075,
                backgroundColor: '#F2EFF5',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: height * 0.03,
                flexDirection: 'row',
              }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.mainTextHeading,
                  {color: '#000000', width: width * 0.68, textAlign: 'left'},
                ]}>
                https:/ /winjoy.ae/invite/token?aaasd
              </Text>
              <TouchableOpacity onPress={onShare}>
                <View
                  style={{
                    width: width * 0.2,
                    height: height * 0.06,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#420E92', fontFamily: 'Axiforma-Bold'}}>
                    Share
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              style={{}}
              contentContainerStyle={{height: height * 0.14, marginLeft: 11}}
              // ItemSeparatorComponent={
              //   () => <View style={{ width: 10, }} />
              // }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={refferalLivePlans}
              renderItem={({item, index}) =>
                item?.type === 'referral' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: width * 0.32,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        onPressRefTab(index, item);
                      }}>
                      <View
                        style={
                          selected === index
                            ? styles.refferBoxSelected
                            : styles.refferBox
                        }>
                        <Text
                          style={[
                            styles.mainTextHeading,
                            {color: selected === index ? '#420E92' : '#6F5F87'},
                          ]}>
                          {item?.title?.split(' ')[0] +
                            ' ' +
                            item?.title?.split(' ')[1]}
                        </Text>
                        <Text
                          style={[
                            styles.textHeading,
                            {color: selected === index ? '#420E92' : '#6F5F87'},
                          ]}>
                          {item?.title?.split(' ')[2] +
                            ' ' +
                            item?.title?.split(' ')[3]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null
              }
              keyExtractor={item => item.id}
            />
          </View>
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15,
            }}>
            {selected === 0 ? (
              <FlatList
                style={{height: height * 0.35, width: '100%'}}
                data={li}
                extraData={updateData}
                renderItem={({item, index}) => (
                  <RefferalTextInput
                    srNumber={item.sr}
                    validationBorderName={item.status}
                    validationBorderNumber={item.status2}
                    CountryCode={text => SettingCountryCode(text, index)}
                    code={
                      reff[index]?.countrycode ? reff[index].countrycode : 971
                    }
                    onChangeName={name => {
                      if (!name) {
                        SettingName(name, index);
                      } else {
                        SettingName(name, index);
                      }
                    }}
                    onChangeNumber={number => {
                      if (!number) {
                        SettingNumber(number, index);
                      } else {
                        SettingNumber(number, index);
                      }
                    }}
                  />
                )}

                //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
              />
            ) : null}
            {selected === 1 ? (
              <FlatList
                style={{height: height * 0.4, width: '100%'}}
                contentContainerStyle={{paddingBottom: height * 0.3}}
                data={li}
                extraData={updateData}
                renderItem={({item, index}) => (
                  <RefferalTextInput
                    srNumber={item.sr}
                    validationBorderName={item.status}
                    validationBorderNumber={item.status2}
                    CountryCode={text => SettingCountryCode(text, index)}
                    code={
                      reff[index]?.countrycode ? reff[index].countrycode : 971
                    }
                    onChangeName={name => {
                      if (!name) {
                        SettingName(name, index);
                      } else {
                        SettingName(name, index);
                      }
                    }}
                    onChangeNumber={number => {
                      if (!number) {
                        SettingNumber(number, index);
                      } else {
                        SettingNumber(number, index);
                      }
                    }}
                  />
                )}

                //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
              />
            ) : null}
            {selected === 2 ? (
              <FlatList
                style={{height: height * 0.4, width: '100%'}}
                contentContainerStyle={{paddingBottom: height * 0.3}}
                data={li}
                extraData={updateData}
                renderItem={({item, index}) => (
                  <RefferalTextInput
                    srNumber={item.sr}
                    validationBorderName={item.status}
                    validationBorderNumber={item.status2}
                    CountryCode={text => SettingCountryCode(text, index)}
                    code={
                      reff[index]?.countrycode ? reff[index].countrycode : 971
                    }
                    onChangeName={name => {
                      if (!name) {
                        SettingName(name, index);
                      } else {
                        SettingName(name, index);
                      }
                    }}
                    onChangeNumber={number => {
                      if (!number) {
                        SettingNumber(number, index);
                      } else {
                        SettingNumber(number, index);
                      }
                    }}
                  />
                )}

                //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
              />
            ) : null}
          </View>

          <View style={{width: '100%', paddingLeft: 15}}>
            <TouchableOpacity
              onPress={() => {
                HandleClick();
              }}
              disabled={loader}
              style={{
                height: heightConverter(20),
                width: width * 0.9,

                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.03,
                marginLeft: width * 0.014,
              }}>
              <View
                style={{
                  height: heightConverter(60),
                  width: width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#420e92',
                  borderRadius: 40,
                }}>
                {loader ? (
                  <ActivityIndicator size="large" color={'#ffffff'} />
                ) : selected === 0 ? (
                  <Label primary font={16} bold style={{color: '#ffffff'}}>
                    Refer 1 Friends
                  </Label>
                ) : selected === 1 ? (
                  <Label primary font={16} bold style={{color: '#ffffff'}}>
                    Refer {totalRef} Friends
                  </Label>
                ) : selected === 2 ? (
                  <Label primary font={16} bold style={{color: '#ffffff'}}>
                    Refer {totalRef} Friends
                  </Label>
                ) : null}
              </View>
            </TouchableOpacity>
            <LabelButton
              primary
              headingtype="h3"
              bold
              style={[
                styles.CloseBtn,
                {color: '#6F5F87', fontSize: RFValue(14)},
              ]}
              onPress={() => {
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
              }}>
              Not Now
            </LabelButton>
            <Modals ModalRef={ModalStateError} Error />
            <BuyLifeCongrats
              ModalRef={SucessModalState}
              heading={'Congratulations'}
              total_lives={totalLives.current}
              description={mg}
              requestOnPress={() => {
                SucessModalState.current(false);
              }}
              closeOnPress={() => {
                SucessModalState.current(false);
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RefferLifeLineModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.95,
    marginTop: height * 0.05,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.01,
  },

  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.6,
  },
  CheckImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 1,
  },
  ProfilePicture: {
    marginLeft: width * 0.03,
  },
  ProfileInfo: {
    marginLeft: width * 0.02,
    justifyContent: 'center',
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
    alignSelf: 'center',
  },
  ///new added
  Main1: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    width: width * 0.4,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL,
  },
  Main2: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: 'center',
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL,
  },
  mView: {
    justifyContent: 'center',

    alignSelf: 'center',
  },
  MarginLarge: {
    paddingLeft: width * 0.06,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
  },
  MarginLargeNumber: {
    paddingLeft: width * 0.02,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
    letterSpacing: width * 0.03,
    width: width * 0.2,
  },
  titleTxt: {
    marginTop: height * 0.01,
  },
  textHeading: {
    color: '#6F5F87',
    fontFamily: 'Axiforma-Bold',
    fontSize: RFValue(16),
    textAlign: 'center',
  },
  mainTextHeading: {
    color: '#6F5F87',
    fontFamily: 'Axiforma-Regular',
    fontSize: RFValue(16),
    textAlign: 'center',
    lineHeight: height * 0.03,
  },
  refferBox: {
    width: width * 0.29,
    height: height * 0.12,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refferBoxSelected: {
    width: width * 0.29,
    height: height * 0.12,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#420E92',
  },

  text: {
    color: '#420E92',
    fontFamily: 'Axiforma-Bold',
    fontSize: RFValue(14),
  },
  descriptionText: {
    color: '#000000',
    fontFamily: 'Axiforma-Regular',
    fontSize: RFValue(13),
    textAlign: 'center',
    lineHeight: height * 0.03,
  },
});
