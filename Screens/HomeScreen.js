
import React, { useState, useEffect,useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, BackHandler,FlatList } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
// import { Camera } from 'expo-camera';
import { Camera, CameraType } from 'expo-camera/legacy';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialIcons } from '@expo/vector-icons';
import CameraPreview from '../Components/CameraPreview';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import VideoRecorder from '../Components/VideoRecorder';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as MediaLibrary from 'expo-media-library';
import axios from "axios";
import { useAuth } from './AuthContext';
import { useRoute } from '@react-navigation/native';






const HomeScreen = ({ navigation }) => {

  const route = useRoute()
  const {setProjectAdded} = useAuth()

  // console.log(route)

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [assignDist, setAssignDist] = useState('')
  const [showInput, setInput]= useState(false)



  useEffect(() => {

    if (route.params) {
      setProjectAreaId(route.params.projectArea)
      setDistId(route.params.districtId)
      // console.log("46",route.params.projectAreaId)
    }
  }, [route.params])






  const { employeeId } = useAuth()

  const [values, setValues] = useState(
    {
      district: assignDist,
      block: '',
      panchayat: '',
      village: '',
      projectArea: '',
      activity: '',
      nameOfActivity: '',
      shortDetail: '',
      image: '',
      workId:'',
      beneficiary:''
    }
  );

  
 
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPressButton);

  //   return () => {
  //     // Remove the event listener when the component is unmounted
  //     backHandler.remove();
  //   };
  // }, []);

  // const handleBackPressButton = () => {
  //   handleBackPress()

  //   return true;
  // }; 


  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [videoArray, setVideoArray] = useState(null)


  const [dist, setDist] = useState(null)
  const [distId,setDistId] = useState(null)
  const [block, setBlock] = useState(null)
  const [blockId,setBlockId]= useState(null)
  const [panchayat, setPanchayat] = useState(null)
  const [panchayatId,setPanchayatId]= useState(null)
  const [village, setVillage] = useState(null)
  const [villageId,setVillageId]= useState(null)
  const [projectArea, setProjectArea] = useState(null)
  const [projectAreaId,setProjectAreaId] = useState(null)
  const [activityType, setActivityType] = useState(null)
  const [activityTypeId, setActivityTypeId] = useState(null)
  const [activityName, setActivityName] = useState(null)
  const [activityNameId,setActivityNameId] = useState(null)
  const[workId,setWorkId] = useState(null)
  const [wId,setWId] = useState(null)
  const [length,setLength]= useState('')
  const [breadth,setBreadth]= useState('')
  const [height,setHeight]= useState('')
  


  const [activity,setActivity]= useState(null)
  const [activityId,setActivityId]= useState(null)
  const [allWorkId,setAllWorkId] = useState(null)
  const [beneficary,setBeneficiary] = useState(null)
  const [data, setData] = useState(allWorkId);

  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);

  const [selectedWork, setSelectedwork] = useState('');
  const searchRef = useRef();

  const onSearch = (searchText) => {
    // console.log("searchtext", searchText);
    // console.log(allWorkId);
    setSearch(searchText);
    if (searchText !== '') {
      const tempData = allWorkId.filter(item => {
        // console.log(item.workid); // Adjusted property name to workid
        return item.workid.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      // console.log(tempData)
      setData(tempData);
    } else {
      setData(allWorkId);
    }
  };
  



  const [errors, setErrors] = useState(
    {
      district: '',
      block: '',
      panchayat: '',
      village: '',
      projectArea: '',
      activity: '',
      nameOfActivity: '',
      shortDetail: '',
      image: ''

    });
  const [flag, setFlag] = useState(false);
  const [error, setErr] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const getDistrict = async () => {

    try {
      const res = await axios.get("https://pmksybihar.info/geo/district")
      const data = res.data;
      setDist(data)
    }
    catch (err) {
      console.log(err)
    }

  }


  const getBlock = async () => {

    try {
      const res = await axios.get("https://pmksybihar.info/geo/block")
      const data = res.data;
      setBlock(data)
    }
    catch (err) {
      console.log(err)
    }

  }


  const getPanchayat = async () => {

    try {
      const res = await axios.get("https://pmksybihar.info/geo/panchayat")
      const data = res.data;
      setPanchayat(data)
    }
    catch (err) {
      console.log(err)
    }

  }

  const getVillage = async () => {

    try {
      const res = await axios.get("https://pmksybihar.info/geo/village")
      const data = res.data;
      setVillage(data)
    }
    catch (err) {
      console.log(err)
    }

  }


  const getProjectArea = async () => {

    try {
      const res = await axios.get("https://pmksybihar.info/geo/projectArea")
      const data = res.data;
      setProjectArea(data)
    }
    catch (err) {
      console.log(err)
    }

  }

  const getActivity = async () => {

    try {
      const res = await axios.get("https://pmksybihar.info/geo/activityName")
      const data = res.data;
     
      setActivity(data)

      // setActivityTypeId(atypeid)
    }
    catch (err) {
      console.log(err)
    }

  }


  const getAllDetails = async () => {
    let activityId = null;
  
    if (values.activity) {
      console.log("217",values.activity);
      try {
        const res = await axios.get("https://pmksybihar.info/geo/activityName");
        const data = res.data;
  

        for (let i = 0; i < data.length; i++) {
          if (data[i].name === values.activity) {
            activityId = data[i].atid;
            console.log("273 activityId",activityId,route.params.projectArea,route.params.districtId)
        
            setActivityId(data[i].atid);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    const res1 = await axios.get("https://pmksybihar.info/geo/work", {
      params: {
        activityId: activityId,
        projectId:route.params.projectArea,
        districtId:route.params.districtId
      },
    });

    const usedWorkId = await axios.get("https://pmksybihar.info/geo/deActiveWorkId",{
      params:{
        empId:employeeId
      }
    })

    const deActiveWorkId= usedWorkId.data
    console.log("deActiveUserId",deActiveWorkId)


    const deActiveWorkIdsSet = new Set(deActiveWorkId.map(item => item.workid));

// Filter out WorkIds that are in the deActiveWorkIdsSet
const filteredWorkId = res1.data.filter(item => !deActiveWorkIdsSet.has(item.workid));

console.log('Filtered WorkId:', filteredWorkId);

    console.log(res1.data)
    setAllWorkId(filteredWorkId)
    setData(filteredWorkId)
   


 
  
    if (filteredWorkId.length !== 0 && values.workId) {
      const res2 = await axios.get("https://pmksybihar.info/geo/workDetails", {
        params: {
          workId: values.workId,
        },
      });
      const data = res2.data[0];

 
      setDist(data.district_name);
      setDistId(data.district_id);
      setBlock(data.block_name);
      setBlockId(data.block_id)
      setPanchayat(data.panchayat_name);
      setPanchayatId(data.panchayat_id)
      setVillage(data.village_name);
      setVillageId(data.village_id)
      setProjectArea(data.project_name);
      setProjectAreaId(data.project)
      setWorkId(data.workid);
      setWId(data.work_id)
      setActivityName(data.activity_name);
      setActivityNameId(data.activity_type)
      setBeneficiary(data.farmer_name)
      setValues({
        ...values,
        panchayat: data.panchayat_name,
        district: data.district_name,
        block: data.block_name,
        village: data.village_name,
        projectArea: data.project_name,
        workId:data.workid,
        beneficiary:data.farmer_name
      });
      
    }
    else{
      setDist('');
      setBlock('');
      setPanchayat('');
      setVillage('');
      setProjectArea('');
      setWorkId(''); // Update the workId state here
      setValues({
        ...values,
        panchayat:'',
        district:'',
        block:'',
        village: '',
        projectArea: '',
        workId:''
      });
      setActivityName('');
    }
  };
  
  useEffect(() => {
    getAllDetails();
  }, [values.activity,values.workId]);





  const getActivityName = async () => {

    try {
      const res = await axios.get("https://pmksybihar.info/geo/activityName")
      const data = res.data;
      setActivityName(data)
    }
    catch (err) {
      console.log(err)
    }

  }




  useEffect(() => {
    getDistrict()
    getBlock()
    getPanchayat()
    getVillage()
    getProjectArea()
    getActivity()
    getActivityName()
  }, [])




  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const locationSubscription = await Location.watchPositionAsync(
          {
            enableHighAccuracy: true,
            accuracy: Location.Accuracy.BestForNavigation

          },
          (newLocation) => {
            // console.log("Location:", newLocation.coords);
            // // console.log("Accuracy:", newLocation.coords.accuracy);
            setLocation(newLocation.coords);
          }
        );


      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  useEffect(() => {
    getLocation();

  }, []);


  const takePicture = async () => {



    console.log("107", imageArray.length)

    if (imageArray.length >= 5) {
      Alert.alert(
        'Maximum 5 photos allowed',
        'You already took 5 photos.'
      );
      return;
    }

    if (cameraRef) {
      try {

        const accuracyThreshold = 10; // Set your desired accuracy threshold in meters

        if (location.accuracy <= accuracyThreshold) {
          const photo = await cameraRef.takePictureAsync();
          const imageWithLocation = await addLocationToImage(photo.uri);
          // Resize and compress image to approximately 1 MB
          const resizedImage = await resizeImage(imageWithLocation);

          // Check resized photo size
          const fileSizeInBytes = await getPhotoSize(resizedImage.uri);
          const fileSizeInKB = fileSizeInBytes / 1024;
          // console.log(fileSizeInKB,"fileSizeInKB")

          if (fileSizeInKB > 240) {
            Alert.alert('Photo Size Limit Exceeded', 'Photo size should be 250 KB or less.');
            return;
          }

          setPreviewVisible(true)
          setCapturedImage(photo)

          // Add the image information to the array
          setImageArray([
            ...imageArray,
            {
              uri: resizedImage.uri,
              latitude: location.latitude,
              longitude: location.longitude,
              accuracy: location.accuracy,
              imageDesc: values.shortDetail,
              dateTime: new Date(),
            },
          ]);
          setValues({ ...values, image: imageArray })
        }
        else {
          // Location accuracy does not meet the threshold, consider waiting for a more accurate location
          Alert.alert(
            'Location Accuracy Warning',
            'Location accuracy should be within 10 meters. Please wait for a more accurate location.'
          );
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };


  const addLocationToImage = async (uri) => {
    try {
      const { latitude, longitude } = location;
      // You can add the latitude and longitude to the image metadata here
      return uri;
    } catch (error) {
      console.error('Error adding location to image:', error);
      return uri;
    }
  };

  const getPhotoSize = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });

      return fileInfo.size;
    } catch (error) {

      console.error('Error getting photo size:', error);

      return 0;
    }
  };



  const resizeImage = async (uri, maxSizeKB = 240) => {
    try {
      const targetSizeBytes = maxSizeKB * 1024; // Convert KB to bytes


      let compressionQuality = 1.0;
      let resizedImage, resizedSize;

      do {
        resizedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 1024 } }],
          { compress: compressionQuality, format: ImageManipulator.SaveFormat.JPEG }
        );

        resizedSize = await getPhotoSize(resizedImage.uri);


        compressionQuality -= 0.1;

      } while (resizedSize > targetSizeBytes && compressionQuality > 0);

      console.log('Resized Image Size (bytes):', resizedSize, 'bytes');
      console.log('Resized Image Size (KB):', resizedSize / 1024, 'KB');
      return resizedImage;
    } catch (error) {
      console.error('Error resizing image:', error);
      return { uri };
    }
  };






  const handleChange = (field) => (value) => {
    setValues({ ...values, [field]: value });

  };

  const handleBlur = (field) => () => {
    // Implement validation logic for onBlur event if needed
  };



  const handleSubmit = async () => {
    
    let errors = {};
  
    if (!values.activity) {
      errors.activity = "Activity is required";
    }
  
    if (imageArray.length === 0) {
      errors.image = "Image is required";
    }
  
    // Set errors and reset them after 3 seconds
    setErrors(errors);
    setTimeout(() => {
      setErrors({
        activity: '',
        shortDetail: '',
        image: ''
      });
    }, 3000);
  
    // Proceed only if there are no validation errors
    if (Object.keys(errors).length === 0) {
      try {
        console.log("Sending data to server:", {
          emp_id: employeeId,
          dist: distId,
          block: blockId,
          panchayat: panchayatId,
          village: villageId,
          farmer_name: beneficary,
          projectArea: projectAreaId,
          activityType: activityId,
          activityName: activityNameId,
          imageArray: imageArray,
          desc: values.shortDetail,
          workid: workId,
          length: length,
          breadth: breadth,
          height: height
        });
  
        const response = await axios.post('https://pmksybihar.info/geo/addProject', {
          emp_id: employeeId,
          dist: distId,
          block: blockId,
          panchayat: panchayatId,
          village: villageId,
          farmer_name: beneficary,
          projectArea: projectAreaId,
          activityType: activityId,
          activityName: activityNameId,
          imageArray: imageArray,
          desc: values.shortDetail,
          workid: workId,
          length: length,
          breadth: breadth,
          height: height
        });
  
        console.log('Post successful:', response.data);

        console.log(response.data.message)
  
        // Handle photo limit exceeded case
        if (response.data.message) {
          Alert.alert(response.data.message);
          return;
        }
  
        // Handle successful response
        if (response.data) {
          for (let i = 0; i < imageArray.length; i++) {
            console.log("Uploading image:", imageArray[i].uri);
            await uploadImage(imageArray[i].uri, workId, i, response.data);
          }
  
          Alert.alert('Success', 'Activity submitted successfully');
          setProjectAdded(true);
          // Update status
          await updateStatus();
  
          // Reset form fields
          setDist('');
          setBlock('');
          setPanchayat('');
          setVillage('');
          setProjectArea('');
          setWorkId('');
          setActivityName('');
          setLength('');
          setBreadth('');
          setHeight('');
          setValues({
            ...values,
            panchayat: '',
            district: '',
            block: '',
            village: '',
            projectArea: '',
            workId: ''
          });
          setImageArray([]);
  
          // Navigate to home and update state
          navigation.navigate("Home");
         
        }
  
      } catch (error) {
        console.error('Error posting data:', error);
        Alert.alert('Validation failed, Activity not submitted');
      }
    } else {
      console.log("Validation failed, form not submitted");
      Alert.alert('Validation failed, Activity not submitted');
    }
  };
  


  const updateStatus = async () => {
    try {
      const res = await axios.post("https://pmksybihar.info/geo/updateStatus", null, {
        params: {
          projectAssignId: route.params.projectAssignId
        }
      });
  
      if (res.data.message === "success") { // Correct comparison
        console.log("Status updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }


  const uploadImage = async (imageUri,workId,index, pid) => {

    const parts = imageUri.split('/');
    const imageName = parts[parts.length - 1];
    const shortName = imageName.slice(0, 8) + '.jpg';
console.log(shortName); 
  
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust according to your image type
      name: `${workId}_${index + 1}.jpg`, // Use any desired file name here
    });

    try {
      const response = await axios.post('https://pmksybihar.info/geo/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };


  const deletePhoto = (index) => {

    const updatedImageArray = [...imageArray];
    updatedImageArray.splice(index, 1);
    setImageArray(updatedImageArray);
  };


  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');


    })();
  }, []);
  useEffect(() => {
    setStartCamera(false)
    setCapturedImage(null)
    setPreviewVisible(false)
  }, [])


  const __startCamera = async () => {
    // Check if the user has already taken 5 photos
    if (imageArray.length >= 5) {
        Alert.alert(
            'Maximum 5 photos allowed',
            'You already took 5 photos.'
        );
        return;
    }

    // Request camera permissions
    const { status: cameraStatus } = await Camera.getCameraPermissionsAsync();

    
    // Request media library permissions
    const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
    
    // Request microphone permissions
    const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();

    // Check if all required permissions are granted
    if (cameraStatus === 'granted' && mediaLibraryStatus === 'granted' && audioStatus === 'granted') {
        setStartCamera(true); // Start the camera if permissions are granted
    } else {
        Alert.alert('Permission denied', 'You need to allow camera and media library access.'); // Show an alert if permissions are denied
    }
};

//   const __startCamera = async () => {
//     const getCameraPermission = async () => {
//       const permissionResponse = await Camera.getCameraPermissionsAsync();
//       console.log(permissionResponse);
//   };
  
//   getCameraPermission();
//     // let { status: existingStatus } = await Camera.getCameraPermissionsAsync();
    
//     // if (existingStatus !== 'granted') {
//     //     const { status } = await Camera.requestCameraPermissionsAsync();
//     //     existingStatus = status;
//     // }

//     // if (existingStatus === 'granted') {
//     //     setStartCamera(true);
//     // } else {
//     //     Alert.alert('Permission denied', 'You need to allow camera access.');
//     // }
// }; 
  const __retakePicture = (uri) => {
    // console.log(uri)

    const newArr = imageArray.filter((image) => {
      // console.log(image.uri, uri)
    })
    // console.log("344", newArr)
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const handleBackPress = () => {
    setStartCamera(false)
    setCapturedImage(null)
    setPreviewVisible(false)
  }


  const saveToGallery = async (uri) => {
    setStartCamera(false)
    setCapturedImage(null)
    setPreviewVisible(false)

    const resizedImage = await resizeImage(uri);


    try {
      if (!hasMediaLibraryPermission) {
        throw new Error('Missing MEDIA_LIBRARY permissions.');
      }

      const asset = await MediaLibrary.createAssetAsync(resizedImage.uri);
      const album = await MediaLibrary.getAlbumAsync('Images');

      if (album === null) {
        await MediaLibrary.createAlbumAsync('Images', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (error) {
      console.error('Error saving to gallery:', error);
    }
  };

    const handleSelect = (item) => {
    
      setValues({ ...values, workId: item });
  };

  return (

    startCamera ?
      previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} savePhoto={saveToGallery} retakePicture={__retakePicture} handleBack={handleBackPress} />
      ) : <>



        <Camera
        ref={(ref) => setCameraRef(ref)}
    style={{ flex: 1, width: "100%" }}
    type={type}
        //   // type={Camera.Constants.Type.back}
         />
        <Text style={{ position: "absolute", top: 60, left: 10, color: "white" }}>
          Lat: {location?.latitude}, Long: {location?.longitude}, Accuracy : {location?.accuracy.toFixed(2)}
        </Text>

        <TouchableOpacity style={{ position: "absolute", right: 10, top: 25 }} onPress={() => handleBackPress()}>

          <AntDesign name="close" size={30} color="white" />
        </TouchableOpacity>


        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={takePicture}
              style={{
                width: 70,
                height: 70,
                bottom: 0,
                borderRadius: 50,
                backgroundColor: '#fff',
                borderColor: "#9d0208",
                borderWidth: 4
              }}
            />
          </View>
        </View>

      </>




      :
      //  <VideoRecorder></VideoRecorder>
      <ScrollView style={styles.container}>


        <Text allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "#001349",
            borderWidth: 2,
            marginTop: 10,
            marginBottom: 10,

          }}
        />

        <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 20, color: "#DA5050" }}><MaterialIcons name="assignment-add" size={24} color="#001349" /> Complete your Activity</Text>
        <Text allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "#001349",
            borderWidth: 2,
            marginTop: 10,
            marginBottom: 20,

          }}
        />
        <View>

          <View style={{ marginBottom: 60 }}>



               {/* Activity dropdown */}
               <View style={{ margin: 5 }}>

<Text>Activity*</Text>
<View style={styles.inputBox}>
  <Picker
    selectedValue={values.activity}
    onValueChange={(itemValue, itemIndex) => {

      setValues({ ...values, activity: itemValue });
    }}

  >
    <Picker.Item label="Select Activity" value="" />
    {
      activity!= null && activity.map((item) => (
        <Picker.Item key={item.key} label={item.name} value={item.name} />
      ))
    }




  </Picker>

</View>
{errors.activity && <Text style={{ color: 'red' }}>{errors.activity}</Text>}
</View>


            {/* work id  */}

 

            <View style={{ margin: 5 }}>
  <Text>Working Id*</Text>
  <TouchableOpacity 
    onPress={() => {
   
      setClicked(!clicked);
 
    }}
    style={{
      padding: 10,
    height:50,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 15,
      marginTop: 5,
      color: 'black',
    }}
    defaultValue={values.workId}
    editable={false}
  ><Text>{values.workId}</Text></TouchableOpacity>
  {/* Always display the search input */}
  <View
    style={{
      elevation: 5,
      marginTop: 20,
      height: clicked ? 300 : 0, // Set height to 0 if not clicked
      alignSelf: 'center',
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden', // Hide overflow content when not clicked
    }}>
    <TextInput
      placeholder="Search.."
      value={search}
      ref={searchRef}
      onChangeText={txt => onSearch(txt)}
      style={{
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.2,
        borderColor: '#8e8e8e',
        borderRadius: 7,
        marginTop: 20,
        padding:10,
        height:50
      
   
      }}
    />

{
 data &&  data.length== 0 ?    <Text style={{margin:20}}>No Work Id Found</Text> :
  <FlatList
      data={data} 
      showsVerticalScrollIndicator={true}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={{
            width: '85%',
            alignSelf: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderColor: '#8e8e8e',
            marginTop:10
          }}
          onPress={() => {
            setSelectedwork(item.workid);
            setValues({ ...values, workId: item.workid });
            setClicked(false);
            onSearch('');
            setSearch('');
          }}>
          <Text style={{ fontWeight: '600' }}>{item.workid}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
}

  




  </View>
</View>


           
      

{/* district */}

      <View style={{ margin: 5 }}>
        <Text>District</Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
       defaultValue={dist}
          editable={false}
        />
      </View>

      {/* block */}

      <View style={{ margin: 5 }}>
        <Text>Block</Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
       defaultValue={block}
          editable={false}
        />
      </View>
      {/* panchayat */}

      <View style={{ margin: 5 }}>
        <Text>Panchayat</Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
       defaultValue={panchayat}
          editable={false}
        />
      </View>
      {/* village */}
      <View style={{ margin: 5 }}>
        <Text>Village</Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
       defaultValue={village}
          editable={false}
        />
      </View>

      {/* beneficiary name */}


         <View style={{ margin: 5 }}>
        <Text>Beneficiary name</Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
       defaultValue={beneficary}
          editable={false}
        />
      </View>
      {/* project area */}

      <View style={{ margin: 5 }}>
        <Text>Project Area</Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
       defaultValue={projectArea}
          editable={false}
        />
      </View>
      {/* nameofactivity */}
      <View style={{ margin: 5 }}>
        <Text>Name of Activity</Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
       defaultValue={activityName}
          editable={false}
        />
      </View>






          

  

  {activityId === 'AT01' || values.activity === 'AT02' ? (
    <>
    

      <View style={{ margin: 5 }}>
        <Text>Length (in mtr)*</Text>
        <TextInput
                keyboardType='numeric'
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
          onChangeText={(text)=>setLength(text)}
          value={length}
        />
      </View>

      <View style={{ margin: 5 }}>
        <Text>Breadth (in mtr)*</Text>
        <TextInput
                keyboardType='numeric'
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
          onChangeText={(text)=>setBreadth(text)}
          value={breadth}
        />
      </View>

      <View style={{ margin: 5 }}>
        <Text>Height/Depth (in mtr)*</Text>
        <TextInput
        keyboardType='numeric'
          style={{
            padding: 10,
            backgroundColor: '#fdfcfc',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 15,
            marginTop: 5,
            color: 'black',
          }}
          onChangeText={(text)=>setHeight(text)}
          value={height}
        />
      </View>
    </>
  ) : null}

           




      






            <TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 180,
                borderRadius: 4,
                backgroundColor: '#001349',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                marginTop: 10

              }}
            >

              <MaterialCommunityIcons name="camera" size={24} color="white" />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginLeft: 5
                }}
              >
                Take picture
              </Text>
            </TouchableOpacity>

            {errors.image && <Text style={{ color: 'red' }}>{errors.image}</Text>}


            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row" }}>
              {/* {console.log(imageArray[0])} */}
              {imageArray.map((photo, index) => (
                <View key={index} style={{ marginVertical: 10, marginRight: 5 }}>
                  <Image source={{ uri: photo.uri }} style={{ width: 100, height: 100 }} />

                  <Text>Accuracy: {photo.accuracy.toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => deletePhoto(index)} style={styles.deleteButton}>
                    <MaterialIcons name="delete" size={24} color="#DA5050" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>



            {imageArray.length != 0 &&
              <>

                {/* latitude */}
                <View style={{ margin: 5 }} >
                  <Text>Latitude *</Text>
                  <TextInput
                    placeholder="Latitude"
                    editable={false}
                    defaultValue={String(imageArray[0].latitude)}


                    style={{
                      padding: 10, backgroundColor: "#fdfcfc", borderWidth: 2,
                      borderColor: "black",
                      borderRadius: 15, marginTop: 5, color: "black"
                    }}


                  />


                </View>






                {/* longitude */}

                <View style={{ margin: 5 }} >
                  <Text>Longitude*</Text>
                  <TextInput
                    placeholder="Longitude"
                    editable={false}
                    defaultValue={String(imageArray[0].longitude)}
                    style={{
                      padding: 10, backgroundColor: "#fdfcfc", borderWidth: 2,
                      borderColor: "black",
                      borderRadius: 15, marginTop: 5, color: "black"
                    }}

                  />

                </View>


                {/* short Details */}
                <View style={{ margin: 5 }} >
                  <Text>Short Details*</Text>
                  <TextInput
                    placeholder="Enter Short Details"
                    onChangeText={handleChange('shortDetail')}
                    onBlur={handleBlur('shortDetail')}
                    value={values.shortDetail}
                    style={{
                      padding: 10, backgroundColor: "#fdfcfc", borderWidth: 2,
                      borderColor: "black",
                      borderRadius: 15, marginTop: 5
                    }}
                    numberOfLines={4}

                  />
                  {errors.shortDetail && <Text style={{ color: 'red' }}>{errors.shortDetail}</Text>}
                </View>
              </>
            }








            <View style={{ width: Dimensions.get("screen").width * 0.9, alignItems: "center", marginTop: 30 }}>
              <TouchableOpacity onPress={() => handleSubmit()} style={{ width: 250, padding: 15, backgroundColor: "#001349", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 18 }}>Submit Your Activity</Text>
              </TouchableOpacity>
            </View>









          </View>


        </View>











      </ScrollView>



  );
};

export default HomeScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    padding: 20,

    paddingBottom: 50

  },
  inputBox: {
    backgroundColor: "#fdfcfc",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    marginTop: 5

  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },


  captureButton: {
    alignSelf: 'center',
    margin: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    padding: 5,
  },

});



// SELECT mw.id, mw.work_id, mw.workid, mw.farmer_name, mw.father_name, mw.project, mpa.name AS project_name, ma.name AS activity_name, mw.activity_type, mw.activity, mv.name AS village_name, ms.name AS state_name, md.name AS district_name, mb.name AS block_name, mp.name AS panchayat_name, mw.name, mw.cdate, mw.cby, mw.status FROM master_workid AS mw LEFT JOIN master_activity AS ma ON mw.activity = ma.atid LEFT JOIN master_village AS mv ON mw.village_id = mv.village_id LEFT JOIN master_state AS ms ON mw.sid = ms.sid LEFT JOIN master_district AS md ON mw.district_id = md.did LEFT JOIN master_block AS mb ON mw.block_id = mb.block_id LEFT JOIN master_panchayat AS mp ON mw.panchayat_id = mp.panchayat_id JOIN master_project_area AS mpa ON mw.project = mpa.project_id;











// 
            {/* District dropdown */}
//             <View style={{ margin: 5 }}>

//               <Text>District*</Text>


//               {
//                 assignDist ? <TextInput
//                   defaultValue={route.params.district}
//                   editable={false}
//                   style={{
//                     padding: 10, backgroundColor: "#fdfcfc", borderWidth: 2,
//                     borderColor: "black",
//                     borderRadius: 15, marginTop: 5, color: "black"
//                   }}
//                 />

//                   :

//                   <View style={styles.inputBox}>

//                     <Picker
//                       selectedValue={values.district}
//                       onValueChange={(itemValue, itemIndex) => {
//                         setValues({ ...values, district: itemValue }); // Update district value
//                       }}

//                     >


//                       <Picker.Item label="Select District" value="" />
//                       {
//                         dist != null && dist.map((item) => (
//                           <Picker.Item key={item.key} label={item.name} value={item.name} />
//                         ))
//                       }



//                       {/* Add other district options similarly */}
//                     </Picker>

//                   </View>





//               }




//             </View>


//             {/* block dropdown */}
//             <View style={{ margin: 5 }}>

//               <Text>Block*</Text>
//               <View style={styles.inputBox}>
//                 <Picker
//                   selectedValue={values.block}
//                   onValueChange={(itemValue, itemIndex) => {

//                     setValues({ ...values, block: itemValue });
//                   }}

//                 >
//                   <Picker.Item label="Select Block" value="" />
//                   {
//                     block != null && block.map((item) => (
//                       <Picker.Item key={item.key} label={item.name} value={item.name} />
//                     ))
//                   }




//                 </Picker>

//               </View>
//               {errors.block && <Text style={{ color: 'red' }}>{errors.block}</Text>}

//             </View>


//             {/* panchayat dropdown */}
//             <View style={{ margin: 5 }}>

//               <Text>Panchayat*</Text>
//               <View style={styles.inputBox}>
//                 <Picker
//                   selectedValue={values.panchayat}
//                   onValueChange={(itemValue, itemIndex) => {

//                     setValues({ ...values, panchayat: itemValue });
//                   }}

//                 >
//                   <Picker.Item label="Select Panchayat" value="" />
//                   {
//                     panchayat != null && panchayat.map((item) => (
//                       <Picker.Item key={item.key} label={item.name} value={item.name} />
//                     ))
//                   }




//                 </Picker>

//               </View>
//               {errors.panchayat && <Text style={{ color: 'red' }}>{errors.panchayat}</Text>}
//             </View>




//             {/* Village dropdown */}
//             <View style={{ margin: 5 }}>

//               <Text>Village*</Text>
//               <View style={styles.inputBox}>
//                 <Picker
//                   selectedValue={values.village}
//                   onValueChange={(itemValue, itemIndex) => {

//                     setValues({ ...values, village: itemValue });
//                   }}

//                 >
//                   <Picker.Item label="Select Village" value="" />
//                   {
//                     village != null && village.map((item) => (
//                       <Picker.Item key={item.key} label={item.name} value={item.name} />
//                     ))
//                   }




//                 </Picker>

//               </View>
//               {errors.village && <Text style={{ color: 'red' }}>{errors.village}</Text>}
//             </View>


//             {/* Project Area dropdown */}
//             <View style={{ margin: 5 }}>

//               <Text>Project Area*</Text>
//               <View style={styles.inputBox}>
//                 <Picker
//                   selectedValue={values.projectArea}
//                   onValueChange={(itemValue, itemIndex) => {

//                     setValues({ ...values, projectArea: itemValue });
//                   }}

//                 >
//                   <Picker.Item label="Select Project Area" value="" />
//                   {
//                     projectArea != null && projectArea.map((item) => (
//                       <Picker.Item key={item.key} label={item.name} value={item.name} />
//                     ))
//                   }




//                 </Picker>

//               </View>
//               {errors.projectArea && <Text style={{ color: 'red' }}>{errors.projectArea}</Text>}
//             </View>



         
//       {/* name of Activity */}
//       <View style={{ margin: 5 }}>

// <Text>Name of Activity*</Text>
// <View style={styles.inputBox}>
//   <Picker
//     selectedValue={values.nameOfActivity}
//     onValueChange={(itemValue, itemIndex) => {

//       setValues({ ...values, nameOfActivity: itemValue });
//     }}

//   >
//     {
//       activityName != null && activityName.map((item) => (
//         <Picker.Item key={item.key} label={item.name} value={item.name} />
//       ))}
//   </Picker>
// </View>
// {errors.nameOfActivity && <Text style={{ color: 'red' }}>{errors.nameOfActivity}</Text>}

// </View>