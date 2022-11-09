import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: "todos",
    initialState: [
        { id: 1, title: 'todo1', descriptopn: 'makan', completed: false },
        { id: 2, title: 'todo2', description: 'tidur', completed: false },
        { id: 3, title: 'todo3', description: 'tidur', completed: true },
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false
            };
            state.push(newTodo);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            )
            console.log(action.payload.id)
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        }
    }
})

export const {
    addTodo,
    toggleComplete,
    deleteTodo
} = todoSlice.actions;

export default todoSlice.reducer