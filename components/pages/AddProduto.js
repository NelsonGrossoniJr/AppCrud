import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import { firebase } from '../firebaseAuth';
import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const AddProduto = ({route}) => {
  
  const [addData, setAddData] = useState('');
  const [addData2, setAddData2] = useState('');
  const [addData3, setAddData3] = useState('');
  const [addData4, setAddData4] = useState('');
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('produtosNelsons')

  const navigation = useNavigation();

  useEffect(() => {
  todoRef.orderBy('nomeProduto', 'asc').onSnapshot((querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { nomeProduto, quantProduto, valorProduto, estadoProduto } = doc.data();  
      todos.push({
        id: doc.id,
        nomeProduto,
        quantProduto,
        valorProduto,
        estadoProduto 
      });
    });
    setTodos(todos);
  });
}, []);


  const addTodo = () => {
    
    if (addData && addData.length > 0 ){

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data  = { 
        nomeProduto: addData,
        quantProduto: addData2,
        valorProduto: addData3,
        estadoProduto: addData4,
        createdAt: timestamp,
      };

      todoRef
          .add(data)
          .then( () => {
            setAddData('');
            setAddData2('');
            setAddData3('');
            setAddData4('');
            Keyboard.dismiss;
          })
          .catch((error) => {
            alert('error')
          })
    }
  }

  const deleteTodo = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then( ()=> {
        alert('Deleted Sucessfully')
      })
      .catch((error) => {
        alert(error);
      })
  }

  return (
    // region Laytout
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.textHeadingContainer}>
        <Text style={styles.textHeading}>Todos App</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicione o nome do produto"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Adicione o preço do produto"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData3(heading)}
          value={addData3}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Adicione a quantidade do produto"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData2(heading)}
          value={addData2}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Adicione o estado do produto"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData4(heading)}
          value={addData4}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        
      </View>
      

      <FlatList
        style={{}}
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={{flex:1}}>
            <TouchableOpacity 
              style={styles.container}
              onPress={() => navigation.navigate('Home',  item )}>
              <FontAwesome
                name="trash-o"
                color="red"
                onPress={() => deleteTodo(item)}
                style={styles.todoIcon}
              />
              <View style={styles.innerContainerVo}>
                
                  <View style={styles.innerContainerPai}>
                    <View style={styles.innerContainerFilho}>
                      <Text>Produto:</Text>
                    </View>
                    <Text style={styles.itemHeading}>{item.nomeProduto}</Text>
                  </View>
                  <View style={styles.innerContainerPai}> 
                    <View style={styles.innerContainerFilho}>
                      <Text>Valor:</Text>
                    </View> 
                    <Text style={styles.itemHeading}>{item.valorProduto}</Text>
                  </View>
                  <View style={styles.innerContainerPai}>
                    <View style={styles.innerContainerFilho}>
                      <Text>Quantidade:</Text>
                    </View>
                    <Text style={styles.itemHeading}>{item.quantProduto}</Text>
                  </View>  
                  <View style={styles.innerContainerPai}>
                    <View style={styles.innerContainerFilho}>
                      <Text>Estado:</Text>
                    </View>
                    <Text style={styles.itemHeading}>{item.estadoProduto}</Text>
                  </View>   
                </View>
              
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
  // endregion
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeadingContainer: {
    paddingVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 24,
    
  },
  innerContainerVo: {
    width: '70%',
    flexDirection: 'column',
    marginLeft: 45,
  },
  
  innerContainerPai:{
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#788eec',
    borderRadius: 10,
    marginBottom: 5,
  },
  innerContainerFilho:{
    width: '100%',
    alignItems: 'center'
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
    marginBottom: 10,
  },
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    
    height: 250,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    marginBottom: 10,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },

  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
});
// endregion

export default AddProduto;