import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Image
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons"
import COLORS from "../config/COLORS";
import API from "../config/API";

export default function AqiScreen() {
    const [aqi, setAqi] = useState('')
    const [city, setCity] = useState('')
    const [temperature, setTemperature] = useState('')
    const [humidity, setHumidity] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [condition, setCondition] = useState({
        color: null,
        level: null,
        healthImplication: null,
        CautionaryStatement: null
    })

    useEffect(() => {
        axios.get(`http://api.airvisual.com/v2/nearest_city?key=${API.key}`)
            .then(response => {
                const { tp, hu, ws } = response.data.data.current.weather
                setAqi(response.data.data.current.pollution.aqius)
                setCity(response.data.data.city)
                setTemperature(tp)
                setHumidity(hu)
                setWindSpeed(ws)
                setCondition(getColor(response.data.data.current.pollution.aqius))
            });
    }, []);

    const getColor = (aqi) => {
        let classObj = {
            color: null,
            level: null,
            healthImplication: null,
            CautionaryStatement: null
        };
        if (aqi >= 0 && aqi <= 50) {
            return {
                color: "#009966",
                level: "Good",
                healthImplication: "Air quality is considered satisfactory, and air pollution poses little or no risk",
                CautionaryStatement: "Stay Health"
            }
        } else if (aqi > 50 && aqi < 100) {
            return {
                color: "#FFD384",
                level: "Moderate",
                healthImplication: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
            }
        } else if (aqi > 100 && aqi <= 150) {
            return {
                color: "#FF9933",
                level: "Unhealthy for Sensitive Groups",
                healthImplication: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
            }
        }
        else if (aqi > 150 && aqi <= 200) {
            return {
                color: "#CC0033",
                level: "Unhealthy",
                healthImplication: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion"
            }
        } else if (aqi > 200 && aqi <= 300) {
            return {
                color: "#660099",
                level: "Very Unhealthy",
                healthImplication: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
                CautionaryStatement: "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion."
            }
        } else if (aqi > 300) {
            return {
                color: "#7E0023",
                level: "Hazardous",
                healthImplication: "Health alert: everyone may experience more serious health effects",
                CautionaryStatement: "Everyone should avoid all outdoor exertion"
            }
        }
        return classObj
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            <View style={[
                styles.container,
                { backgroundColor: condition.color }]}>
                <View>
                    <Image
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            marginLeft: 15,
                            marginBottom: -15,
                        }}
                        source={require("../assets/images/businessman.png")}
                    />
                    <Text
                        style={{
                            marginTop: 20,
                            marginBottom: 0,
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: COLORS.white,
                            textAlign: "center"
                        }}>
                        {condition.level}
                    </Text>
                </View>
                <View>
                    <Text style={styles.aqiFont}>
                        {aqi}
                    </Text>
                    <Text>
                        AQI US
                    </Text>
                </View>
                <View>
                    <Text style={styles.detail}>
                        <Ionicons name="location"
                        />
                        {city}
                    </Text>
                    <Text style={styles.detail}>
                        <FontAwesome5Icon name="temperature-low"
                        />
                        {temperature}
                    </Text>
                    <Text style={styles.detail}>
                        <Ionicons
                            name='water-outline'
                        />
                        {humidity}%
                    </Text>
                    <Text style={styles.detail}>
                        <FontAwesome5Icon name="wind"
                        />
                        {windSpeed}kts
                    </Text>
                </View>
            </View>
            <View style={styles.container2}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    IMPLICATION
                </Text>
                <Text style={{
                    fontStyle: 'italic',
                    marginBottom: 40
                }}>
                    {condition.healthImplication}
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    CAUTION
                </Text>
                <Text style={{
                    fontStyle: 'italic'
                }}>
                    {condition.CautionaryStatement}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    aqiFont: {
        fontSize: 50,
        color: COLORS.white,
        textAlign: "center",
        paddingTop: -5
    },
    detail: {
        marginBottom: 5,
        fontWeight: 'bold',
        backgroundColor: 'white',
        width: 120,
        borderRadius: 5,
        paddingLeft: 5
    },
    container: {
        marginTop: 50,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 5,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container2: {
        marginTop: 50,
        marginHorizontal: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
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
