import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Article } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

interface FeedCardProps {
    article: Article;
    onPress: () => void;
    onLike: () => void;
    onBookmark: () => void;
}

const { width } = Dimensions.get('window');

export const FeedCard: React.FC<FeedCardProps> = ({ article, onPress, onLike, onBookmark }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {article.imageUrl && <Image source={{ uri: article.imageUrl }} style={styles.image} />}
            <View style={styles.content}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{article.category}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {article.title}
                </Text>
                <Text style={styles.excerpt} numberOfLines={3}>
                    {article.excerpt}
                </Text>
                <View style={styles.footer}>
                    <View style={styles.authorInfo}>
                        <Text style={styles.author}>{article.author}</Text>
                        <Text style={styles.readTime}> • {article.readTime} min read</Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
                            <Icon name="favorite-border" size={20} color={theme.primary} />
                            <Text style={styles.actionText}>{article.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={onBookmark}>
                            <Icon
                                name={article.isBookmarked ? 'bookmark' : 'bookmark-border'}
                                size={20}
                                color={theme.primary}
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
            borderRadius: 12,
            marginHorizontal: 16,
            marginVertical: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            width: '80%',
            alignSelf: 'center',
        },
        image: {
            width: '100%',
            height: 200,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },
        content: {
            padding: 16,
        },
        categoryBadge: {
            alignSelf: 'flex-start',
            backgroundColor: theme.primary + '20',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
            marginBottom: 8,
        },
        categoryText: {
            color: theme.primary,
            fontSize: 12,
            fontWeight: '600',
        },
        title: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 8,
        },
        excerpt: {
            fontSize: 14,
            color: theme.textSecondary,
            lineHeight: 20,
            marginBottom: 12,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        authorInfo: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        author: {
            fontSize: 12,
            color: theme.text,
            fontWeight: '600',
        },
        readTime: {
            fontSize: 12,
            color: theme.textSecondary,
        },
        actions: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        actionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 16,
        },
        actionText: {
            marginLeft: 4,
            fontSize: 12,
            color: theme.textSecondary,
        },
    });
