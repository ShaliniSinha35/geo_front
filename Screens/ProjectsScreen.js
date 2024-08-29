import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  BackHandler,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import Header from "../Components/Header";
import moment from "moment-timezone";
import axios from 'axios'
import { useAuth } from './AuthContext'

const ProjectsScreen = ({navigation}) => {

  const route= useRoute()



  const {employeeId} = useAuth()

  const [projects,setProjects] = useState(route.params.project)

  const [imgArray,setImageArray]= useState([])

  const getImageDetails = async()=>{


    try{
      const res= await axios.get(`https://pmksybihar.info/geo/imageDetail`, {
        params: {
            pid: projects.pid
        }
    })
  
    const data = res.data;

   setImageArray(data)
    
    console.log("image details data",data)

    }
    catch(error){
      console.log("26",error)
    }

  }


  useEffect(()=>{ 
     getImageDetails()

  },[])

  return (

    <ScrollView style={{backgroundColor:"#fff",height:Dimensions.get('screen').height}}>

      <View >

      <Text
    style={{
      height: 1,
      borderColor: "#001349",
      borderWidth: 1,
      marginTop: 10,
      
    }}
  />

      <Text style={{textAlign:"center",fontSize:25,color:"#DA5050",marginTop:20,fontWeight:800}}><MaterialIcons name="assignment-turned-in" size={30} color="#001349" />Project Details</Text>
      <Text
    style={{
      height: 1,
      borderColor: "#001349",
      borderWidth: 1,
      marginTop: 20,
    }}
  />
 

<View>
{ 

projects &&
      
    
    imgArray.length!=0 && 

    imgArray.map((image)=>(

 

      <View style={{width:Dimensions.get('screen').width,paddingBottom:20}}>
        
      { console.log("102",image.url)}
   
             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {
           console.log(`https://pmksybihar.info/upload/app/${image.url}`)
         }
       <ImageBackground
         style={{ width:Dimensions.get('screen').width, height:350, marginTop: 20, resizeMode: "contain" }}
         source={{ uri: `https://pmksybihar.info/upload/app/${image.url}` }}
         key={projects.id}
         imageStyle={{borderRadius:20}}
       >
        
           
       </ImageBackground>
   
   </ScrollView>
   
   <View style={{ padding: 10, paddingTop: 10,paddingLeft:15 }}>
   
   <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
       Employee name: {projects.employee_name}
       </Text>
     
       <Text
         style={{
           height: 1,
           borderColor: "#D0D0D0",
           borderWidth: 0.5,
           marginTop: 10,
         }}
       />
   
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
       Beneficiary name: {projects.farmer_name}
       </Text>
     
       <Text
         style={{
           height: 1,
           borderColor: "#D0D0D0",
           borderWidth: 0.5,
           marginTop: 10,
         }}
       />
   
   
   
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
     Work ID: {projects.workid}
       </Text>
     
       <Text
         style={{
           height: 1,
           borderColor: "#D0D0D0",
           borderWidth: 0.5,
           marginTop: 10,
         }}
       />
   
   
   <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Project Area: {projects.project_name}
     </Text>
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
      <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
     Activity: {projects.activity_names}
     </Text>
   
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
       <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Activity Type: {projects.activity_type_name}
     </Text>
     <Text
         style={{
           height: 1,
           borderColor: "#D0D0D0",
           borderWidth: 0.5,
           marginTop: 10,
         }}
       />
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
     District: {projects.district_name}
     </Text>
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
     Block: {projects.block_name}
   
     </Text>
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
     Village: {projects.village_name}
     </Text>
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Panchayat: {projects.panchayat_name}
     </Text>
     
   
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Latitude: {image.lat}
     </Text>
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
     Longitude: {image.longitude}
     </Text>
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
   
   
   
   
     {
       image.description && 
       <>
      
   
     <View
       style={{
         flexDirection: "column",
         alignItems: "flex-start",
         padding: 2,
       }}
     >
       <Text>Description: </Text>
       <Text  allowFontScaling={false} style={{ fontSize: 12, textAlign: "justify", color: "gray" }}>
         {image.description}
       </Text>
     </View>
   
     <Text
       style={{
         height: 1,
         borderColor: "#D0D0D0",
         borderWidth: 0.5,
         marginTop: 10,
       }}
     />
     </>
     }
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
       Date: {   moment
      .tz(image.date_time, 'Asia/Kolkata')
      .format('DD-MM-YYYY hh:mm ')}
       </Text>
   
    
   
     
   </View>
   
   
   <TouchableOpacity
     style={{
       backgroundColor: "#001349",
       padding: 10,
       borderRadius: 20,
       justifyContent: "center",
       alignItems: "center",
       marginHorizontal: 60,
       marginTop:10
     }}
   
   >
     <Text allowFontScaling={false} style={{color:"white",fontSize:18}}>View On Map</Text>
   </TouchableOpacity>
       
           </View>
    ))

    
      
}

   
</View>
   
   </View>
    </ScrollView>
    
  )
}

export default ProjectsScreen