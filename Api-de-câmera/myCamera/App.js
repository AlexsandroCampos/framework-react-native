import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermision, setHasPermission] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if(hasPermision === null) {
    return <View/>
  }

  if(hasPermision === false) {
    return <Text>Acesso negado</Text>
  }

  async function takePicture() {
    if(camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri)
      setOpen(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
      style={styles.camera}
      type={type}
      ref={camRef}
      >
        <View style={styles.contentButtons}>
          <TouchableOpacity
          style={styles.buttonFlip}
          onPress={() => {
            type === Camera.Constants.Type.back 
            ? setType(Camera.Constants.Type.front) 
            : setType(Camera.Constants.Type.back)
          }}
          >
            <FontAwesome name='exchange' size={23} color="red"></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.buttonCamera}
          onPress={takePicture}
          >
            <FontAwesome name='camera' size={23} color="#FFF"></FontAwesome>
          </TouchableOpacity>
        </View>
      </Camera>

      {
        capturedPhoto &&
        <Modal
        animationType='slide'
        transparent={true}
        visible={open}
        >
          <View style={styles.contentModal}>
            <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => {setOpen(false)}}
            >
              <FontAwesome name='close' size={50} color="#fff"></FontAwesome>
            </TouchableOpacity>
            
            <Image style={styles.imgPhoto} source={{ uri: capturedPhoto }}></Image>
          </View>

        </Modal>
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonCamera: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  }
});
