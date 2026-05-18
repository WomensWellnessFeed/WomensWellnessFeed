import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

export const DiscoveryScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.centerContainer}>
            <Text style={styles.text}>Discovery Screen</Text>
        </View>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        centerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        text: {
            color: theme.text,
        },
    });
