







import { View, Text, ActivityIndicator,Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Loading(props) {

    

  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />  
      {/* <Image {...props} style={{width:hp(15),height:hp(15)}} source={require("../../assets/images/loder.gif")}/> */}
    </View>
  )
}