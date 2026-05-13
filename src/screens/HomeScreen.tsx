import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';
import { FeedCard } from '../components/FeedCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Article } from '../types';
import { colors } from '../theme/colors';
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '../constants/mocks';

export const HomeScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, [selectedCategory]);

  const loadArticles = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = selectedCategory
        ? MOCK_ARTICLES.filter((a) => a.category === MOCK_CATEGORIES[selectedCategory]?.name)
        : MOCK_ARTICLES;

      console.log(filtered, selectedCategory)
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
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, likes: article.likes + 1 }
          : article
      )
    );
  };

  const handleBookmark = (id: number) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryFilter
        categories={MOCK_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FeedCard
            article={item}
            onPress={() => console.log('Navigate to article:', item.id)}
            onLike={() => handleLike(item.id)}
            onBookmark={() => handleBookmark(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No articles found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
