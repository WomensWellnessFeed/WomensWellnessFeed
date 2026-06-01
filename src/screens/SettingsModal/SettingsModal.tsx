import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../theme/themes';
import { useTheme } from '../../theme/ThemeContext';
import { useStores } from '../../store/StoreProvider';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
    const { SettingsStore } = useStores();

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

    console.log(SettingsStore);

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Settings</Text>

                        <TouchableOpacity onPress={onClose} hitSlop={12}>
                            <Icon name="close" size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Icon name="notifications" size={22} color={theme.primary} />
                            <Text style={styles.rowText}>Notifications</Text>
                        </View>

                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: theme.border, true: theme.accent }}
                            thumbColor={theme.surface}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Icon name="dark-mode" size={22} color={theme.primary} />
                            <Text style={styles.rowText}>Dark Mode</Text>
                        </View>

                        <Switch
                            value={SettingsStore.isDarkMode}
                            onValueChange={SettingsStore.toggleTheme}
                            trackColor={{ false: theme.border, true: theme.accent }}
                            thumbColor={theme.surface}
                        />
                    </View>

                    <TouchableOpacity style={styles.actionRow}>
                        <Icon name="person" size={22} color={theme.primary} />
                        <Text style={styles.rowText}>Edit Profile</Text>
                        <Icon name="chevron-right" size={24} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        backdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            justifyContent: 'center',
            padding: 24,
        },
        modal: {
            backgroundColor: theme.surface,
            borderRadius: 24,
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        title: {
            fontSize: 22,
            fontWeight: '700',
            color: theme.text,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        rowLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        rowText: {
            fontSize: 16,
            color: theme.text,
        },
        actionRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            gap: 12,
        },
        logoutButton: {
            marginTop: 16,
            backgroundColor: theme.primary,
            paddingVertical: 14,
            borderRadius: 999,
            alignItems: 'center',
        },
        logoutText: {
            color: theme.surface,
            fontSize: 16,
            fontWeight: '700',
        },
    });
