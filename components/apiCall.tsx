import React, { useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Color } from "colors";
interface Config {
    date: string,

}

const ApiHndler: React.FC<Config> = ({ date }) => {

    const [data, setData] = useState<string>('');

    useEffect(() => {
        console.log("https://numbersapi.p.rapidapi.com/" + date + "/date")
        fetch("https://numbersapi.p.rapidapi.com/" + date + "/date", {
            method: 'GET',
            headers: {
                'x-rapidapi-host': process.env.EXPO_PUBLIC_API_HOST !,
                'x-rapidapi-key': process.env.EXPO_PUBLIC_API_KEY !,
            }
        }).then(response => {
            console.log(response.status)
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`)
                Promise.resolve("");
                //Promise.reject(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Parse JSON first
        })
            .then(responseData => {
                console.log(responseData)
                setData(responseData); // Store as string
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [setData, date]);

    return (
        <View style={styles.container}>
            <Text style={styles.data}>{data}</Text>
        </View>
    )
};

export default ApiHndler;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    data: {
        fontSize: 20,
    },

});