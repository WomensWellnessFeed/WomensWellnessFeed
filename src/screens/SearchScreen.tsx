import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
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
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={theme.textSecondary}
                />
            </View>
            {results.length === 0 && searchQuery === '' && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Search for articles, topics, or authors</Text>
                </View>
            )}
            <FlatList
                data={results}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <FeedCard article={item} onPress={() => {}} />}
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
        searchContainer: {
            padding: 16,
            backgroundColor: theme.surface,
        },
        searchInput: {
            backgroundColor: theme.background,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            fontSize: 16,
            color: theme.text,
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 32,
        },
        emptyText: {
            fontSize: 16,
            color: theme.textSecondary,
            textAlign: 'center',
        },
    });
