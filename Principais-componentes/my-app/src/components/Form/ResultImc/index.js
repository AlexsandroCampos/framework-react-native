import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";

export default function ResultImc(props){
    const onshare = async () => {
        const result = await Share.share({
            message: "Meu imc hoje é: " + props.resultImc
        })
    }

    return(
        <View style={styles.resultImc}>
            <View style={styles.boxShareButton}>
                <Text style={styles.information}>{props.messageResultImc}</Text>
                <Text style={styles.numberImc}>{props.resultImc}</Text>
                
                <TouchableOpacity 
                style={styles.shared}
                onPress={onshare}
                >
                    <Text style={styles.sharedText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}