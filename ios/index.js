import React, {
  Component,
  Fragment,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import ElimanationModal from '../../Components/ElimanationModal';
import UseLifeLineModal from '../../Components/UseLifeLineModal';
import {JSONtoForm} from '../../Constants/Functions';
import LinearGradient from 'react-native-linear-gradient';
import Label from '../../Components/Label';
import {
  EliminateQuizResult,
  EliminateQuizOptions,
  QuizOptions,
  QuizResult,
} from '../../Components';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios from 'axios';
import {
  heightConverter,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../Constants/Colors';
import socketIO from 'socket.io-client';
import ProgressCircle from 'react-native-progress-circle';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
import {CheckGameEnterStatus, GameShowWinners} from '../../redux/actions';
import WinnersModal from '../../Components/WinnersModal';
const MYServer = 'https://node-winjoyserver-deploy.herokuapp.com/';
const {width, height} = Dimensions.get('window');
let timer = () => {};
const BackgroundVideo = ({route, navigation}) => {
  //lives dispatch
  const dispatch = useDispatch();
  //gameshow Winners dispatch
  const dispatch2 = useDispatch();
  const dispatch3 = useDispatch();
  const userData = useSelector(state => state.app.userData);
  const totalLives = useSelector(state => state.app.totalLives);
  const [availLifeActivity, setAvailLifeActivity] = useState(false);
  const socket = socketIO(MYServer);
  const {uri, gameshowStatus, completed_questions} = route.params;
  const [selected, setSelected] = useState(null);
  const [buffer, setBuffer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [activityScreen, setActivityScreen] = useState(false);
  const [activity, setActivity] = useState(false);
  const [liveStream, setLiveStream] = useState(true);
  const [gameShowCheck, setGameShowCheck] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [check, setcheck] = useState(false);
  const [disableQuizOptions, setDisableQuizOptions] = useState(false);
  const [joinedUsers, setJoinedUsers] = useState(0);
  const answerId = useRef(null);
  const selectedAns = useRef(null);
  const answer = useRef(null);
  const questionRef = useRef([]);
  const questionIncrement = useRef(0);
  const ModalState = useRef();
  const userEliminate = useRef(false);
  const LifeLineModalState = useRef();
  const winnerModal = useRef();
  const [updatedAnswer, setUpdatedAnswer] = useState();
  const [activeQuestion, setActiveQuestion] = useState(1);
  const dispatchGameEnter = useDispatch();

  const backAction = () => {
    Alert.alert(
      'We are live!',
      "You can't use other features as we are currently live. Are you sure you want to quit WinJoy app?",
      [
        {
          text: 'Continue watching',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Quit', onPress: () => BackHandler.exitApp()},
      ],
    );
    return true;
  };
  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });

  const Questions = async () => {
    setActivityScreen(true);
    const Token = await EncryptedStorage.getItem('Token');
    const requestOptions = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    //alert(13123);
    await axios
      .get(
        `${Config.API_URL}/begin/game/questions/answers/list`,
        requestOptions,
      )
      .then(response => {
        let res = response.data;
        questionRef.current = res;
        setActivityScreen(false);
        setGameShowCheck(true);
        setTimeLeft(10);
        clearTimeout(timer);
        startTimer();
        setTimerFlag(true);
      });
  };

  useEffect(() => {
    dispatchGameEnter(CheckGameEnterStatus());
    if (completed_questions === 'started') {
      // userEliminate.current = true;
      Questions();
      //setActiveQuestion(completed_questions);
    }

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const DeductLive = async () => {
    setAvailLifeActivity(true);
    ///Check Result
    const Token = await EncryptedStorage.getItem('Token');
    const body = JSONtoForm({
      live_gameshow_id: questionRef.current[activeQuestion]?.live_gameshow_id,
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body,
    };
    await fetch(
      `${Config.API_URL}/deduct_lives/${questionRef.current[activeQuestion]?.live_gameshow_id}`,
      requestOptions,
    )
      .then(async response => response.json())
      .then(async res => {
        setAvailLifeActivity(false);

        if (res.message === 'Live availed successfully') {
          dispatch({
            type: types.TOTAL_LIVES,
            totalLives: res?.lives,
          });
          LifeLineModalState.current(false);
        } else {
          LifeLineModalState.current(false);
          ModalState.current(true);
        }
      });
  };
  const onPressOption = (sel, ans, ansId) => {
    setDisableQuizOptions(true);
    answerId.current = ansId;
    selectedAns.current = ans;
    setSelected(sel);
  };
  const onPressContinue = () => {
    ModalState.current(false);
    userEliminate.current = true;
  };
  const onPressContinueLifeLine = () => {
    ModalState.current(false);
    DeductLive();
  };
  const onPressNotNow = () => {
    LifeLineModalState.current(false);
    ModalState.current(true);
  };
  const updateAnswer = activeQ => {
    let ans = '';
    questionRef.current[activeQ]?.answer.map(item => {
      if (item.is_correct === 1) {
        ans = item.answer;
      }
    });
    setUpdatedAnswer(ans);
  };
  useEffect(() => {
    /* let cancel = false; */
    socket.on('sendShowCorrectAnswer', msg => {
      console.log('msg: ', msg);
      const activeQ = msg.activeQuestion;

      setGameShowCheck(true);
      setShowResult(true);
      if (!userEliminate.current) {
        SaveResponse(activeQ - 1);
      } else {
        updateAnswer(activeQ - 1);
      }
    });
    /*  return () => {
      cancel = true;
    }; */
  }, []);

  useEffect(async () => {
    socket.on('sendHideQuestion', msg => {
      setGameShowCheck(false);
    });
    socket.on('sendHideAnswer', msg => {});
    socket.on('sendEndShow', msg => {
      dispatch2(GameShowWinners());
      navigation.navigate('BottomTabStack', {screen: 'WINNERS'});
    });
    socket.on('sendCount', msg => {
      setJoinedUsers(msg);
    });
    socket.on('sendSwitchNextQuestion', msg => {
      /*  {
        console.log('msg', msg);
      } */
      let inc = msg.completed_question;
      {
        console.log('inc', inc);
      }
      setActiveQuestion(inc);
      answerId.current = null;
      setGameShowCheck(true);
      setDisableQuizOptions(false);
      setShowResult(false);
      setTimeLeft(10);
      clearTimeout(timer);
      startTimer();
    });
    socket.on('sendStartlivegameshow', msg => {
      Questions();
      //setActiveQuestion(completed_questions);
      console.log('sendStart');
    });

    socket.on('sendShowWinners', msg => {
      dispatch3(GameShowWinners());
      winnerModal.current(true);
    });
    socket.on('sendHideWinners', msg => {
      winnerModal.current(false);
    });
  }, []);

  const SaveResponse = useCallback(async activeQ => {
    setActivity(true);

    let ans = '';
    questionRef.current[activeQ]?.answer.map(item => {
      if (item.is_correct === 1) {
        ans = item.answer;
      }
    });
    answer.current = ans;

    if (answerId.current === null || answerId.current === undefined) {
      if ((userEliminate.current = true)) ModalState.current(false);
      else ModalState.current(true);
    } else {
      console.log('activeQ', activeQ);
      console.log('activeQ qq', questionRef.current[activeQ]);
      const Token = await EncryptedStorage.getItem('Token');
      const body = JSONtoForm({
        question: questionRef.current[activeQ]?.id,
        answer: answerId.current,
        live_gameshow_id: questionRef.current[activeQ]?.live_gameshow_id,
      });
      console.log('body: ', body);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body,
      };
      //console.log('body', body);
      await fetch(`${Config.API_URL}/save/user/response`, requestOptions)
        .then(async response => response.json())
        .then(async res => {
          {
            console.log({quizres: res});
          }
          setActivity(false);
          console.log('res:', res);
          if (res.status === 'success') {
            if (res.message === 'Congrats!! move to next question') {
              setActivity(false);
            }
          } else if (res.status === 'error') {
            if (
              res.message === "Wrong Answer!! Don't loose hope try next time"
            ) {
              setTimeout(() => {
                if (activeQ <= 4) {
                  LifeLineModalState.current(true);
                } else {
                  ModalState.current(true);
                }
              }, 1500);
            } else {
              alert(res.message);
            }
          }
          setActivity(false);
          setSelected(null);
        })
        .catch(e => {
          setActivity(false);
          alert('Error', e);
        });
    }
  }, []);

  return (
    <View style={{backgroundColor: 'black'}}>
      <Wrapper>
        <View style={styles.gradientView}>
          {liveStream ? (
            <Video
              source={{
                uri: 'https://c75a7e79204e539d.mediapackage.us-east-1.amazonaws.com/out/v1/c09d0b5beca54ffcb2e4d920b465d589/index.m3u8',
              }}
              hls={true}
              paused={false}
              style={styles.backgroundVideo}
              resizeMode={'cover'}
            />
          ) : (
            <ActivityIndicator size="large" color={'#ffffff'} top={300} />
          )}

          {activityScreen ? (
            <ActivityIndicator size="large" color={'black'} top={300} />
          ) : (
            <>
              <View style={{margin: 15}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="person" size={25} color="#ffffff" />
                  <Text style={{fontSize: 20, color: '#ffffff'}}>
                    {joinedUsers}
                  </Text>
                </View>
              </View>
              <ImageBackground
                resizeMode="center"
                style={{
                  width: 60,
                  height: 50,
                  top: height * 0.05,
                  right: 10,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../../assets/imgs/pinkHeart.png')}>
                <Text
                  style={{
                    color: '#E7003F',
                    fontFamily: 'Axiforma-SemiBold',
                    fontSize: RFValue(15),
                  }}>
                  {totalLives ? totalLives : 0}
                </Text>
              </ImageBackground>

              {gameShowCheck ? (
                userEliminate.current ? (
                  <LinearGradient
                    style={styles.backgroundImage}
                    colors={[
                      'rgba(128,0,128,0)',
                      'rgba(128,0,128,0)',
                      '#420e92',
                      '#420e92',
                    ]}>
                    {showResult ? (
                      <View style={styles.quizView}>
                        <Label
                          primary
                          font={26}
                          bold
                          dark
                          style={{color: '#FFFF13'}}>
                          Time's Up
                        </Label>
                        <Label primary bold dark style={styles.questionTitle}>
                          Result
                        </Label>
                        <Label primary bold dark style={styles.questionTitle}>
                          {questionRef.current[activeQuestion]?.question}
                        </Label>

                        <EliminateQuizResult
                          options={questionRef.current[activeQuestion]?.answer}
                          answer={updatedAnswer}
                          activity={activity}
                          optionSelected={selected}
                        />
                      </View>
                    ) : (
                      <View style={styles.quizView}>
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ProgressCircle
                            percent={(timeLeft * 100) / 10}
                            radius={35}
                            borderWidth={6}
                            color={timeLeft < 5 ? 'red' : '#490d8e'}
                            shadowColor="#d3d9dd"
                            bgColor="#fff">
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Axiforma-SemiBold',
                                  fontSize: 12,
                                  color: '#E7003F',
                                  lineHeight: 12,
                                }}>
                                {timeLeft <= 0 ? "Time's Up" : timeLeft}
                              </Text>
                            </View>
                          </ProgressCircle>
                        </View>
                        <Label primary bold dark style={styles.questionTitle}>
                          Question {activeQuestion}
                        </Label>
                        <Label primary bold dark style={styles.questionTitle}>
                          {questionRef.current[activeQuestion - 1]?.question}
                        </Label>

                        <EliminateQuizOptions
                          options={
                            questionRef.current[activeQuestion - 1]?.answer
                          }
                          optionSelected={selected}
                          onPressOption={onPressOption}
                          disableOption={true}
                        />
                      </View>
                    )}
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    style={styles.backgroundImage}
                    colors={[
                      'rgba(128,0,128,0)',
                      'rgba(128,0,128,0)',
                      '#420e92',
                      '#420e92',
                    ]}>
                    {showResult ? (
                      <View style={styles.quizView}>
                        <Label
                          primary
                          font={26}
                          bold
                          dark
                          style={{color: '#FFFF13'}}>
                          Time's Up
                        </Label>
                        <Label primary bold dark style={styles.questionTitle}>
                          Result
                        </Label>
                        <Label primary bold dark style={styles.questionTitle}>
                          {questionRef.current[activeQuestion - 1]?.question}
                        </Label>

                        <QuizResult
                          options={
                            questionRef.current[activeQuestion - 1]?.answer
                          }
                          answer={answer.current}
                          answerByUser={selectedAns.current}
                          activity={activity}
                        />
                      </View>
                    ) : (
                      <View style={styles.quizView}>
                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ProgressCircle
                            percent={(timeLeft * 100) / 10}
                            radius={35}
                            borderWidth={6}
                            color={timeLeft < 5 ? 'red' : '#490d8e'}
                            shadowColor="#d3d9dd"
                            bgColor="#fff">
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Axiforma-SemiBold',
                                  fontSize: 12,
                                  color: '#E7003F',
                                  lineHeight: 12,
                                  textAlign: 'center',
                                }}>
                                {timeLeft <= 0 ? "Time's Up" : timeLeft}
                              </Text>
                            </View>
                          </ProgressCircle>
                        </View>
                        <Label primary bold dark style={styles.questionTitle}>
                          Question {activeQuestion}
                        </Label>
                        <Label
                          primary
                          font={14}
                          bold
                          dark
                          style={{color: '#ffff', lineHeight: 28}}>
                          {questionRef.current[activeQuestion - 1]?.question}
                        </Label>

                        <QuizOptions
                          options={
                            questionRef.current[activeQuestion - 1]?.answer
                          }
                          optionSelected={selected}
                          onPressOption={onPressOption}
                          disableOption={
                            timeLeft <= 0 || disableQuizOptions ? true : false
                          }
                        />
                      </View>
                    )}
                  </LinearGradient>
                )
              ) : null}
            </>
          )}
        </View>
      </Wrapper>
      <ElimanationModal
        ModalRef={ModalState}
        details
        onPressContinue={onPressContinue}
      />
      <UseLifeLineModal
        ModalRef={LifeLineModalState}
        details
        onPressContinueLifeLine={onPressContinueLifeLine}
        onPressNotNow={onPressNotNow}
        availLifeActivity={availLifeActivity}
      />
      <WinnersModal ModalRef={winnerModal} details onPressContinue={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    width: '100%',
    position: 'absolute',
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    borderColor: '#ffffff',
  },
  quizView: {
    height: height * 0.6,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  backgroundImage: {
    height: height,
    width: '100%',
    flex: 1,
    position: 'absolute',
  },
  gradientView: {
    height: height,
    width: '100%',
  },
  scrollViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
  },
  homeView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Margin: {
    marginTop: height * 0.85,
    width: width * 0.85,
    backgroundColor: '#2B1751',
  },
  Container: {
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  containerBack: {
    flexDirection: 'row',
    width: widthConverter(90),
    marginRight: widthConverter(-30),
  },
  text: {
    fontFamily: 'Axiforma-Regular',
    fontSize: RFValue(14),
    color: Colors.LABEL,
    left: 4,
  },
  questionTitle: {
    color: '#ffff',
    lineHeight: 28,
    fontSize: RFValue(14),
  },
});

// styled-component

export const Wrapper = styled.View`
  justify-content: space-between;

  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 100px;
  width: 100px;
  height: 100px;
`;
export const TextDescription = styled.Text`
  letter-spacing: 3;
  color: #f4f4f4;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
export const Title = styled.Text`
  color: #f4f4f4;
  margin: 50% 0px 20px;
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
`;
const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${props => (props.transparent ? 'transparent' : '#f3f8ff')};
 padding:15px;
border:${props => (props.transparent ? '1px solid #f3f8ff ' : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${props => (props.transparent ? '#f3f8ff ' : '#666')};
`;

export const Button = ({onPress, color, ...props}) => {
  return (
    <StyledButton {...props}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};
export default BackgroundVideo;