import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import COLORS from '../../config/COLORS'
import { toggleComplete, deleteTodo } from '../../features/todo/todoSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function TodoItem(props) {
    const dispatch = useDispatch();

    const handleComplete = (todoId) => {
        dispatch(toggleComplete({
            id: todoId,
            completed: true
        }))
    }
    const handleDelete = (todoId) => {
        dispatch(deleteTodo({ id: todoId }))
    }
    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.primary,
                    textDecorationLine: props.todo.completed ? 'line-through' : 'none'
                }}>
                    {props.todo.title}
                </Text>
            </View>
            {
                !props.todo.completed && (
                    <TouchableOpacity style={[styles.actionIcon]} onPress={() => handleComplete(props.todo.id)}>
                        <MaterialIcons name="done" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                )
            }
            <TouchableOpacity
                style={[
                    styles.actionIcon,
                    { backgroundColor: 'red' }
                ]}
                onPress={() => handleDelete(props.todo.id)}
            >
                <MaterialIcons name="delete" size={20} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    )
}

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
});