import { supabase } from '../lib/supabase';

export const articleService = async (articleId: string): Promise<boolean> => {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
        throw new Error(`Error fetching user: ${authError.message}`);
    }

    // fetch saved articles with the given articleId and userId to see if it's already saved
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

        if (error) {
            throw new Error(`Error removing saved article: ${error.message}`);
        }

        return false;
    } else {
        const { data, error } = await supabase
            .from('saved_articles')
            .insert([{ article_id: articleId, user_id: user?.id }]);

        if (error) {
            throw new Error(`Error bookmarking article: ${error.message}`);
        }

        return true;
    }

    return false;
};
