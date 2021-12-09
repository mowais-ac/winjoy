// import React from 'react'; 
// import { Text, View, Image,FlatList } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { HomeCard, ButtonWithIcon,TriviaAvatar,ProductViewCard } from '../../Components';
// import AvatarBtn from "../../Components/AvatarBtn";
// import { widthConverter, widthPercentageToDP } from '../../Components/Helpers/Responsive';
// import styles from './style'
// let name = "waqar hussain"
// const index = ({navigation}) => {
//   return (
//     <ScrollView>
//        <LinearGradient
//         colors={["#E7003F","#420E92"]}
//         style={styles.mainView}
//       >

//         <Image
//           style={styles.image}
//           source={require('../../assets/imgs/winImg.png')}
//           resizeMode={"stretch"}
//         />

//         <View
//           style={styles.yellowBtn} 
//         >

//             <AvatarBtn
//               picture={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
//               // id={userInfo?.id}
//               name={(name.slice(0, 1) + name.slice(0, 1))}
//               size={45}
//               font={28}

//             />

//           <View style={styles.btnTextView}>
//             <Text style={[styles.text,{color:'#000000',fontSize: RFValue(16)}]}>Penny N. Damian</Text>
//           </View>
//         </View>
//         <HomeCard
//             onPress={() => navigation.navigate("Landing")}
//           style={{ marginTop: 10, }}
//         />
//         <View style={{flexDirection:'row', width: widthPercentageToDP("85%"),justifyContent:'space-between',marginTop:12}}>
//           <Text style={[styles.text,{color:'#FFFF13',textAlign:'center'}]}>
//             TRIVIA{'\n'}NIGHT
//           </Text>
//           <Text style={[styles.text,{color:'#FFFF13',textAlign:'center'}]}>
//             DEALZ{'\n'}JOY
//           </Text>
//           <Text style={[styles.text,{color:'#FFFF13',textAlign:'center'}]}>
//             GRAND{'\n'}PRIZE
//           </Text>
//         </View>
//         <ButtonWithIcon
//        //   onPress={() => }
//           btnStyle={{ marginTop: 10, }}
//           text={"What is WinJoy"}
//           activity={false}
//         />
//         <Text style={[styles.text,{marginTop:10}]}>Shop to Win</Text> 
//         <FlatList
//           data={[1,2,3]}
//           horizontal={true}
//           renderItem={
//             ({ item, index }) => {
//               return (
//                 <ProductViewCard
//                   title={true}
//                   fullname={"Waqar"}
//                   ammount={"AED 20,000"}
//                   profile_image={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
//                 />
//               )
//             }
//           }
//         />
//          <Text style={[styles.text,{marginTop:10}]}>Winners</Text> 
//         {/* <FlatList
//           data={[1,2,3]}
//           horizontal={true}
//           contentContainerStyle={{ 
//             width: widthPercentageToDP("93%"),
//             justifyContent:'space-between'
//           }}
//           renderItem={
//             ({ item, index }) => {
//               return (

//                 <AvatarBtn
//                 picture={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
//                 // id={userInfo?.id}
//                 name={(name.slice(0, 1) + name.slice(0, 1))}
//                 size={90}
//                 font={28}
//               />
//               )
//             }
//           }
//         /> */}
//         {/* <Image
//               style={{ 
//                 width: widthPercentageToDP("93%"),
//                 height: 90,
//                // borderRadius: widthConverter(20),
//               }}
//               source={require('../../assets/imgs/winnerBanner.jpg')}
//             />
//          <Image
//               style={{
//                 width: widthPercentageToDP("50%"),
//                 height: 50,
//                 borderRadius: widthConverter(20),
//               }}
//               source={{
//                 uri: 'https://reactnative.dev/img/tiny_logo.png',
//               }}
//             /> */}
//       </LinearGradient>
//     </ScrollView>
//   )
// }
// export default index;
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text
} from "react-native";
import UpdateCoins from "../../redux/actions/Coins-action";
import { connect } from "react-redux";
import { wait } from "../../Constants/Functions";
import LoaderImage from "../../Components/LoaderImage";
import Label from "../../Components/Label";
import { Colors } from "../../Constants/Index";
import { useFocusEffect } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import HomeBottomList from "../../Components/HomeBottomList";
import {
  heightConverter,
  heightPercentageToDP,
  widthConverter,
} from "../../Components/Helpers/Responsive";
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import AvatarBtn from "../../Components/AvatarBtn";
import { RFValue } from "react-native-responsive-fontsize";
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './style';
import { HomeCard, ButtonWithIcon,TriviaAvatar,ProductViewCard, TriviaNightCard } from '../../Components';
let name = "waqar hussain"
function ClosingSoon({ item }) {
  let progress = item.updated_stocks
    ? (item?.updated_stocks / item?.stock) * 100
    : 0;

  const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${JSON.parse(item.image)[0]
    }`;
  return (
    <View
      style={{
        width: width * 0.38,
        height: heightConverter(190),
        backgroundColor: "#ffffff",
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
      }}
    >
      <LoaderImage
        source={{
          uri: ImgUrl.replace("http://", "https://"),
        }}
        style={{
          width: 120,
          height: 90,
        }}
        resizeMode="contain"
      />
      <Label primary font={11} dark style={{ color: "#000000" }}>
        Get a chance to
        <Label
          notAlign
          bold
          primary
          font={11}
          bold
          style={{ color: "#E7003F" }}
        >
          {" "}
          WIN
        </Label>
      </Label>
      <Label bold font={11} dark style={{ color: "#000000", width: "110%" }}>
        {item.luckydraw.gift_title}
      </Label>
      {/* <Label  bold font={11} dark style={{ color: "#000000", }}>
      Edition
      </Label> */}
      <View style={styles.containerprogressBar}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#E7003F", "#420E92"]}
          style={[styles.LinerGradientProgrees, { width: `${progress}%` }]}
        />
        <View style={styles.GreybarWidth} />
      </View>
      <Label primary font={10} style={{ color: "#877C80", top: 4 }}>
        {item.updated_stocks ? item.updated_stocks : 0} sold out of {item.stock}
      </Label>
    </View>
  );
}
const index = (props) => {
  const { Coins, navigation } = props;

  const [Banners, setBanners] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [productList, setProductList] = React.useState([]);
  const [winnerData, setWinnerData] = useState([]);
  const onRefresh = React.useCallback(() => {
    // setBanners(null);
    setRefreshing(true);
    UpdateCoinsOnce();
    wait(500).then(() => setRefreshing(false));
  }, []);
  const UpdateCoinsOnce = () => {
    initialLoad();
    props.UpdateCoins(UpdateCoins());
  };
  const initialLoad = () => {
    const check = async () => {
      const Token = await EncryptedStorage.getItem("Token");
      const requestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      };
      // alert(13123);
      await axios
        .get(`${Config.API_URL}/banners`, requestOptions)
        .then((response) => {
          let res = response.data;
          if (res.status && res.status.toLowerCase() === "success") {
            setBanners(res.data);
          }
        });
    };

    check();
  };
  const ProductList = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);
    await axios
      .get(`${Config.API_URL}/products/list`, requestOptions)
      .then((response) => {
        let res = response.data;
        let arr = [];
        if (res.status && res.status.toLowerCase() === "success") {
          res.data.map((item) => {
            console.log("item", item);
            item.map((v, i) => {
              arr.push(v);
            });
          });

          setProductList(arr);
        }
      });
  };
  const PastWinner = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);

    await axios.get(`${Config.API_URL}/luckydraw/winner`, requestOptions).then(response => {
      let res = response;
      setWinnerData(res?.data[0])
    });

  }
  useFocusEffect(
    React.useCallback(() => {
      UpdateCoinsOnce();
      initialLoad();
      ProductList();
      PastWinner();
    }, [])
  );

  return (
    <ScrollView
      style={{ backgroundColor: "#f6f1f3" }}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <LinearGradient colors={["#5B0C86", "#E7003F"]} style={styles.mainView}>


        {Banners === null ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <LoaderImage
            source={{ uri: Banners[1].replace('http://', 'https://') }}
            style={styles.ShoppingBanner}
            resizeMode="stretch"
          />
        )}
        <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />

        {/* <Label
          notAlign
          primary
          font={16}
          dark
          style={{
            color: "#ffff",
            marginLeft: width * 0.04,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Closing Soon
        </Label> */}
        {/* <FlatList
          horizontal={true}
          style={{ marginLeft: 1, minHeight: 50 }}
          contentContainerStyle={{
            alignSelf: "flex-start",
            paddingRight: width * 0.04,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={productList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SimpeStackScreen",{screen:"ProductDetail",params:item})
              }
            >
              <ClosingSoon props={props} index={item.index} item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
        /> */}
        <View
          style={styles.yellowBtn}
        >

          <View style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 45 }}>
            <AvatarBtn
              picture={"https://abdulrahman.fleeti.com/save_file/uploads/provider/user/5bf637c8_60262ff8dbde39.10627959.jpg"}
              // id={userInfo?.id}
              name={(name.slice(0, 1) + name.slice(0, 1))}
              size={50}
              font={28}
            />
          </View>

          <View style={styles.btnTextView}>
            <Text style={[styles.text, { color: '#fff', fontSize: RFValue(16) }]}>Penny N. Damian</Text>
            <Text style={[styles.text, { color: '#fff', fontSize: RFValue(16) }]}>Your balance: <Text style={[styles.text, { color: '#ffff00', fontSize: RFValue(16) }]}>AED 20,000</Text></Text>
          </View>
          <Entypo name="chevron-thin-right" size={22} color="#fff" style={{ marginTop: 6.5, marginRight: 6 }} />
        </View>
        {/* <View
          style={{
            height: 1,
            width: width * 1,
            backgroundColor: "#E74F7D",
            marginTop: 13,
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("TabsStack", { screen: "Product" })}>
          <Label
            primary
            font={16}
            bold
            dark
            style={{
              color: "#ffffff",
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            View All Prizes
          </Label>
        </TouchableOpacity>
        <View style={{ marginBottom: height * 0.01 }} /> */}
      </LinearGradient>
      <HomeCard
        onPress={() => navigation.navigate("Landing")}
        style={{ marginTop: 10,marginLeft:13 }}
      /> 
        <Label
          notAlign
          primary
          font={16}
          dark
          style={{
            color: "#E7003F",
            marginLeft: width * 0.04,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Closing Soon
        </Label>
       <FlatList
          horizontal={true}
          style={{ marginLeft: 1, minHeight: 50 }}
          contentContainerStyle={{
            alignSelf: "flex-start",
            paddingRight: width * 0.04,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={productList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SimpeStackScreen",{screen:"ProductDetail",params:item})
              }
            >
              <ClosingSoon props={props} index={item.index} item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
        />
      {/* <HomeBottomList data={winnerData} /> */}
      <FlatList
          horizontal={true}
          style={{ marginLeft: 1, minHeight: 50 }}
          contentContainerStyle={{
            marginTop:25,
            marginLeft:10,
            alignSelf: "flex-start",
            paddingRight: width * 0.04,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={productList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SimpeStackScreen",{screen:"ProductDetail",params:item})
              }
            >
              <TriviaNightCard props={props} index={item.index} item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
        />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};



const mapStateToProps = (state) => {
  const { Coins } = state;
  return {
    Coins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateCoins: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
