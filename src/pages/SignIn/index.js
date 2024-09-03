import React from "react";
import { View, Text , StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function SigIn() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [info, setInfo] = React.useState("");

    const getLogin = async () => {
        try {
            setLoading(true);
            if (email === '' || password === '') {
                setLoading(false);
                return Alert.alert('Preencha todos os campos');
            }
    
            const response = await fetch('https://0890-187-64-136-249.ngrok-free.app/identity/login', { // Use o endereço IP da sua máquina se necessário
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            
            const data = await response.json();
            setLoading(false);
            if(response.status !== 200) {
                return Alert.alert('Não foi encontrado, verifique o email e senha');
            }

            AsyncStorage.setItem('token', data.accessToken);
            getToken();
            return Alert.alert('Login efetuado com sucesso');
    
        } catch (error) {
            console.log(error);
            Alert.alert('Erro na solicitação de rede', error.message);
        }
    }

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                setInfo(value);
            }
        } catch (error) {
            console.log(error);
        }
    }


    
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.card} animation="fadeInUp" duration={1500}>
                <Text style={styles.titulo}>Bem-vindo ao JustOne</Text>
                <Animatable.View animation="zoomIn" duration={1800}>
                    <TextInput 
                        style={styles.input} 
                        value={email} 
                        onChangeText={setEmail} 
                        placeholder="E-mail"
                     />
                    <TextInput 
                        style={styles.input} 
                        value={password} 
                        onChangeText={setPassword}
                        placeholder="Senha" 
                    />

                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.text}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => getLogin()}>
                        {loading ? (  <Text style={styles.login}>Carregando...</Text> ) : (  <Text style={styles.login}>Login</Text> )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.cadastrar}>Cadastrar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </Animatable.View>
            {info ? <Text>{info}</Text> : <Text>{info}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5636D3',
    },
    card: {
        backgroundColor: '#9C89B3',
        width: '100%',
        padding: 20,
        borderRadius: 32,
        alignItems: 'left',
    },
    titulo: {
        color: '#FFF',
        fontSize: 40,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFF',
        width: '100%',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    text: {
        color: '#000',
        fontSize: 15,
        textAlign: 'right',
    },
    login: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 16,
        marginTop: 10,
    },
    cadastrar: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#5636D3',
        padding: 10,
        borderRadius: 16,
        marginTop: 10,
    },

});
