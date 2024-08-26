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
  
  import axios from 'axios'
  import { useAuth } from './AuthContext'
  
  const CompleteProjects = ({navigation}) => {
  
    const {employeeId} = useAuth()
  
    const [projects,setProjects] = useState([])
  
    const getProjectDetails = async()=>{
      console.log(employeeId)
  
      try{
        const res= await axios.get(`https://pmksybihar.info/geo/completeProjects`, {
          params: {
              empId: employeeId
          }
      })
    
      const data = res.data;
      console.log("42",data)
      setProjects(data)
      
  
  
      }
      catch(error){
        console.log("26",error)
      }
  
    }
  
  
    useEffect(()=>{ 
       getProjectDetails()
  
    },[])
  
    return (
  
      <ScrollView style={{backgroundColor:"#b9d6f2",height:Dimensions.get('screen').height}}>
  
        <View >
  
        <Text
      style={{
        height: 1,
        borderColor: "#001349",
        borderWidth: 1,
        marginTop: 10,
        
      }}
    />
  
        <Text style={{textAlign:"center",fontSize:25,color:"#DA5050",marginTop:20,fontWeight:800}}><MaterialIcons name="assignment-turned-in" size={30} color="#001349" /> Your Projects</Text>
        <Text
      style={{
        height: 1,
        borderColor: "#001349",
        borderWidth: 1,
        marginTop: 20,
      }}
    />
   
  
  <View>
  { projects.length==0 ? <ActivityIndicator style={{marginTop:20}}></ActivityIndicator>
          :
         projects.map((project)=>(
        
          
        
  
          <View style={{width:Dimensions.get('screen').width,paddingBottom:20}}>
          
     

  
  <View style={{ padding: 10,alignItems:"center",borderColor:"#001349", borderWidth:2,margin:10,borderRadius:20,backgroundColor:"#fff",paddingTop:20 }}>
  

  <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Employee name: {project.employee_name}
    </Text>
  
    <Text
      style={{
        height: 1,
        borderColor: "#D0D0D0",
        borderWidth: 0.5,
        marginTop: 20,
        marginBottom: 20,
        width:300
      }}
    />

  <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Beneficiary name: {project.farmer_name}
    </Text>
  
    <Text
      style={{
        height: 1,
        borderColor: "#D0D0D0",
        borderWidth: 0.5,
        marginTop: 20,
        marginBottom: 20,
        width:300
      }}
    />
  
     <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Activity: {project.activity_names}
    </Text>
  
    <Text
      style={{
        height: 1,
        borderColor: "#D0D0D0",
        borderWidth: 0.5,
        marginBottom: 20,
        marginTop: 20,
        width:300
      }}
    />
      <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
   Activity Type: {project.activity_type_name}
    </Text>

    <Text
      style={{
        height: 1,
        borderColor: "#D0D0D0",
        borderWidth: 0.5,
        marginTop: 20,
        marginBottom: 20,
        width:300
      }}
    />
    <Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
   Project Area: {project.project_name}
    </Text>
   
    <Text
      style={{
        height: 1,
        borderColor: "#D0D0D0",
        borderWidth: 0.5,
        marginBottom: 20,
        marginTop: 20,
        width:300
      }}
    />

<Text  allowFontScaling={false} style={{ fontSize: 15, fontWeight: "600" }}>
    Date: {project.entry_date}
    </Text>
  
    <Text
      style={{
        height: 1,
        borderColor: "#D0D0D0",
        borderWidth: 0.5,
        marginBottom: 20,
        marginTop: 20,
        width:300
      }}
    />
  
   
   
   
   
  
   
   
  
  
  
    
  
   
  <TouchableOpacity
    style={{
      backgroundColor: "#DA5050",
      padding: 12,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 30,
      marginTop:10
    }}
    onPress={()=>navigation.navigate("projects",{project:project})}
  
  >
    <Text allowFontScaling={false} style={{color:"white",fontSize:15}}>View Details</Text>
  </TouchableOpacity>
      
    
  </View>
  
  
 
          </View>
        
         ))
        }
     
  </View>
     
     </View>
      </ScrollView>
      
    )
  }
  
  export default CompleteProjects