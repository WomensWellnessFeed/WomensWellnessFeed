import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Article } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

interface FeedCardProps {
    article: Article;
    onPress: () => void;
    onLike: () => void;
    onBookmark: () => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({ article, onPress, onLike, onBookmark }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
            {article.imageUrl && (
                <Image source={{ uri: article.imageUrl }} style={styles.image} />
            )}
            <View style={styles.content}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{article.category.toUpperCase()}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {article.title}
                </Text>
                <Text style={styles.excerpt} numberOfLines={2}>
                    {article.excerpt}
                </Text>
                <View style={styles.divider} />
                <View style={styles.footer}>
                    <View style={styles.authorInfo}>
                        <Text style={styles.author}>{article.author}</Text>
                        <Text style={styles.dot}>·</Text>
                        <Text style={styles.readTime}>{article.readTime} min read</Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={onLike} hitSlop={8}>
                            <Icon name="favorite-border" size={18} color={theme.primary} />
                            <Text style={styles.actionText}>{article.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={onBookmark} hitSlop={8}>
                            <Icon
                                name={article.isBookmarked ? 'bookmark' : 'bookmark-border'}
                                size={18}
                                color={article.isBookmarked ? theme.primary : theme.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        card: {
            backgroundColor: theme.surface,
            borderRadius: 20,
            marginHorizontal: 16,
            marginVertical: 8,
            overflow: 'hidden',
            ...Platform.select({
                ios: {
                    shadowColor: '#1C1A28',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.07,
                    shadowRadius: 16,
                },
                android: { elevation: 3 },
                web: {
                    boxShadow: '0px 4px 16px rgba(28, 26, 40, 0.07)',
                    alignSelf: 'center',
                    width: '80%',
                },
            }),
        },
        image: {
            width: '100%',
            height: 220,
        },
        content: {
            padding: 20,
        },
        categoryBadge: {
            alignSelf: 'flex-start',
            marginBottom: 10,
        },
        categoryText: {
            color: theme.primary,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 1.2,
        },
        title: {
            fontSize: 19,
            fontWeight: '700',
            color: theme.text,
            lineHeight: 26,
            marginBottom: 8,
            letterSpacing: -0.3,
        },
        excerpt: {
            fontSize: 14,
            color: theme.textSecondary,
            lineHeight: 21,
            marginBottom: 16,
        },
        divider: {
            height: 1,
            backgroundColor: theme.border,
            marginBottom: 14,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        authorInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },
        author: {
            fontSize: 13,
            color: theme.text,
            fontWeight: '600',
        },
        dot: {
            fontSize: 13,
            color: theme.textSecondary,
        },
        readTime: {
            fontSize: 13,
            color: theme.textSecondary,
        },
        actions: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        actionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        actionText: {
            fontSize: 13,
            color: theme.textSecondary,
            fontWeight: '500',
        },
    });
