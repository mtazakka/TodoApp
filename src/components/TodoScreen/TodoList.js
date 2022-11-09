import React from "react"
import TodoItem from "./TodoItem";
import { useSelector } from 'react-redux';
import { FlatList } from "react-native";

export default function TodoList() {
    const todos = useSelector((state) => state.todos)
    return (
        <FlatList
            data={todos}
            renderItem={
                ({ item }) => <TodoItem todo={item} />}
        />
    )
}
