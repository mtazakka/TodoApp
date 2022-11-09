import React from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { toggleComplete, deleteTodo } from '../features/todo/todoSlice';
import COLORS from '../config/COLORS'


export default function TodoApp({ navigation }) {
    const dispatch = useDispatch()

    const todos = useSelector((state) => state.todos)
    const handleComplete = (todoId) => {
        dispatch(toggleComplete({
            id: todoId,
            completed: true
        }))
    }
    const handleDelete = (todoId) => {
        dispatch(deleteTodo({ id: todoId }))
    }

    const ListItem = ({ todo }) => {
        return (
            <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: COLORS.primary,
                        textDecorationLine: todo.completed ? 'line-through' : 'none'
                    }}>
                        {todo.title}
                    </Text>
                </View>
                {
                    !todo.completed && (
                        <TouchableOpacity style={[styles.actionIcon]} onPress={() => handleComplete(todo.id)}>
                            <MaterialIcons name="done" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity
                    style={[
                        styles.actionIcon,
                        { backgroundColor: 'red' }
                    ]}
                    onPress={() => handleDelete(todo.id)}
                >
                    <MaterialIcons name="delete" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        )
    }

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
            <FlatList
                data={todos}
                renderItem={({ item }) => <ListItem todo={item} />}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
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
    footer: {
        position: 'absolute',
        bottom: 0,
        color: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        backgroundColor: COLORS.white,
        elevation: 40,
        flex: 1,
        height: 50,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 30,
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

