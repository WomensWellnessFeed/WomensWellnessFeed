import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { MenuItem } from '../components/MenuItem/MenuItem';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';
import { SettingsModal } from './SettingsModal/SettingsModal';

export const ProfileScreen: React.FC = () => {
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const styles = createStyles(theme);

    const [showSettingsModal, setShowSettingsModal] = React.useState(false);

    return (
        <>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                    }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Jane Doe</Text>
                <Text style={styles.email}>jane.doe@example.com</Text>
            </View>

            <View style={styles.section}>
                <MenuItem icon="bookmark" title="Saved Articles" onPress={() => {}} />
                <MenuItem icon="favorite" title="Liked Posts" onPress={() => {}} />
                <MenuItem icon="notifications" title="Notifications" onPress={() => {}} />
                <MenuItem
                    icon="settings"
                    title="Settings"
                    onPress={() => setShowSettingsModal(true)}
                />
                <MenuItem icon="help" title="Help & Support" onPress={() => {}} />
                <MenuItem icon="logout" title="Logout" onPress={() => {}} isLast />
            </View>

            <SettingsModal
                visible={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />
        </>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            backgroundColor: theme.surface,
            alignItems: 'center',
            padding: 32,
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 16,
        },
        name: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 4,
        },
        email: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        section: {
            backgroundColor: theme.surface,
            marginTop: 16,
        },
    });
