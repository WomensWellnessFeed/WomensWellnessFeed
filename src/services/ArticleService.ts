import { supabase } from '../lib/supabase';
import { fetchPosts, fetchCategories, mapWordPressCategoryToIcon } from '../api/wordpress';
import { Article, Category } from '../types';

const POSTS_PER_PAGE = 10;

export const fetchSavedArticleIds = async (): Promise<Set<string>> => {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw new Error(`Error fetching user: ${authError.message}`);
    if (!user) return new Set();

    const { data, error } = await supabase
        .from('saved_articles')
        .select('article_id')
        .eq('user_id', user.id);
    if (error) throw new Error(`Error fetching saved articles: ${error.message}`);

    return new Set(data.map(row => row.article_id.toString()));
};

// Fetches a page of articles from WordPress and tags each with isBookmarked
export const fetchArticlesWithBookmarks = async (
    page = 1,
    perPage = POSTS_PER_PAGE
): Promise<Article[]> => {
    const [posts, savedIds] = await Promise.all([
        fetchPosts(page, perPage),
        fetchSavedArticleIds(),
    ]);

    return posts.map(post => ({
        ...post,
        isBookmarked: savedIds.has(post.id.toString()),
    }));
};

export const fetchHomeCategories = async (): Promise<Category[]> => {
    const categoryData = await fetchCategories();
    return categoryData.map(category => ({
        id: category.id,
        name: category.name,
        icon: mapWordPressCategoryToIcon(category.slug),
    }));
};

export const toggleArticleBookmark = async (articleId: string): Promise<boolean> => {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError) {
        throw new Error(`Error fetching user: ${authError.message}`);
    }

    const { data: saved_articles, error: err } = await supabase
        .from('saved_articles')
        .select('*')
        .eq('article_id', articleId)
        .eq('user_id', user?.id);
    if (err) {
        throw new Error(`Error fetching saved articles: ${err.message}`);
    }

    if (saved_articles.length > 0) {
        const { error } = await supabase
            .from('saved_articles')
            .delete()
            .eq('article_id', articleId)
            .eq('user_id', user?.id);
        if (error) throw new Error(`Error removing saved article: ${error.message}`);
        return false;
    } else {
        const { error } = await supabase
            .from('saved_articles')
            .insert([{ article_id: articleId, user_id: user?.id }]);
        if (error) throw new Error(`Error bookmarking article: ${error.message}`);
        return true;
    }
};

export const POSTS_PER_PAGE_DEFAULT = POSTS_PER_PAGE;