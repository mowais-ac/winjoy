import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Text,
  ImageBackground,
} from 'react-native';

import Background from '../../Components/Background';
import SafeArea from '../../Components/SafeArea';
import Label from '../../Components/Label';
import Header from '../../Components/Header';

import {Colors, Images} from '../../Constants/Index';
import Section from '../../Components/Section';
import UserInfo from '../../Components/UserInfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import NotFound from '../../Components/NotFound';
import {FormatNumber, wait} from '../../Constants/Functions';

import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const Entries = ({navigation}) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    check();
    wait(500).then(() => setRefreshing(false));
  }, []);

  const check = async () => {
    if (Data === null) {
      const Token = await EncryptedStorage.getItem('Token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      };
      await fetch(`${Config.API_URL}/luckydraw_winner_list`, requestOptions)
        .then(async response => response.json())
        .then(res => {
          {
            console.log({winnerlist: res.data});
          }
          setData(res.data);
        });
    }
  };
  useEffect(() => {
    check();
  }, []);
  const renderItem = ({item, i}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails', {item})}
        activeOpacity={0.8}>
        <View
          style={{
            marginTop: 14,
            width: 33,
            height: 33,
            marginLeft: 286,
            zIndex: 100,
            position: 'absolute',
            borderRadius: 100,
            backgroundColor: '#c7dfe8',
          }}
        />
        <View
          style={{
            width: 33,
            height: 33,
            marginLeft: 286,
            zIndex: 100,
            position: 'absolute',
            borderRadius: 100,
            marginTop: 193,
            backgroundColor: '#c7dfe8',
          }}
        />
        {/*     <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{
            height: 215,
            alignItems: 'center',
            flexDirection: 'row',
            marginVertical: 10,
          }}> */}

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f8d7e8', '#c7dfe8']}
          style={{
            height: 240,
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <View
            style={{
              backgroundColor: '#ebe9e8',
              width: '75%',
              height: 180,
              borderRadius: 20,
              margin: 10,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 30, height: 30, margin: 5}}
                source={require('../../assets/imgs/newlogo.png')}
              />
              <Text
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                WIN
                <Text style={{color: 'purple', fontWeight: 'bold'}}>JOY</Text>
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 18,
                  //textAlign: 'center',
                  fontSize: 18,
                }}>
                {item?.entry_code}
              </Text>
            </View>
            <Text
              style={{
                color: 'purple',
                fontWeight: '600',
                textAlign: 'center',
                lineHeight: 20,
                paddingHorizontal: 10,
              }}>
              THIS COUPON GIVES YOU A CHANCE TO ENTER THE LUCKY DRAW
            </Text>
            <View
              style={{
                color: 'black',
                borderWidth: 0.7,
                width: '80%',
                marginLeft: 25,
                //marginTop: 10,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                textAlign: 'center',
                lineHeight: 20,
              }}>
              {item?.lucky_draw?.created_at
                ? dayjs(item?.lucky_draw?.created_at).format(
                    'dddd, MMMM D YYYY',
                  )
                : NAN}
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                textAlign: 'center',
                lineHeight: 20,
              }}>
              Good luck!
            </Text>
          </View>

          <View
            style={{
              marginTop: 5,
              backgroundColor: 'red',
              height: 85,
              borderRadius: 20,
              flexDirection: 'column',
              alignItems: 'center',
              width: '47%',
              transform: [{rotate: '-90deg'}],
              marginStart: -66,
              paddingVertical: 15,
            }}>
            <Text style={{color: '#ffff', fontWeight: '700', lineHeight: 25}}>
              COUPON TOWN
            </Text>
            <Text
              numberOfLines={5}
              style={{
                color: 'black',
                fontWeight: '700',
                lineHeight: 25,
              }}>
              {item?.lucky_draw?.name}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#420E92', '#E7003F']}
        style={{
          height: 'auto',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Header />
        <View style={styles.MainTop}>
          <UserInfo style={styles.header} OwnUser popup status />
        </View>
        <View style={{marginVertical: 5}}>
          <Label bold headingtype="h2">
            Tickets
          </Label>
        </View>
      </LinearGradient>

      {Data === null ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <FlatList
          data={Data}
          // ListHeaderComponent={
          //   <View>
          //     {Data?.length >= 1 && (
          //       <Label primary bold headingtype="h2">
          //         Tickets
          //       </Label>
          //     )}
          //   </View>
          // }
          renderItem={renderItem}
          keyExtractor={i => i}
          ListEmptyComponent={
            <View style={{marginVertical: 5}}>
              <Label dark bold headingtype="h1" style={styles.Heading}>
                No Tickets found!
              </Label>
              <Label dark style={styles.Info}>
                Sorry, we don’t have enough data to show you right now. Please
                check again later.
              </Label>
            </View>
          }
          // ItemSeparatorComponent={() => {
          //   return (
          //     <View
          //       style={{
          //         color: '#e6e3e3',
          //         borderWidth: 1,
          //         width: '100%',
          //       }}
          //     />
          //   );
          // }}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          // contentContainerStyle={{}}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    // height: height * 0.17,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  ImageView: {
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    width: width * 0.22,
    height: height * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  Image: {
    height: height * 0.1,
    resizeMode: 'contain',
  },
  Heading: {
    marginTop: height * 0.02,
    color: 'black',
  },
  Info: {
    marginTop: height * 0.01,
    width: width * 0.8,
    lineHeight: height * 0.025,
    color: 'black',
  },
  TextView: {},
  LessMargin: {
    marginTop: height * 0.003,
  },
});
export default Entries;
