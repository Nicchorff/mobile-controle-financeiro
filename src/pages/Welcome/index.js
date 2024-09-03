import React from "react";
import { View, Text , StyleSheet, TouchableOpacity} from "react-native";

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.titulo}>JustOne</Text>
            <Text style={styles.text}>Monitore seus gastos em um só lugar</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5636D3',
    },
    titulo: {
        color: '#FFF',
        fontSize: 40,
    },
    text: {
        color: '#FFF',
        fontSize: 20,
    },

});