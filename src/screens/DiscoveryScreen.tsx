import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

export const DiscoveryScreen: React.FC = () => {
    return (
        <View style={styles.centerContainer}>
            <Text>Discovery Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});