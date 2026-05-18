import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Article } from '../types';
import { colors } from '../theme/colors';

interface FeedCardProps {
    article: Article;
    onPress: () => void;
    onLike: () => void;
    onBookmark: () => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({ article, onPress, onLike, onBookmark }) => {
    const publishedDate = article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString()
        : '';

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {article.imageUrl ? (
                <Image source={{ uri: article.imageUrl }} style={styles.image} />
            ) : (
                <View style={styles.imagePlaceholder} />
            )}
            <View style={styles.content}>
                {article.category ? (
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{article.category}</Text>
                    </View>
                ) : null}
                <Text style={styles.dateText}>{publishedDate}</Text>
                <Text style={styles.title} numberOfLines={2}>
                    {article.title}
                </Text>
                <Text style={styles.excerpt} numberOfLines={4}>
                    {article.excerpt}
                </Text>
                <View style={styles.footer}>
                    <View style={styles.authorInfo}>
                        <Text style={styles.author}>{article.author}</Text>
                        {article.readTime ? (
                            <Text style={styles.readTime}> • {article.readTime} min read</Text>
                        ) : null}
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
                            <Icon name="favorite-border" size={20} color={colors.primary} />
                            <Text style={styles.actionText}>{article.likes ?? 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={onBookmark}>
                            <Icon
                                name={article.isBookmarked ? 'bookmark' : 'bookmark-border'}
                                size={20}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#F2F2F2',
    },
    content: {
        padding: 16,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.primary + '20',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    categoryText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    dateText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 8,
    },
    excerpt: {
        fontSize: 14,
        color: colors.textSecondary,
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
        flexShrink: 1,
    },
    author: {
        fontSize: 12,
        color: colors.text,
        fontWeight: '600',
    },
    readTime: {
        fontSize: 12,
        color: colors.textSecondary,
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
        color: colors.textSecondary,
    },
});
