import React from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Category } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: number | null;
    onSelectCategory: (categoryId: number | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <TouchableOpacity
                style={[styles.categoryChip, !selectedCategory && styles.categoryChipActive]}
                onPress={() => onSelectCategory(null)}
            >
                <Text style={[styles.categoryText, !selectedCategory && styles.categoryTextActive]}>
                    All
                </Text>
            </TouchableOpacity>
            {categories.map(category => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.categoryChip,
                        selectedCategory === category.id && styles.categoryChipActive,
                    ]}
                    onPress={() => onSelectCategory(category.id)}
                >
                    <Icon
                        name={category.icon}
                        size={16}
                        color={selectedCategory === category.id ? theme.surface : theme.primary}
                        style={styles.icon}
                    />
                    <Text
                        style={[
                            styles.categoryText,
                            selectedCategory === category.id && styles.categoryTextActive,
                        ]}
                    >
                        {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            minHeight: 50,
            maxHeight: 50,
            alignSelf: Platform.select({
                web: 'center',
                default: 'auto',
             }),
            width: Platform.select({
                web: '80%',
                default: '100%',
            }),
            marginBottom: 10,
        },
        contentContainer: {
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        categoryChip: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.primary,
            marginRight: 8,
        },
        categoryChipActive: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        categoryText: {
            fontSize: 14,
            color: theme.primary,
            fontWeight: '600',
        },
        categoryTextActive: {
            color: theme.surface,
        },
        icon: {
            marginRight: 4,
        },
    });
