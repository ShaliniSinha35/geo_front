import { View, Text, Dimensions,TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const TotalProjects = ({navigation}) => {

    const width=Dimensions.get('screen').width

    const {employeeId,projectAdded} = useAuth()


    const [completedProjects,setCompletedProjects]= useState(null)
    const [pendingProjects,setPendingProjects]= useState(null)





    const [assignProjectsDetails,setProject]= useState([])
    const [districts,setDistricts]= useState([])
    const [assignProjects,setAssignProjects] = useState([])
    const [projectAssignId,setProjectAssignId]= useState(null)


    const getAssignProjects = async()=>{
        try{
            const res= await axios.get(`https://pmksybihar.info/geo/allProjects`, {
              params: {
                  empId: employeeId
              }
          })
        
          const data = res.data;
          console.log(data,"data37")
          

          const projectAssignid=[]
        
          setProject(data)

          for(let i=0;i<data.length;i++){
           
            
            const res= await axios.get(`https://pmksybihar.info/geo/districtAssign`, {
                params: {
                    did: data[i].district
                }
            })

            const data1= res.data
            console.log("district data",data1)
            setDistricts(data1)
            projectAssignid.push({paid:data[i].project_assign_id,status:data[i].status})
          

          }
          console.log(projectAssignid,"58 projectAssignid")

          setProjectAssignId(projectAssignid)

          


        console.log("projectAssign",data)

        const projectArr= JSON.parse(data[0].project)
        console.log(projectArr.length)
          
        const projectArea= []
        for(let i= 0;i<projectArr.length;i++){
          try{
               const res = await axios.get("https://pmksybihar.info/geo/projectArea",{
                params:{
                  project_id: projectArr[i]
                }
               })
               console.log(res.data[0].name)
               projectArea.push({name:res.data[0].name,projectAreaId:projectArr[0]})
          }
          catch(err){
             console.log(err)
          }
        }
        setAssignProjects(projectArea)






   

       
    }
    catch(err){
        console.log("err",err)
    }

}

useEffect(()=>{
    getAssignProjects()
},[employeeId,projectAdded])



   

  return (
    <ImageBackground style={{height:Dimensions.get('screen').height,width:width,backgroundColor:"#b9d6f2",opacity:1}}>
    <Text
    style={{
      height: 1,
      borderColor: "#001349",
      borderWidth: 1,
      marginTop: 10,
      width:width
      
    }}
  />

      <Text style={{textAlign:"center",fontSize:25,color:"#DA5050",marginTop:20,fontWeight:800}}><MaterialIcons name="assignment" size={30} color="#001349" /> Total Projects</Text>
      <Text
    style={{
      height: 1,
      borderColor: "#001349",
      borderWidth: 1,
      marginTop: 20,
      width:width
    }}
  />


<View style={{width:width,alignItems:"center",marginTop:20}}>

    {
        console.log(projectAssignId,districts)
    }

{
 projectAssignId!=null &&
  projectAssignId.map((projectId)=>(



  
          districts.map((item)=>(
          <View key={item.id} style={{alignItems:"center",justifyContent:"center",padding:10,width:350,borderColor:"#001349",borderWidth:2,borderRadius:20,marginTop:10,backgroundColor:"#fff"}}>
         
         <View>
                   
         <Text allowFontScaling={false} style={{fontSize:12,marginTop:10,}}>District <Entypo name="location" size={15} color="#DA5050" /></Text>
          <Text allowFontScaling={false} style={{fontSize:20,fontWeight:500,marginTop:5,}}>{item.name}</Text>
        </View>
  
  
          {
      assignProjects.map((pitem)=>(
        
          <View style={{alignItems:"center"}}>
             
            
                      <Text allowFontScaling={false} style={{fontSize:12,marginTop:10,}}>Project Area   <MaterialIcons name="assignment" size={15} color="#DA5050" /></Text>
          <Text allowFontScaling={false} style={{fontSize:20,fontWeight:500,marginTop:5,}}>{pitem.name}</Text>


{console.log("169",projectId.status)}
          {projectId.status == "Completed" ? (
    <TouchableOpacity style={{ padding: 15, borderRadius: 30, backgroundColor: "#058c42", alignItems: "center", marginTop: 25, marginHorizontal: 20 }}>
      <Text allowFontScaling={false} style={{ fontSize: 16, color: "white" }}>Completed</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => navigation.navigate("addProject", { projectArea: pitem.projectAreaId, districtId: item.did, projectAssignId: projectId.paid })} style={{ padding: 10, borderRadius: 25, backgroundColor: "#DA5050", alignItems: "center", marginTop: 25, marginHorizontal: 20 }}>
      <Text allowFontScaling={false} style={{ fontSize: 16, color: "white" }}>Add your Activity</Text>
    </TouchableOpacity>
  )}
  
     
            </View>

      ))

      

  }
  
          
        </View>
        ))
    
  
  ))




}



 
</View>





     
    </ImageBackground>
  )
}

export default TotalProjects