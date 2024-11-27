import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Animated, ImageBackground } from 'react-native'; // Importando o ImageBackground corretamente
import { auth, db } from './firebaseConfig'; // Importe a configuração do Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Para pegar o documento do Firestore
import { useNavigation } from '@react-navigation/native'; // Importação do hook de navegação


const TelaInicial = () => {
  const navigation = useNavigation();  // Usando o hook de navegação
  const [user, setUser] = useState(null); // Armazenar dados do usuário
  const [fullName, setFullName] = useState(''); // Nome completo do usuário
  const [username, setUsername] = useState(''); // Nome de usuário
  const [email, setEmail] = useState(''); // Email do usuário

  const slideAnim = new Animated.Value(-500);  // Inicializando a animação diretamente

  // Função para alternar o container de animação
  const toggleContainer = () => {
    Animated.timing(slideAnim, {
      toValue: slideAnim._value === 0 ? -500 : 0, // Alterna entre -500 e 0
      duration: 1000, // Duração da animação
      useNativeDriver: true, // Usa o driver nativo para melhorar o desempenho
    }).start();
  };

  // Monitorar estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Verificar se o usuário foi autenticado corretamente
        const userRef = doc(db, "users", user.uid); // Acessa o documento do usuário no Firestore
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setFullName(userData.fullName);
              setUsername(userData.username);
              setEmail(userData.email);
            } else {
              console.log("Usuário não encontrado no Firestore");
            }
          })
          .catch((error) => {
            console.log("Erro ao recuperar dados do Firestore:", error);
          });
      } else {
        console.log("Usuário não está logado.");
      }
    });

    return () => unsubscribe(); // Limpeza do listener quando o componente for desmontado
  }, []);

  // Array de eventos com imagens e informações (adicione seus dados aqui)
  const eventsData = [
    { id: '1', image: require('./assets/mcigPerfil.jpg'), title: 'Display Expo', description: '' },
    { id: '2', image: require('./assets/mcigPerfil.jpg'), title: 'Belo horz', description: '' },
    { id: '3', image: require('./assets/mcigPerfil.jpg'), title: 'Evento 3', description: '' },
    { id: '4', image: require('./assets/mcigPerfil.jpg'), title: 'Evento 4', description: '' },
    { id: '5', image: require('./assets/mcigPerfil.jpg'), title: 'Evento 5', description: '' },
    { id: '6', image: require('./assets/mcigPerfil.jpg'), title: 'Evento 6', description: '' },
    { id: '7', image: require('./assets/mcigPerfil.jpg'), title: 'Evento 7', description: '' },
  ];

  return (
    <View style={styles.container}>
      {/* Usando ImageBackground corretamente agora */}

      <Animated.View
  style={[styles.slideContainer, { transform: [{ translateY: slideAnim }] }]}> {/* Aplica a animação de deslizamento */}
  
  
    {/* Agora a imagem de fundo ocupa o slideContainer */}
    <TouchableOpacity onPress={toggleContainer}>
      <Image source={require('./assets/mcigPerfil.jpg')} style={styles.slidePerfil1} />
    </TouchableOpacity>
    <Text style={styles.slideNome}>{fullName || 'Nome'}</Text>
    <Text style={styles.slideUsername}>@{username || 'Usuário'}</Text>
    <Text style={styles.slideEmail}>{email || 'Email'}</Text>
    <View style={styles.slideBotoes}>
      <Text style={styles.slideBotao}>Perfil</Text>
      <Text style={styles.slideBotao}>Mudar Plano</Text>
    </View>
  
</Animated.View>


      {/* CONTEÚDO DE BOAS VINDAS */}
      <View style={styles.cimas}>
        <View style={styles.bolaMenu2}>
          <TouchableOpacity onPress={toggleContainer}>
            <Image source={require('./assets/mcigPerfil.jpg')} style={styles.perfil1} />
          </TouchableOpacity>
        </View>

        {/* Exibir as informações do usuário */}
        <Text style={styles.textoCima}>
          Olá, {fullName || 'Usuário'}
        </Text>
        {/* Ao clicar na foto de perfil, navega para a tela de perfil */}
        <View style={styles.bolaMenu}>
          <Image source={require('./assets/menuInicial.png')} style={styles.MenuInicial} />
        </View>
      </View>

      {/* CONTEÚDO DOS EVENTOS */}
      <View style={styles.eventsContainer}>
        <FlatList
          data={eventsData}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <TouchableOpacity>
                <Image source={item.image} style={styles.eventImage} />
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDescription}>{item.description}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false} // Desabilita a barra de rolagem
        />
      </View>

      {/* CONTEÚDO DE MARCAR PRESENÇA */}
      <View style={styles.marcar}>
        <View style={styles.escreverCodigo}>
          <Image source={require('./assets/codeImg.png')} style={styles.botaoMarca} />
          <Text style={styles.escreverTexto}>Escrever</Text>
        </View>
        <View style={styles.QRcode}>
          <Image source={require('./assets/QRcodeImg.png')} style={styles.botaoMarca} />
          <Text style={styles.escreverTexto2}>QR code</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    height: 50,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  cimas: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 35,
  },
  bolaMenu: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  bolaMenu2: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
  },
  perfil1: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  botaoMarca: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  MenuInicial: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  textoCima: {
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    marginLeft: 10,
  },
  eventsContainer: {
    marginTop: 20,
    width: '100%',
  },
  eventItem: {
    marginTop: 10,
  },
  eventImage: {
    width: 95,
    height: 185,
    borderRadius: 10,
    resizeMode: 'cover',
    marginHorizontal: 'auto',
  },
  eventTitle: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Raleway-Regular',
    marginTop: 5,
    textAlign: 'center',
  },
  eventDescription: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    marginTop: 3,
  },
  marcar: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  escreverCodigo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171717',
    width: 140,
    height: 43,
    padding: 10,
    borderRadius: 30,
    marginRight: 'auto',
  },
  QRcode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 30,
    color: 'black',
    marginLeft: 'auto',
  },
  escreverTexto: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Raleway-SemiBold',
    marginLeft: 10,
  },
  escreverTexto2: {
    color: 'black',
    fontSize: 11,
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
  },
  slideBackgroundImage: {
    flex: 1, // Garantir que a imagem ocupe todo o espaço disponível
    width: '10%', // Garantir que a largura seja 100% do container
    height: 260, // Garantir que a altura seja 100% do container
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  slideContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#624199'
    
  },
  slideNome: {
    color: 'white',
    fontFamily: 'Raleway-Bold',
    fontSize: 30,
    marginTop: 10,
  },
  slideUsername: {
    color: '#f1f1f1'
  },
  slideEmail: {
    color: '#f1f1f1'
  },
  slidePerfil1: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  slideBotoes: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20


  },
  slideBotao: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Branco com opacidade de 0.8
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    width: 100,
    margin: 5,
    color: 'black',
  },
  
});

export default TelaInicial;
