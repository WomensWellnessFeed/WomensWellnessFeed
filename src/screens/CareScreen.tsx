import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

const NOTES = [
    {
        id: '1',
        content: 'Mild headache and fatigue this morning. Drank extra water and rested.',
        timestamp: 'Today • 8:30 AM',
        icon: 'note',
    },
    {
        id: '2',
        content: '30-minute yoga session. Feeling energized post-workout!',
        timestamp: 'Yesterday • 6:00 PM',
        icon: 'fitness-center',
    },
];

export const CareScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const SYMPTOMS = [
        {
            id: '1',
            label: 'Menstrual Cycle',
            value: 'Currently on day 12',
            icon: 'favorite',
            color: theme.trackingCycle,
            progress: 12,
            maxProgress: 28,
        },
        {
            id: '2',
            label: 'Mood Tracking',
            value: 'Currently feeling good',
            icon: 'sentiment-satisfied',
            color: theme.trackingMood,
            progress: 75,
            maxProgress: 100,
        },
        {
            id: '3',
            label: 'Energy Levels',
            value: 'Currently moderate',
            icon: 'bolt',
            color: theme.trackingEnergy,
            progress: 50,
            maxProgress: 100,
        },
    ];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome to your care</Text>
                <Text style={styles.headerSubtitle}>
                    A space to track all your symptoms, notes, and health information in one place.
                </Text>
            </View>

            {/* Symptom Tracking */}
            <View style={styles.section}>
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionTitle}>Symptom Tracking</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                {SYMPTOMS.map(item => (
                    <View key={item.id} style={styles.metricCard}>
                        <View
                            style={[styles.metricIconWrap, { backgroundColor: item.color + '20' }]}
                        >
                            <Icon name={item.icon} size={22} color={item.color} />
                        </View>
                        <View style={styles.metricText}>
                            <Text style={styles.metricLabel}>{item.label}</Text>
                            <Text style={styles.metricValue}>{item.value}</Text>
                            <View style={styles.progressTrack}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        {
                                            width: `${(item.progress / item.maxProgress) * 100}%` as any,
                                            backgroundColor: item.color,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                        <Icon name="chevron-right" size={20} color={theme.textSecondary} />
                    </View>
                ))}
            </View>

            {/* Recent Notes */}
            <View style={styles.section}>
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionTitle}>Recent Notes</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                {NOTES.map(note => (
                    <View key={note.id} style={styles.noteCard}>
                        <View style={styles.noteIconWrap}>
                            <Icon name={note.icon} size={18} color={theme.primary} />
                        </View>
                        <View style={styles.noteText}>
                            <Text style={styles.noteContent}>{note.content}</Text>
                            <Text style={styles.noteTimestamp}>{note.timestamp}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Quick Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionBtn, styles.actionBtnPrimary]}>
                    <Icon name="add-circle-outline" size={18} color={theme.primary} />
                    <Text style={styles.actionBtnText}>Add symptom</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]}>
                    <Icon name="note-add" size={18} color={theme.primary} />
                    <Text style={[styles.actionBtnText, { color: theme.primary }]}>Add note</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        content: {
            padding: 20,
            paddingBottom: 40,
        },
        header: {
            marginBottom: 28,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 8,
        },
        headerSubtitle: {
            fontSize: 14,
            color: theme.textSecondary,
            lineHeight: 20,
        },
        section: {
            marginBottom: 28,
        },
        sectionRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        sectionTitle: {
            fontSize: 17,
            fontWeight: '600',
            color: theme.text,
        },
        viewAll: {
            fontSize: 14,
            color: theme.primary,
            fontWeight: '500',
        },
        metricCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 14,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
        },
        metricIconWrap: {
            width: 42,
            height: 42,
            borderRadius: 21,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 14,
        },
        metricText: {
            flex: 1,
        },
        metricLabel: {
            fontSize: 13,
            color: theme.textSecondary,
            marginBottom: 2,
        },
        metricValue: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 8,
        },
        progressTrack: {
            height: 6,
            backgroundColor: theme.border,
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 4,
        },
        progressFill: {
            height: 6,
            borderRadius: 3,
        },
        progressLabel: {
            fontSize: 11,
            fontWeight: '500',
        },
        noteCard: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 14,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
        },
        noteIconWrap: {
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: theme.primary + '15',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
            marginTop: 2,
        },
        noteText: {
            flex: 1,
        },
        noteContent: {
            fontSize: 14,
            color: theme.text,
            lineHeight: 20,
            marginBottom: 4,
        },
        noteTimestamp: {
            fontSize: 12,
            color: theme.textSecondary,
        },
        actions: {
            flexDirection: 'row',
            gap: 12,
        },
        actionBtn: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 14,
            borderRadius: 12,
            gap: 8,
        },
        actionBtnPrimary: {
            backgroundColor: theme.primary,
        },
        actionBtnSecondary: {
            backgroundColor: theme.surface,
            borderWidth: 1.5,
            borderColor: theme.primary,
        },
        actionBtnPrimaryText: {
            color: theme.primary,
            fontWeight: '600',
            fontSize: 15,
        },
        actionBtnText: {
            fontWeight: '600',
            fontSize: 15,
        },
    });
