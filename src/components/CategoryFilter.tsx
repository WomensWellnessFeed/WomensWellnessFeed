import React from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
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
                style={[styles.chip, !selectedCategory && styles.chipActive]}
                onPress={() => onSelectCategory(null)}
                activeOpacity={0.8}
            >
                <Text style={[styles.chipText, !selectedCategory && styles.chipTextActive]}>
                    All
                </Text>
            </TouchableOpacity>
            {categories.map(category => {
                const isActive = selectedCategory === category.id;
                return (
                    <TouchableOpacity
                        key={category.id}
                        style={[styles.chip, isActive && styles.chipActive]}
                        onPress={() => onSelectCategory(category.id)}
                        activeOpacity={0.8}
                    >
                        <Icon
                            name={category.icon}
                            size={14}
                            color={isActive ? theme.surface : theme.textSecondary}
                            style={styles.icon}
                        />
                        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            minHeight: 52,
            maxHeight: 52,
            alignSelf: Platform.select({ web: 'center', default: 'auto' }),
            width: Platform.select({ web: '80%', default: '100%' }),
        },
        contentContainer: {
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 8,
        },
        chip: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: theme.surface,
        },
        chipActive: {
            backgroundColor: theme.primary,
        },
        chipText: {
            fontSize: 13,
            color: theme.textSecondary,
            fontWeight: '500',
            letterSpacing: 0.1,
        },
        chipTextActive: {
            color: theme.surface,
            fontWeight: '600',
        },
        icon: {
            marginRight: 5,
        },
    });
