import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
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
import NotFoundPurchase from '../../Components/NotFoundPurchase';
import Background from '../../Components/Background';
import Label from '../../Components/Label';
import Header from '../../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Images} from '../../Constants/Index';
import Section from '../../Components/Section';
import UserInfo from '../../Components/UserInfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import NotFound from '../../Components/NotFound';
import {FormatNumber, wait} from '../../Constants/Functions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

const {width, height} = Dimensions.get('window');

const Orders = ({navigation}) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let isActive = true;
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
        await fetch(`${Config.API_URL}/my/orders`, requestOptions)
          .then(async response => response.json())
          .then(res => {
            if (!isActive) return;
            if (res.message === 'My order history') {
              setData(res.data);
            }
          });
      }
    };
    check();

    return () => (isActive = false);
  });
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails', {item})}>
        <View
          style={{
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            borderRadius: 10,
            padding: 10,
            marginVertical: 6,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 4,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: '#420E92',
                  fontSize: 13,
                  fontFamily: 'Axiforma-SemiBold',
                }}>
                {item.order_reference}
              </Text>
              <Text style={{color: '#000000', fontSize: 13}}>
                {dayjs(item.created_at).format('MMMM DD, YYYY')}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 10,
                  fontFamily: 'Axiforma-Regular',
                }}>
                Total:
              </Text>
              <Text
                style={{
                  color: '#E61C54',
                  fontSize: 13,
                  fontFamily: 'Axiforma-Bold',
                }}>
                {' '}
                AED {item.total}
              </Text>
            </View>
          </View>
          {item.products ? (
            <>
              {item.products.map(productItem => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      position: 'relative',
                      flex: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: '#DCE1E3',
                      paddingVertical: 8,
                    }}>
                    <View style={{width: 40}}>
                      <ImageBackground
                        source={{uri: productItem?.product?.image}}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          overflow: 'hidden',
                        }}
                      />
                    </View>
                    <View style={{paddingLeft: 10}}>
                      <Text style={{color: '#000000', fontSize: 13}}>
                        {productItem?.product?.title}
                      </Text>
                      <Text
                        style={{
                          color: '#E61C54',
                          fontSize: 13,
                          fontFamily: 'Axiforma-Bold',
                        }}>
                        AED{' '}
                        {FormatNumber(
                          +productItem?.product?.price?.toLocaleString(),
                        )}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#420E92'}}>
      <ScrollView style={{backgroundColor: '#f6f1f3'}}>
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
          {/*  <View style={styles.MainTop}>
            <UserInfo style={styles.header} OwnUser popup status />
          </View> */}
          <View>
            <Label
              white
              bold
              headingtype="h3"
              style={{marginVertical: 10, color: '#D9FE51'}}>
              Purchases
            </Label>
          </View>
        </LinearGradient>

        {Data === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <>
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={i => i}
              ListEmptyComponent={
                <NotFoundPurchase
                  text="Cart"
                  onPress={() => navigation.navigate('DealsJoy')}
                />
              }
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              contentContainerStyle={{
                paddingHorizontal: 11,
                marginTop: 5,
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    // height: height * 0.15,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  Section: {
    marginTop: 10,
    padding: 10,
  },
  SectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    width: '100%',
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
export default Orders;
