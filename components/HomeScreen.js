import React, { useState,useEffect } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { firebase } from './firebaseAuth.js';
import { useNavigation } from '@react-navigation/native';


const auth = firebase.auth()


const HomeScreen = ({ route }) => {
  console.log(route.params)  
  const todoRef = firebase.firestore().collection('produtosNelsons');
  const [textHeading, onChangeHeadingText] = useState('');
  const [quatidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [estado, setEstado] = useState('');

   useEffect(()=>{
    if(route.params){
      onChangeHeadingText(route.params.nomeProduto);
      setQuantidade(route.params.quantProduto);
      setValor(route.params.valorProduto);
      setEstado(route.params.estadoProduto);
    }
  },[route.params])

  const navigation = useNavigation();
  
  const updateTodo =() =>{
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.id)
        .update( {
          nomeProduto: textHeading,
          quantProduto: quatidade,
          valorProduto: valor,
          estadoProduto: estado,
        })
        .then(()=> {
          navigation.navigate('AddProduto')
        })
        .catch((error) => {
          alert(error.message)
        })
    }   

  }

    const handleSignOut = () => {
    auth
        .signOut()
        .then(()=> {
          navigation.navigate('Login')
        })
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textfield}
          onChangeText={(event) => {
            onChangeHeadingText(event)
          }}
          value={textHeading}
          placeholder="Update Nome"
        />
        <TextInput
          style={styles.textfield}
          onChangeText={(event) => {
            setQuantidade(event)
          }}
          value={quatidade}
          placeholder="Update Quantidade"
        />
        <TextInput
          style={styles.textfield}
          onChangeText={(event) => {
            setValor(event)
          }}
          value={valor}
          placeholder="Update Valor"
        />
        <TextInput
          style={styles.textfield}
          onChangeText={(event) => {
            setEstado(event)
          }}
          value={estado}
          placeholder="Update Estado"
        />
      <TouchableOpacity
        style={styles.buttonUpdate}
        onPress={() => {
          updateTodo();
        }}>
        <Text>UPDATE</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Desconectar</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#0de065',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

});

export default HomeScreen
