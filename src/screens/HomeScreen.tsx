import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    ActivityIndicator,
    TextInput,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { FeedCard } from '../components/FeedCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Article } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '../constants/mocks';
import { Theme } from '../theme/themes';

export const HomeScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadArticles();
    }, [selectedCategory]);

    const loadArticles = async () => {
        setIsLoading(true);
        setTimeout(() => {
            const filtered = selectedCategory
                ? MOCK_ARTICLES.filter(a => a.category === MOCK_CATEGORIES[selectedCategory]?.name)
                : MOCK_ARTICLES;
            setArticles(filtered);
            setIsLoading(false);
        }, 500);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadArticles();
        setIsRefreshing(false);
    };

    const handleLike = (id: number) => {
        setArticles(prev =>
            prev.map(a => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
        );
    };

    const handleBookmark = (id: number) => {
        setArticles(prev =>
            prev.map(a => (a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a))
        );
    };

    const visibleArticles = searchQuery.trim()
        ? articles.filter(a =>
              a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : articles;

    const ListHeader = (
        <>
            <View style={styles.hero}>
                {/* Title block */}
                <View style={styles.titleBlock}>
                    <Text style={styles.heroLine1}>Your wellness,</Text>
                    <MaskedView
                        maskElement={
                            <Text style={[styles.heroAccent, { backgroundColor: 'transparent' }]}>
                                simplified.
                            </Text>
                        }
                    >
                        <LinearGradient
                            colors={['#7D2D44', '#E8A598']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={[styles.heroAccent, { opacity: 0 }]}>simplified.</Text>
                        </LinearGradient>
                    </MaskedView>
                </View>

                <Text style={styles.heroSubtitle}>
                    Women's health content designed to help you feel your best.
                </Text>

                {/* Search bar with offset border frame */}
                <View style={styles.searchOuter}>
                    {/* Offset frame — rendered first so it paints behind the bar */}
                    <View style={styles.searchFrame} />
                    <View style={styles.searchBar}>
                        <Icon
                            name="search"
                            size={20}
                            color={theme.textSecondary}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="How can we help?"
                            placeholderTextColor={theme.textSecondary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            returnKeyType="search"
                            clearButtonMode="while-editing"
                        />
                    </View>
                </View>
            </View>

            <CategoryFilter
                categories={MOCK_CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
        </>
    );

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={visibleArticles}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={ListHeader}
                renderItem={({ item }) => (
                    <FeedCard
                        article={item}
                        onPress={() => console.log('Navigate to article:', item.id)}
                        onLike={() => handleLike(item.id)}
                        onBookmark={() => handleBookmark(item.id)}
                    />
                )}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.primary}
                        colors={[theme.primary]}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchQuery ? `No results for "${searchQuery}"` : 'No articles found'}
                        </Text>
                    </View>
                }
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
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
        hero: {
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 28,
            alignSelf: Platform.select({ web: 'center', default: 'auto' }),
            width: Platform.select({ web: '80%', default: '100%' }),
        },
        titleBlock: {
            marginBottom: 14,
        },
        heroLine1: {
            fontSize: 40,
            fontWeight: '300',
            color: theme.text,
            lineHeight: 50,
            letterSpacing: -0.5,
        },
        heroAccent: {
            fontSize: 40,
            fontWeight: '300',
            lineHeight: 50,
            letterSpacing: -0.5,
        },
        heroSubtitle: {
            fontSize: 16,
            color: theme.textSecondary,
            lineHeight: 24,
            maxWidth: 300,
            marginBottom: 24,
        },
        searchOuter: {
            marginBottom: 4,
        },
        searchFrame: {
            position: 'absolute',
            top: 6,
            left: 6,
            right: -6,
            bottom: -6,
            borderRadius: 18,
            backgroundColor: theme.primary + '12',
            ...Platform.select({
                ios: {
                    shadowColor: theme.primary,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 28,
                },
                android: {
                    elevation: 28,
                    shadowColor: theme.primary,
                },
                web: {
                    boxShadow: `0 0 32px 12px ${theme.primary}99`,
                },
            }),
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surface,
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: Platform.select({ ios: 0, default: 2 }),
            ...Platform.select({
                ios: {
                    shadowColor: '#1C1A28',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 16,
                },
                android: { elevation: 3 },
                web: { boxShadow: '0px 4px 16px rgba(28, 26, 40, 0.08)' },
            }),
        },
        searchIcon: {
            marginRight: 10,
        },
        searchInput: {
            flex: 1,
            fontSize: 16,
            color: theme.text,
            paddingVertical: 14,
        },
        listContent: {
            paddingBottom: 32,
        },
        emptyContainer: {
            padding: 48,
            alignItems: 'center',
        },
        emptyText: {
            fontSize: 15,
            color: theme.textSecondary,
            textAlign: 'center',
        },
    });
