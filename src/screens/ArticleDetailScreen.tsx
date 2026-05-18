import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

export const ArticleDetailScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800' }}
                style={styles.heroImage}
            />
            <View style={styles.content}>
                <Text style={styles.category}>Health</Text>
                <Text style={styles.title}>Understanding Hormonal Health in Your 30s</Text>
                <Text style={styles.author}>By Dr. Sarah Johnson • 5 min read</Text>
                <Text style={styles.body}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                    {'\n\n'}
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
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
            height: 250,
        },
        content: {
            padding: 16,
        },
        category: {
            fontSize: 12,
            color: theme.primary,
            fontWeight: '600',
            marginBottom: 8,
        },
        title: {
            fontSize: 28,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 8,
        },
        author: {
            fontSize: 14,
            color: theme.textSecondary,
            marginBottom: 24,
        },
        body: {
            fontSize: 16,
            lineHeight: 24,
            color: theme.text,
        },
    });
