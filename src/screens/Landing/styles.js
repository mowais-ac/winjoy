import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Components/Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  image: {
    width: width,
    height: height * 0.3,
  },
  yellowBtn: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 18,
  },
  secondHeaderMiddleView: {
    width: width * 0.7,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  avatarView: {
    //position: 'absolute',

    width: widthConverter(62),
    height: widthConverter(62),
    borderRadius: widthConverter(62),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  btnHeadingView: {
    width: width * 0.7,
    marginLeft: widthConverter(20),
  },
  Heading: {
    fontFamily: 'Axiforma-Bold',
    color: '#fff',
    fontSize: RFValue(20),
  },
  ShoppingBanner: {
    width: width,
    height: height * 0.42,
    // marginTop: height * 0.015,
    alignSelf: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bgImageUpperView: {
    width: width * 1.01,
    height: height * 0.3,
    backgroundColor: 'rgba(231,0,63,0.15)',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingBottom: 10,
  },
  containerprogressBarWrap: {
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  containerprogressBar: {
    width: '100%',
    marginBottom: 2,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 6,
    position: 'relative',
    backgroundColor: '#EADFE3',
  },
  LinerGradientProgrees: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: '100%',
  },
  mainView: {
    //  height: height*0.48,

    width: width,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'white',
  },
  dot: {
    margin: 3,
    color: 'black',
  },
  avatarBannerView: {
    alignItems: 'center',
    backgroundColor: '#f05b31',
    borderRadius: widthConverter(10),
    height: height * 0.15,
    width: widthPercentageToDP('95%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatarBanner: {
    // width: "95%",
    // height: 130,
    position: 'absolute',
    overlayColor: 'white',
    alignItems: 'center',
    borderRadius: widthConverter(10),
    height: 145,
    width: widthPercentageToDP('95%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  Margin: {
    height: height * 0.035,
    width: width * 0.3,
    backgroundColor: '#ffffff',
  },
  wrap: {
    width: width,
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
