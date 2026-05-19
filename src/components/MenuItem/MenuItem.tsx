import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { Theme } from '../../theme/themes';

interface MenuItemProps {
    icon: string;
    title: string;
    onPress: () => void;
    isLast?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, isLast }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity style={[styles.menuItem, isLast && styles.menuItemLast]} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <Icon name={icon} size={24} color={theme.primary} />
                <Text style={styles.menuItemText}>{title}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        menuItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        menuItemLast: {
            borderBottomWidth: 0,
        },
        menuItemLeft: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        menuItemText: {
            fontSize: 16,
            color: theme.text,
            marginLeft: 16,
        },
    });
