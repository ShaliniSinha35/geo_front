import { View, Text, Dimensions, TouchableOpacity,ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../Screens/AuthContext';
const width = Dimensions.get('screen').width

const Section1 = ({navigation}) => {

  const {employeeId,projectAdded} = useAuth()
const [totalCompleteProjects,setTotalCompleteProjects]= useState(0)
const [totalpendingProjects,setTotalPendingProjects]= useState(0)
  const getProjectDetails = async()=>{

    try{
      const res= await axios.get(`https://pmksybihar.info/geo/completeProjects`, {
        params: {
            empId: employeeId
        }
    })

  
    const data = res.data;
    setTotalCompleteProjects(data.length)

    }

    catch(error){
      console.log("26",error)
    }

  }

  const getPendingProjects= async()=>{
    try{
      const res1= await axios.get("https://pmksybihar.info/geo/projectAssign", {
        params: {
            empId: employeeId
        }
      })
      setTotalPendingProjects(res1.data.length)
    }
 
    catch(err){
      console.log(err.message)
    }
  }


  useEffect(()=>{ 
     getProjectDetails()
     getPendingProjects()

  },[projectAdded])

  return (


    // <ImageBackground  style={{height:Dimensions.get('screen').height,width:width,backgroundColor:"#f7f7f5"}}>

    <View style={{marginTop:20, alignItems:"center"}}>



      
<View style={{width:300,backgroundColor:"#fff",borderRadius:25,alignItems:"center",justifyContent:"center",marginTop:15,padding:20}}>
       <MaterialIcons name="assignment-turned-in" size={24} color="#DA5050" />
       <Text allowFontScaling={false}  style={{color:"#1c68c4",fontSize:18,fontWeight:900,marginTop:10}}>Completed Projects</Text>
       <Text style={{marginTop:5,fontSize:15}}>{totalCompleteProjects}</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("completeProjects")} style={{padding:12, borderRadius:25, backgroundColor:"#DA5050",alignItems:"center",marginTop:10}}>
            <Text allowFontScaling={false} style={{fontSize:16,color:"white"}}>View Completed Projects</Text>
          </TouchableOpacity>
       </View>



       <View style={{width:300,height:150,backgroundColor:"#fff",borderRadius:25,alignItems:"center",justifyContent:"center",marginTop:15}}>
       <MaterialIcons name="pending-actions" size={24} color="#DA5050" />
       <Text allowFontScaling={false}  style={{color:"#1c68c4",fontSize:18,fontWeight:900,marginTop:10}}>Pending Projects</Text>
       <Text style={{marginTop:5,fontSize:15}}>{totalpendingProjects}</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("projectAssign")} style={{padding:12, borderRadius:25, backgroundColor:"#DA5050",alignItems:"center",marginTop:10,opacity:1}}>
            <Text allowFontScaling={false} style={{fontSize:16,color:"white"}}>View Pending Projects</Text>
          </TouchableOpacity>
       </View>
   
       <View style={{width:300,backgroundColor:"#fff",borderRadius:25,alignItems:"center",justifyContent:"center",padding:20,marginTop:15}}>
       <MaterialIcons name="assignment" size={24} color="#DA5050" />
          <Text allowFontScaling={false}  style={{color:"#1c68c4",fontSize:18,fontWeight:900,marginTop:10}}>Total Projects</Text>
          {/* <Text style={{marginTop:5,fontSize:15}}>10 </Text> */}
          <TouchableOpacity onPress={()=>navigation.navigate("totalProjects")} style={{padding:12, borderRadius:25, backgroundColor:"#DA5050",alignItems:"center",marginTop:10}}>
            <Text allowFontScaling={false} style={{fontSize:16,color:"white"}}>View Your Projects</Text>
          </TouchableOpacity>
       </View>





      
    </View>

  )
}

export default Section1