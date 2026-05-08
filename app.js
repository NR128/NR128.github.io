// Configuration for posts
// When adding a new post, add its metadata here.
const posts = [
    {
        id: 'hello-world',
        title: 'Hello World: My First GitHub Blog Post',
        date: '2026-05-08',
        excerpt: 'Welcome to my new personal space. Here I will document my journey in learning AI, Data Science, and modern Web Development.',
        tags: ['intro', 'github']
    },
    {
        id: 'markdown-guide',
        title: 'Markdown formatting guide',
        date: '2026-05-07',
        excerpt: 'A quick guide to see how markdown is beautifully rendered using marked.js in this completely static vanilla JS blog.',
        tags: ['guide', 'markdown']
    }
];

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    
    // If we are on the index page
    if (postsContainer) {
        renderPosts(postsContainer);
    }
    
    // If we are on the post page
    const singlePostContainer = document.getElementById('single-post-content');
    if (singlePostContainer) {
        loadSinglePost(singlePostContainer);
    }
});

function renderPosts(container) {
    if (posts.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary)">No posts found.</p>';
        return;
    }

    const html = posts.map(post => `
        <article class="post-card" onclick="window.location.href='post.html?id=${post.id}'">
            <div class="post-meta">
                <span>${post.date}</span>
                <span>${post.tags.map(t => `#${t}`).join(' ')}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="read-more">
                Read Article
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
        </article>
    `).join('');

    container.innerHTML = html;
}

async function loadSinglePost(container) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const postMeta = posts.find(p => p.id === id);
    
    if (!id || !postMeta) {
        container.innerHTML = '<h1>Post not found</h1><p>The article you are looking for does not exist.</p>';
        return;
    }

    try {
        // Fetch the markdown file
        const response = await fetch(`posts/${id}.md`);
        if (!response.ok) throw new Error('Failed to load post');
        
        const markdown = await response.text();
        
        // Convert to HTML using marked.js
        const contentHtml = marked.parse(markdown);
        
        // Render
        document.title = `${postMeta.title} - NR's Tech Space`;
        container.innerHTML = `
            <div class="post-meta" style="justify-content: center; margin-bottom: 2rem;">
                <span>${postMeta.date}</span>
                <span>${postMeta.tags.map(t => `#${t}`).join(' ')}</span>
            </div>
            ${contentHtml}
        `;
    } catch (error) {
        console.error(error);
        container.innerHTML = '<h1>Error</h1><p>Could not load the markdown file. Ensure you are running through a local server or GitHub pages.</p>';
    }
}
