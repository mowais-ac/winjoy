// import {
//     widthPercentageToDP,
//     heightPercentageToDP,
//   } from '../../Helpers/Responsive';
//   import {RFValue} from 'react-native-responsive-fontsize';

import { RFValue } from 'react-native-responsive-fontsize';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  input: {
      width:'100%',
  
    height: '100%',
    marginTop: '1%',
    // fontFamily: 'Europa',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#A381FF',
  },
  text:{
    color:'#E7003F',
    fontFamily:'Axiforma-Bold',
    fontSize:RFValue(16)
  }
});
