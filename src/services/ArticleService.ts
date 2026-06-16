import { supabase } from '../lib/supabase';

export interface article {
    id: string;
    title: string;
    content: string;
    author: string;
    published_at: string;
}

export interface savedArticle {
    id: string;
    article_id: string;
    user_id: string;
}

export const articleService = async (articleId: string, userId: string) => {
    const saveArticle = async () => {
        const { data, error } = await supabase
            .from('saved_articles')
            .insert({ article_id: articleId, user_id: userId });

        if (error) {
            throw new Error(`Error bookmarking article: ${error.message}`);
        }
    };

    const removeSavedArticle = async () => {
        const { error } = await supabase
            .from('saved_articles')
            .delete()
            .eq('article_id', articleId)
            .eq('user_id', userId);

        if (error) {
            throw new Error(`Error removing saved article: ${error.message}`);
        }
    };

    // fetch saved articles with the given articleId and userId to see if it's already saved
    const { data: savedArticles, error: err } = await supabase
        .from('saved_articles')
        .select('*')
        .eq('article_id', articleId)
        .eq('user_id', userId);

    if (err) {
        throw new Error(`Error fetching saved articles: ${err.message}`);
    }

    if (savedArticles.length > 0) {
        await removeSavedArticle();
    } else {
        await saveArticle();
    }
};
