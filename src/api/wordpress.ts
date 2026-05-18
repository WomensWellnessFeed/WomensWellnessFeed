const BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/womenswellnessfeedstaging.wordpress.com';

export interface WordPressCategory {
    id: number;
    name: string;
    slug: string;
}

export interface WordPressPost {
    id: number;
    title: string;
    excerpt: string;
    publishedAt: string;
    link: string;
    category?: string;
    categoryId?: number;
    author?: string;
    imageUrl?: string;
    readTime?: number;
    likes?: number;
    isBookmarked?: boolean;
}

const stripHtml = (html: string): string => {
    return html.replace(/<[^>]+>/g, '').trim();
};

const decodeHtmlEntities = (text: string): string => {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&#8217;|&rsquo;/g, '’')
        .replace(/&#8220;|&ldquo;/g, '“')
        .replace(/&#8221;|&rdquo;/g, '”')
        .replace(/&#8211;|&ndash;/g, '–')
        .replace(/&#8212;|&mdash;/g, '—')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
};

const estimateReadTime = (text: string): number => {
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
};

const categoryIconMap: Record<string, string> = {
  sleep: 'bedtime',
  wellness: 'spa',
  'womens-health': 'favorite',
  fitness: 'fitness-center',      // 🔥 change here
  lifestyle: 'home',
  'mental-health': 'psychology',
  nutrition: 'restaurant',
  'self-care': 'self-improvement', // 🔥 change here
};

const getCategoryIcon = (slug: string) => categoryIconMap[slug.toLowerCase()] ?? 'label';

export const fetchCategories = async (): Promise<WordPressCategory[]> => {
    const response = await fetch(`${BASE_URL}/categories?hide_empty=true&per_page=50`);

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Unexpected response format from WordPress categories API');
    }

    return data.map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
    }));
};

export const fetchPosts = async (page = 1, perPage = 10): Promise<WordPressPost[]> => {
    const response = await fetch(`${BASE_URL}/posts?per_page=${perPage}&page=${page}&_embed`);

    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Unexpected response format from WordPress API');
    }

    return data.map((post: any) => {
        const embeddedCategory = post._embedded?.['wp:term']?.[0]?.[0];
        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
        const imageUrl =
            post.jetpack_featured_media_url ||
            featuredMedia?.source_url ||
            undefined;
        const contentText = stripHtml(post.content?.rendered ?? '');

        return {
            id: post.id,
            title: decodeHtmlEntities(post.title?.rendered?.trim() ?? 'Untitled'),
            excerpt: decodeHtmlEntities(stripHtml(post.excerpt?.rendered ?? post.content?.rendered ?? '')),
            publishedAt: post.date,
            link: post.link,
            category: decodeHtmlEntities(embeddedCategory?.name ?? ''),
            categoryId: embeddedCategory?.id,
            author: decodeHtmlEntities(post._embedded?.author?.[0]?.name ?? 'Author'),
            imageUrl,
            readTime: estimateReadTime(contentText),
            likes: Math.max(10, Math.min(999, Math.ceil(contentText.length / 15))),
            isBookmarked: false,
        };
    });
};

export const mapWordPressCategoryToIcon = (slug: string): string => getCategoryIcon(slug);
