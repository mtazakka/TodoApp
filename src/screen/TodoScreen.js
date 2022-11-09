import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TodoList from '../components/TodoScreen/TodoList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../config/COLORS'


export default function TodoApp({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.header}>
                <Button
                    title="AQI"
                    onPress={() => navigation.navigate('Air Quality Index')}
                    color={COLORS.primary}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.primary }}>
                    Todo App
                </Text>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="add" size={35} color={COLORS.white} onPress={() => navigation.navigate('TodoAdd')} />
                </View>
            </View>
            <TodoList />
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconContainer: {
        height: 40,
        width: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        elevation: 40,
        justifyContent: 'center',
        alignItems: "center"
    },
});

