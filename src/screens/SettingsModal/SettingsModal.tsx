import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable, Switch } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Theme } from '../../theme/themes';
import { useTheme } from '../../theme/ThemeContext';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const styles = createStyles(theme);

    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.modal}>
                    <View style={styles.handle} />
                    <View style={styles.header}>
                        <Text style={styles.title}>Settings</Text>
                        <TouchableOpacity onPress={onClose} hitSlop={12} style={styles.closeBtn}>
                            <Icon name="close" size={18} color={theme.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.row}>
                            <View style={styles.rowLeft}>
                                <View style={styles.iconWrap}>
                                    <Icon name="notifications" size={18} color={theme.primary} />
                                </View>
                                <Text style={styles.rowText}>Notifications</Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: theme.border, true: theme.primary + '60' }}
                                thumbColor={notificationsEnabled ? theme.primary : theme.surface}
                            />
                        </View>

                        <View style={[styles.row, styles.rowLast]}>
                            <View style={styles.rowLeft}>
                                <View style={styles.iconWrap}>
                                    <Icon name="dark-mode" size={18} color={theme.primary} />
                                </View>
                                <Text style={styles.rowText}>Dark Mode</Text>
                            </View>
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleTheme}
                                trackColor={{ false: theme.border, true: theme.primary + '60' }}
                                thumbColor={isDarkMode ? theme.primary : theme.surface}
                            />
                        </View>
                    </View>

                    <View style={[styles.section, styles.sectionLast]}>
                        <TouchableOpacity style={[styles.row, styles.rowLast]}>
                            <View style={styles.rowLeft}>
                                <View style={styles.iconWrap}>
                                    <Icon name="person-outline" size={18} color={theme.primary} />
                                </View>
                                <Text style={styles.rowText}>Edit Profile</Text>
                            </View>
                            <Icon name="chevron-right" size={20} color={theme.border} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} activeOpacity={0.85}>
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
            backgroundColor: 'rgba(15, 14, 20, 0.5)',
            justifyContent: 'center',
            padding: 20,
        },
        modal: {
            backgroundColor: theme.surface,
            borderRadius: 28,
            padding: 20,
            paddingTop: 12,
        },
        handle: {
            width: 36,
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.border,
            alignSelf: 'center',
            marginBottom: 16,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        title: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.text,
            letterSpacing: -0.3,
        },
        closeBtn: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        section: {
            backgroundColor: theme.background,
            borderRadius: 14,
            marginBottom: 10,
            overflow: 'hidden',
        },
        sectionLast: {
            marginBottom: 16,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 13,
            paddingHorizontal: 14,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        rowLast: {
            borderBottomWidth: 0,
        },
        rowLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        iconWrap: {
            width: 34,
            height: 34,
            borderRadius: 9,
            backgroundColor: theme.primary + '14',
            alignItems: 'center',
            justifyContent: 'center',
        },
        rowText: {
            fontSize: 15,
            color: theme.text,
            fontWeight: '500',
        },
        logoutButton: {
            backgroundColor: theme.primary,
            paddingVertical: 15,
            borderRadius: 999,
            alignItems: 'center',
        },
        logoutText: {
            color: theme.surface,
            fontSize: 15,
            fontWeight: '700',
            letterSpacing: 0.2,
        },
    });
