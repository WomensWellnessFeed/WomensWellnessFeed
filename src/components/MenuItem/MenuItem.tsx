import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
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
        <TouchableOpacity
            style={[styles.menuItem, isLast && styles.menuItemLast]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.left}>
                <View style={styles.iconWrap}>
                    <Icon name={icon} size={20} color={theme.primary} />
                </View>
                <Text style={styles.label}>{title}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={theme.border} />
        </TouchableOpacity>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        menuItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        menuItemLast: {
            borderBottomWidth: 0,
        },
        left: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
        },
        iconWrap: {
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: theme.primary + '14',
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            fontSize: 15,
            color: theme.text,
            fontWeight: '500',
        },
    });
