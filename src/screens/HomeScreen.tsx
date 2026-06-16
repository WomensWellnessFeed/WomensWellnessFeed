import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeedCard } from '../components/FeedCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Article, Category } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';
import { fetchPosts, fetchCategories, mapWordPressCategoryToIcon } from '../api/wordpress';

type HomeStackParamList = {
    HomeMain: undefined;
    ArticleDetail: { article: Article };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

const POSTS_PER_PAGE = 10;

export const HomeScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadResources();
    }, []);

    const loadResources = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [posts, categoryData] = await Promise.all([
                fetchPosts(1, POSTS_PER_PAGE),
                fetchCategories(),
            ]);

            setArticles(posts);
            setCategories(
                categoryData.map(category => ({
                    id: category.id,
                    name: category.name,
                    icon: mapWordPressCategoryToIcon(category.slug),
                }))
            );
            setPage(1);
            setHasMore(posts.length === POSTS_PER_PAGE);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to load articles.');
        } finally {
            setIsLoading(false);
        }
    };

    const loadArticles = async (pageToLoad = 1, refresh = false) => {
        if (refresh) {
            setIsRefreshing(true);
            setHasMore(true);
        } else if (pageToLoad === 1) {
            setIsLoading(true);
        } else {
            setIsLoadingMore(true);
        }

        setError(null);

        try {
            const posts = await fetchPosts(pageToLoad, POSTS_PER_PAGE);

            setArticles(prev =>
                pageToLoad === 1
                    ? posts
                    : [...prev, ...posts.filter(post => !prev.some(item => item.id === post.id))]
            );
            setPage(pageToLoad);
            setHasMore(posts.length === POSTS_PER_PAGE);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to load articles.');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
            setIsLoadingMore(false);
        }
    };

    const handleRefresh = async () => {
        await loadArticles(1, true);
    };

    const handleLoadMore = async () => {
        if (isLoading || isRefreshing || isLoadingMore || !hasMore) {
            return;
        }

        await loadArticles(page + 1);
    };

    const handleLike = (id: number) => {
        setArticles(prev =>
            prev.map(article =>
                article.id === id
                    ? {
                          ...article,
                          likes: (article.likes ?? 0) + 1,
                      }
                    : article
            )
        );
    };

    const handleBookmark = (id: number) => {
        setArticles(prev =>
            prev.map(article =>
                article.id === id
                    ? {
                          ...article,
                          isBookmarked: !article.isBookmarked,
                      }
                    : article
            )
        );
    };

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const openArticle = (article: Article) => {
        navigation.navigate('ArticleDetail', { article });
    };

    const filteredArticles = selectedCategory
        ? articles.filter(article => article.categoryId === selectedCategory)
        : articles;

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
            <FlatList
                data={filteredArticles}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <FeedCard
                        article={item}
                        onPress={() => openArticle(item)}
                        onLike={() => handleLike(item.id)}
                        onBookmark={() => handleBookmark(item.id)}
                    />
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.primary}
                    />
                }
                ListFooterComponent={
                    isLoadingMore ? (
                        <ActivityIndicator size="small" color={theme.primary} style={styles.footerLoader} />
                    ) : null
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{error ? 'Unable to load posts.' : 'No articles found'}</Text>
                    </View>
                }
            />
        </View>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        centerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        emptyContainer: {
            padding: 32,
            alignItems: 'center',
        },
        emptyText: {
            fontSize: 16,
            color: theme.textSecondary,
        },
        errorContainer: {
            padding: 16,
            backgroundColor: theme.surface,
            borderBottomWidth: 1,
            borderBottomColor: '#E2E8F0',
        },
        errorText: {
            color: theme.error || '#B00020',
            fontSize: 14,
            textAlign: 'center',
        },
        footerLoader: {
            marginVertical: 16,
        },
    });
