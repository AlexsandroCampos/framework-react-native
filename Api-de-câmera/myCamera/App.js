import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermision, setHasPermision] = useState(null)

  useEffect (() => { //o componente precisa fazer algo apenas depois da renderização
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermision(status === "granted")
    }) 
  }, [])

  if(hasPermision === null) {
    return <View/>
  }

  if(hasPermision === false) {
    return <Text>Acesso negado</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
      style={styles.camera}
      type={type}
      ></Camera>
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
  }
});
