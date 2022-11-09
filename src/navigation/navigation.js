import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoApp from '../screen/TodoScreen';
import TodoAdd from '../screen/TodoAdd';
import AqiScreen from '../screen/AqiScreen';

const Stack = createNativeStackNavigator();

export function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TodoApp" component={TodoApp} options={{ headerShown: false }} />
            <Stack.Screen name="Air Quality Index" component={AqiScreen} />
            <Stack.Screen name="TodoAdd" component={TodoAdd} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default Navigation;