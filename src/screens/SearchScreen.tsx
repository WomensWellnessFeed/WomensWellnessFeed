import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { colors } from '../theme/colors';
import { FeedCard } from '../components/FeedCard';
import { Article } from '../types';

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      {results.length === 0 && searchQuery === '' && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Search for articles, topics, or authors</Text>
        </View>
      )}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedCard
            article={item}
            onPress={() => {}}
            onLike={() => {}}
            onBookmark={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.surface,
  },
  searchInput: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: colors.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
