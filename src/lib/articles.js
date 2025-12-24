import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

// Get all articles sorted by date
export function getSortedArticlesData() {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, '');

        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const result = matter(fileContents);

        return {
            id,
            ...result.data,
        };
    });

    return allArticlesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// Get Data for a specific article
export function getArticleData(id) {
    const fullPath = path.join(articlesDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { content, data } = matter(fileContents);

    return {
        id,
        content,
        data
    };
}
