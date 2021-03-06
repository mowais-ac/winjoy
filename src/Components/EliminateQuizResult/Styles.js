import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../Constants/Colors';

const { StyleSheet, Dimensions } = require('react-native');
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  optionsViewMain: {
    position: 'absolute',
    top: heightConverter(150), 
    left: widthPercentageToDP("7%")


  },
  optionView: {
    width: widthPercentageToDP("85%"),
    height: heightPercentageToDP("7%"),       /// 
    justifyContent: 'space-between',
    alignItems:'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25, marginTop: 15,
    flexDirection:'row'
    
  },
  optionsText: {
    fontSize: RFValue(13), color: "#0032B5",
   // lineHeight: heightConverter(30),
    textAlign: 'left',
    fontFamily: "Axiforma-Regular",
  },
  Margin: {
   
    width: width * 0.85,
    backgroundColor: '#e7003f',
    height: heightPercentageToDP("7%"),
    borderRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
  },
});
