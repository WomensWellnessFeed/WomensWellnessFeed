import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { MenuItem } from '../components/MenuItem/MenuItem';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';
import { SettingsModal } from './SettingsModal/SettingsModal';

export const ProfileScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [showSettingsModal, setShowSettingsModal] = React.useState(false);

    return (
        <>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatarWrap}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                            }}
                            style={styles.avatar}
                        />
                    </View>
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
                    <MenuItem icon="help-outline" title="Help & Support" onPress={() => {}} />
                    <MenuItem icon="logout" title="Log Out" onPress={() => {}} isLast />
                </View>
            </ScrollView>

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
            paddingTop: 36,
            paddingBottom: 28,
            paddingHorizontal: 24,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        avatarWrap: {
            width: 92,
            height: 92,
            borderRadius: 46,
            borderWidth: 3,
            borderColor: theme.primary + '30',
            marginBottom: 16,
            overflow: 'hidden',
            ...Platform.select({
                ios: {
                    shadowColor: '#1C1A28',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.12,
                    shadowRadius: 12,
                },
                android: { elevation: 4 },
            }),
        },
        avatar: {
            width: '100%',
            height: '100%',
        },
        name: {
            fontSize: 22,
            fontWeight: '700',
            color: theme.text,
            letterSpacing: -0.3,
            marginBottom: 4,
        },
        email: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        section: {
            backgroundColor: theme.surface,
            marginTop: 20,
            marginHorizontal: 16,
            borderRadius: 16,
            overflow: 'hidden',
            ...Platform.select({
                ios: {
                    shadowColor: '#1C1A28',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                },
                android: { elevation: 2 },
            }),
        },
    });
