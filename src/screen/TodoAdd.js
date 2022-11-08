import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../config/COLORS'


export default function TodoAdd({ navigation }) {
    const [todos, setTodos] = useState([])
    const [textInput, setTextInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getTodosFromDevice()
    }, [])

    const startLoading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        setTimeout(() => {
            addTodo()
        }, 2000)

    };

    const getTodosFromDevice = async () => {
        try {
            const todos = await AsyncStorage.getItem('todos')
            if (todos != null) {
                setTodos(JSON.parse(todos));
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        saveTodoToDevice(todos)
    }, [todos])

    const saveTodoToDevice = async todos => {
        try {
            const stringifyTodos = JSON.stringify(todos)
            await AsyncStorage.setItem('todos', stringifyTodos)
        } catch (e) {
            console.log(e)
        }
    }

    const addTodo = () => {
        if (textInput == '') {
            Alert.alert('Error', 'Please input name')
        }
        if (descriptionInput == '') {
            Alert.alert('Error', 'Please input description')
        }
        else {
            const newTodo = {
                id: Date.now(),
                task: textInput,
                description: descriptionInput,
                completed: false,
            }
            setTodos([...todos, newTodo])
            setTextInput('')
            setDescriptionInput('')
            Alert.alert('Added', 'Todo has been input', [
                {
                    text: "Ok",
                    onPress: () => navigation.navigate('TodoApp')
                }
            ])
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>

                {isLoading ? (
                    <ActivityIndicator
                        style={{
                            marginTop: 450,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        size="large"
                    />
                ) : (
                    <>
                        <View style={styles.header}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="arrow-back" size={35} color={COLORS.white} onPress={() => navigation.navigate('TodoApp', { data: todos })} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.primary }}>
                                Add Todo
                            </Text>
                            <Button
                                title="Done"
                                onPress={() => { startLoading() }}
                                color={COLORS.primary}
                            />
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.primary }}>Name</Text>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Add Todo'
                                    value={textInput}
                                    onChangeText={(text) => setTextInput(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.primary }}>Description</Text>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.inputContainer2}>
                                <TextInput
                                    placeholder='Add Todo'
                                    value={descriptionInput}
                                    onChangeText={(text) => setDescriptionInput(text)}
                                />
                            </View>
                        </View>
                    </>

                )}

            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
    },
    listItem: {
        padding: 20,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10
    },
    actionIcon: {
        height: 25,
        width: 25,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 3
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detail: {
        marginLeft: 25,
        marginTop: 50,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        backgroundColor: COLORS.white,
        elevation: 5,
        flex: 1,
        height: 50,
        marginTop: 5,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 10,
        paddingHorizontal: 20
    },
    inputContainer2: {
        backgroundColor: COLORS.white,
        elevation: 5,
        flex: 1,
        height: 150,
        marginTop: 5,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 10,
        paddingHorizontal: 20
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

