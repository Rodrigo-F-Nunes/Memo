import { GoogleGenerativeAI } from '@google/generative-ai';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import backButton from '../../assets/images/backButton.png';
import iconememo from '../../assets/images/iconememo.png';
import lupa from '../../assets/images/lupa.png';

const genAI = new GoogleGenerativeAI('AIzaSyCfB4Kvvzu-hLC0wmztHmWQRAQ8QTwapSQ');

const memoBotChat = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'Você é o MemoBot, um assistente virtual que ajuda os usuários a estudar e revisar seus cartões de memória. Seja amigável, prestativo e encorajador.',
    },
    {
      role: 'assistant',
      content: 'Olá! Eu sou o MemoBot, seu assistente de estudo. Como posso ajudar você hoje?',
    },
  ]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const chat = genAI.getGenerativeModel({ model: 'gemini-pro' }).startChat({
        history: newMessages.filter(msg => msg.role !== 'system'),
        generationConfig: {
          maxOutputTokens: 150,
        },
      });

      const result = await chat.sendMessage(userInput);
      const response = result.response.text();

      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Desculpe, houve um erro ao tentar responder. Tente novamente mais tarde.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => router.push('/home')}>
          <Image source={backButton} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={iconememo} style={styles.iconMemo} resizeMode="contain" />
        <TouchableOpacity style={styles.iconRight}>
          <Image source={lupa} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatBotInterface}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView style={styles.chatScroll} contentContainerStyle={{ paddingBottom: 80 }}>
          {messages
            .filter(msg => msg.role !== 'system')
            .map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  msg.role === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{msg.content}</Text>
              </View>
            ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#333"
            value={userInput}
            onChangeText={setUserInput}
            onSubmitEditing={sendMessage}
            editable={!loading}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
            <Text style={styles.sendButtonText}>{loading ? '...' : 'Enviar'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  iconLeft: {
    marginLeft: 10,
  },
  iconRight: {
    marginRight: 10,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  iconMemo: {
    width: 168,
    height: 73,
    alignSelf: 'center',
  },
  chatBotInterface: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  chatScroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#3B5EFF',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3B5EFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#3B5EFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default memoBotChat;
