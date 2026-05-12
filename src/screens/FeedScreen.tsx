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
import { Article, Category } from '../types';
import { colors } from '../theme/colors';

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Health', icon: 'favorite' },
  { id: '2', name: 'Wellness', icon: 'spa' },
  { id: '3', name: 'Lifestyle', icon: 'home' },
  { id: '4', name: 'Career', icon: 'work' },
  { id: '5', name: 'Relationships', icon: 'people' },
];

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding Hormonal Health in Your 30s',
    excerpt: 'Essential insights into maintaining hormonal balance and wellness during your thirties. Learn about the key changes and how to adapt your lifestyle.',
    author: 'Dr. Sarah Johnson',
    category: 'Health',
    publishedAt: '2024-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    readTime: 5,
    likes: 234,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Building Healthy Morning Routines',
    excerpt: 'Discover how to create a morning routine that sets you up for success. Simple, sustainable habits that make a real difference.',
    author: 'Emma Wilson',
    category: 'Wellness',
    publishedAt: '2024-01-14',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    readTime: 4,
    likes: 189,
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'Navigating Career Transitions with Confidence',
    excerpt: 'Expert advice on making career changes at any stage. Learn how to identify opportunities and overcome fear.',
    author: 'Lisa Chen',
    category: 'Career',
    publishedAt: '2024-01-13',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    readTime: 7,
    likes: 312,
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'The Power of Mindful Communication',
    excerpt: 'Transform your relationships through better communication. Practical tips for expressing yourself authentically.',
    author: 'Maya Patel',
    category: 'Relationships',
    publishedAt: '2024-01-12',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    readTime: 6,
    likes: 267,
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'Sustainable Living: Small Changes, Big Impact',
    excerpt: 'Practical ways to make your lifestyle more sustainable without overwhelming yourself. Start with these easy swaps.',
    author: 'Rachel Green',
    category: 'Lifestyle',
    publishedAt: '2024-01-11',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    readTime: 5,
    likes: 421,
    isBookmarked: true,
  },
];

export const FeedScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, [selectedCategory]);

  const loadArticles = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = selectedCategory
        ? MOCK_ARTICLES.filter((a) => a.category === selectedCategory)
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

  const handleLike = (id: string) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, likes: article.likes + 1 }
          : article
      )
    );
  };

  const handleBookmark = (id: string) => {
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
        keyExtractor={(item) => item.id}
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
