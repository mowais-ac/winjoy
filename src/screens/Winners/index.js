import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import {
  LifeCard,
  LifeCardRefferAndVideo,
  TopTab,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import GameShow from './GameShow';
import {RFValue} from 'react-native-responsive-fontsize';
import BuyLifeLineModal from '../../Components/BuyLifeLineModal';
import WatchAddModal from '../../Components/WatchAddModal';
import RefferLifeLineModal from '../../Components/RefferLifeLineModal';
import BuyLifeCongrats from '../../Components/BuyLifeCongrats';
import {GameShowWinners, LuckyDrawWinnersAPI} from '../../redux/actions';
import LuckyDraw from './LuckyDraw';
import {useFocusEffect} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const livePlans = useSelector(state => state.app.livePlans);
  const gameShowWinners = useSelector(state => state.app.gameShowWinners);
  const luckyDrawWinners = useSelector(state => state.app.luckyDrawWinners);
  const loading = useSelector(state => state.event.loading);
  const ModalState = useRef();
  const AddModalState = useRef();
  const RefferModalState = useRef();
  const SucessModalState = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const [amount, setAmount] = useState();
  const [video, setVideo] = useState();
  const [lives, setLives] = useState();
  const [idVideoAdd, setIdVideoAdd] = useState();
  const [id, setId] = useState();
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const routeSelected = route?.params?.selected;
  useEffect(() => {
    console.log('loading', loading);
    //  dispatch(getLiveShowPlans());
    dispatch(GameShowWinners());
    dispatch2(LuckyDrawWinnersAPI());
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (routeSelected) {
        setSelected(routeSelected);
      }
    }, [routeSelected]),
  );

  const onPressFirst = () => {
    setSelected(0);
  };
  const onPressSecond = () => {
    setSelected(1);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}>
        <Header
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
            width: '100%',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <ScrollView
          onScroll={e => {
            setHeaderValue(e.nativeEvent.contentOffset.y);
          }}>
          <WjBackground
            style={{
              height: height * 0.24,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <View
            style={{
              marginTop: height * 0.09,
              height: height * 0.15,
              alignItems: 'center',
            }}>
            <View style={{marginBottom: height * 0.01}}>
              <Text style={[styles.headerText]}>Winners</Text>
            </View>
            <TopTab
              onPressFirst={onPressFirst}
              onPressSecond={onPressSecond}
              selected={selected}
              firstText={'Game Show'}
              secondText={'Lucky Draw'}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            {loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <>
                {selected === 0 ? (
                  <GameShow
                    lastWinners={gameShowWinners?.winners}
                    pastWinners={gameShowWinners?.pastWinners}
                    navigation={navigation}
                  />
                ) : (
                  <LuckyDraw
                    winnersLastGame={luckyDrawWinners.winners}
                    navigation={navigation}
                  />
                )}
              </>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
