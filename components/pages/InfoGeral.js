import { Text, View, StyleSheet } from 'react-native';

export default function InfoGeral(){

  return(
    <View style={styles.containerTataraVo}>
      <View style={styles.containerVo}>
        <View style={styles.cardTitle}>
          <Text>Informações Gerais:</Text>
        </View>
        <Text>
          O nosso aplicativo de criação de produtos é uma ferramenta simples e prática para ajudá-lo a gerenciar sua lista de produtos de forma eficiente. Com este aplicativo, você pode adicionar novos produtos fornecendo informações como nome, quantidade, valor e estado atual do produto e tendo a possibilidade para atualizar como quiser e a hora que quiser
        </Text>
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  containerTataraVo:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerVo: {
    width: '75%',
    height: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cardTitle:{
    alignItems: 'center',
    padding: 10,
  },
});