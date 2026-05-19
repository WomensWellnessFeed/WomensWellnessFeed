import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';
import { Article } from '../types';

type HomeStackParamList = {
    ArticleDetail: { article: Article };
};

type ArticleDetailScreenProps = NativeStackScreenProps<HomeStackParamList, 'ArticleDetail'>;

export const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = ({ route }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { article } = route.params;
    const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '';

    return (
        <ScrollView style={styles.container}>
            {article.imageUrl ? <Image source={{ uri: article.imageUrl }} style={styles.heroImage} /> : null}
            <View style={styles.content}>
                {article.category ? <Text style={styles.category}>{article.category}</Text> : null}
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.author}>
                    By {article.author ?? 'Author'}{article.readTime ? ` • ${article.readTime} min read` : ''}
                </Text>
                {publishedDate ? <Text style={styles.date}>{publishedDate}</Text> : null}
                <Text style={styles.body}>{article.content ?? article.excerpt}</Text>
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
        date: {
            fontSize: 12,
            color: theme.textSecondary,
            marginBottom: 12,
        },
        body: {
            fontSize: 16,
            lineHeight: 24,
            color: theme.text,
        },
    });
