import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ApiCall from "../components/apiCall";

export default function App() {
    const router = useRouter();
    const [date, setdate] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [dateMonth, setDateMonth] = useState<string>('/');
    
    const handleInputChange = (text: string, field: 'date' | 'month') => {
        if (field === 'date') {
            setdate(text);
        } else {
            setMonth(text);
        }
        setDateMonth(month + "/" + date);
        console.log(`Updated ${field}:`, text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to my app! FunFact by date</Text>
            <ApiCall date={dateMonth} />
            <TextInput
                style={styles.input}
                placeholder="Enter first value"
                value={date}
                onChangeText={(text) => handleInputChange(text, 'date')}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter second value"
                value={month}
                onChangeText={(text) => handleInputChange(text, 'month')}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});