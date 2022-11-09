import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux'
import { createTodo } from '../features/todo/todoSlice'

export default function TodoForm() {

    const dispatch = useDispatch();

    const [value, setValue] = useState('')

    const handleAdd = () => {
        dispatch(createTodo(value))
        setValue('')
    }


    return (
        <View style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>
            <TextInput
                style={{
                    height: 40,
                    width: '75%',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#cccccc',
                    padding: 10,
                    boxSizing: 'border-box'
                }}
                placeholder="Masukkan Kerjaan"
                onChangeText={newValue => setValue(newValue)}
                defaultValue={value}
            />
            <TouchableOpacity onPress={handleAdd}>
                <View style={{ backgroundColor: '#04AA6D', padding: 10 }}>
                    <Text>Tambah</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}