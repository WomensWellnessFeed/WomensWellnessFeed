import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

export const ArticleDetailScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800' }}
                style={styles.heroImage}
            />
            <View style={styles.content}>
                <Text style={styles.category}>HEALTH</Text>
                <Text style={styles.title}>Understanding Hormonal Health in Your 30s</Text>
                <View style={styles.meta}>
                    <Text style={styles.author}>Dr. Sarah Johnson</Text>
                    <Text style={styles.metaDot}>·</Text>
                    <Text style={styles.readTime}>5 min read</Text>
                </View>
                <View style={styles.divider} />
                <Text style={styles.body}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                    {'\n\n'}
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Text>
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
        heroImage: {
            width: '100%',
            height: 300,
        },
        content: {
            padding: 24,
        },
        category: {
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 1.4,
            color: theme.primary,
            marginBottom: 12,
        },
        title: {
            fontSize: 28,
            fontWeight: '800',
            color: theme.text,
            lineHeight: 36,
            letterSpacing: -0.5,
            marginBottom: 14,
        },
        meta: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginBottom: 20,
        },
        author: {
            fontSize: 14,
            color: theme.text,
            fontWeight: '600',
        },
        metaDot: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        readTime: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        divider: {
            height: 1,
            backgroundColor: theme.border,
            marginBottom: 24,
        },
        body: {
            fontSize: 17,
            lineHeight: 28,
            color: theme.text,
            letterSpacing: 0.1,
        },
    });
