import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ApiCall from "../components/apiCall";
import { Picker } from '@react-native-picker/picker';

export default function App() {
    const router = useRouter();
    const [date, setdate] = useState<string>('1'); // Default date to 01
    const [month, setMonth] = useState<string>('1'); // Default month to January
    const [dateMonth, setDateMonth] = useState<string>(month + "/" + date); // Initial dateMonth

    // Update dateMonth whenever date or month changes
    useEffect(() => {
        setDateMonth(month + "/" + date);
    }, [date, month]);

    const handleInputChange = (text: string, field: 'date' | 'month') => {
        if (field === 'date' ) {
            // Ensure day input is between 1 and 31
            const validDate = parseInt(text);
            if (validDate >= 1 && validDate <= 31) {
                setdate(validDate.toString().padStart(2, '0')); // Always keep two digits
            }
        } else if (field === 'month') {
            // Ensure month input is between 1 and 12
            const validMonth = parseInt(text);
            if (validMonth >= 1 && validMonth <= 12) {
                setMonth(validMonth.toString().padStart(2, '0')); // Always keep two digits
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to my app! FunFact by date</Text>
            <ApiCall date={dateMonth} />
            <TextInput
                style={styles.input}
                placeholder="Enter day (1-31), 1 deafult"
                onChangeText={(text) => handleInputChange(text, 'date')}
                keyboardType="numeric"
                maxLength={2} // Allow only two digits for date
            />
            <Picker
                style={styles.picker}
                onValueChange={(itemValue: string) => handleInputChange(itemValue, 'month')}>
                <Picker.Item label="January" value="01" />
                <Picker.Item label="February" value="02" />
                <Picker.Item label="March" value="03" />
                <Picker.Item label="April" value="04" />
                <Picker.Item label="May" value="05" />
                <Picker.Item label="June" value="06" />
                <Picker.Item label="July" value="07" />
                <Picker.Item label="August" value="08" />
                <Picker.Item label="September" value="09" />
                <Picker.Item label="October" value="10" />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value="12" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f9', // Light background for better contrast
    },
    title: {
        fontSize: 24,
        marginBottom: 30, // Added margin for better spacing
        fontWeight: 'bold', // Make the title bold
        color: '#333', // Darker color for better readability
    },
    input: {
        width: '80%',
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 10, // Slightly rounded corners for a smoother look
        backgroundColor: '#fff', // White background for the input field
        fontSize: 16,
    },
    picker: {
        width: '80%',
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff', // White background for the picker
    },
    button: {
        backgroundColor: '#3498db', // More attractive button color
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
