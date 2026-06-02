import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { FeedCard } from '../components/FeedCard';
import { Article } from '../types';
import { Theme } from '../theme/themes';

export const SearchScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<Article[]>([]);

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Icon name="search" size={20} color={theme.textSecondary} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search articles, topics, authors..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={theme.textSecondary}
                    returnKeyType="search"
                />
            </View>
            {results.length === 0 && searchQuery === '' && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Find what matters to you</Text>
                    <Text style={styles.emptySubtitle}>
                        Search for articles, topics, or authors
                    </Text>
                </View>
            )}
            <FlatList
                data={results}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
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

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 16,
            backgroundColor: theme.surface,
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: theme.border,
        },
        searchIcon: {
            marginRight: 8,
        },
        searchInput: {
            flex: 1,
            paddingVertical: 12,
            fontSize: 15,
            color: theme.text,
        },
        listContent: {
            paddingBottom: 24,
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 32,
        },
        emptyTitle: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.text,
            letterSpacing: -0.3,
            marginBottom: 8,
        },
        emptySubtitle: {
            fontSize: 14,
            color: theme.textSecondary,
            textAlign: 'center',
        },
    });
