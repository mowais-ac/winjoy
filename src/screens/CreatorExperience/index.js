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
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../../Components/Header';
import {
  CreatorExperienceCard,
  FanJoyCard,
  SecondExperienceCard,
  TrendingCards,
  WjBackground,
} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';
import Config from 'react-native-config';
import {strings} from '../../i18n';
import {Avatar} from 'react-native-elements';
import ExperienceCelebrityModal from '../../Components/ExperienceCelebrityModal';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {CreatorExperienceList, ExperienceDetals} from '../../redux/actions';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const ModalState = useRef();

  const experience_id = route?.params?.experience_id;

  const creatorId = useSelector(state => state.app.creatorId);
  const data = useSelector(state => state.app.creatorPageData);
  const creatorExpList = useSelector(state => state.app.creatorExpList);
  useEffect(() => {
    console.log('creatorExpList', creatorExpList);
    dispatch(CreatorExperienceList(experience_id));
  }, []);

  const onPressContinue = () => {
    ModalState.current(false);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{height: height}}>
          <Image
            source={{uri: creatorExpList?.experience?.cover_photo}}
            style={styles.mainView}
          />
          <Header style={{top: 0, position: 'absolute', width: width}} />
          <View style={{marginTop: height * 0.069}}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: RFValue(22),
                fontFamily: 'Axiforma-Bold',
                textAlign: 'center',
              }}>
              {creatorExpList?.experience?.title}
            </Text>
            <Text
              style={{
                color: '#ffffff',
                fontSize: RFValue(16),
                fontFamily: 'Axiforma-Regular',
                paddingHorizontal: 25,
                textAlign: 'center',
              }}>
              {creatorExpList?.experience?.short_desc}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              marginTop: height * 0.09,
            }}>
            <FlatList
              data={creatorExpList?.experience_celebrities}
              numColumns={2}
              //style={{paddingLeft: 8}}
              renderItem={({item}) => (
                <CreatorExperienceCard
                  // onPress={() => navigation.navigate('CreatorExperience')}
                  imageUrl={
                    'https://winjoy-assets.s3.amazonaws.com/experiences/experience-1.jpg'
                  }
                  title={item?.title}
                  description={item?.description}
                  price={item?.price}
                />
              )}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{}}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={item => item.id}
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
