import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    // Simulando uma pausa de 2 segundos
    setTimeout(() => {
      navigation.navigate('Login'); // Redirecionar para a tela de Login após a pausa
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri : "https://upload.wikimedia.org/wikipedia/commons/b/b2/Conhecimento_Expandido.png"}}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text> SplashScreen de 3s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '80%',
  },
});

export default SplashScreen;