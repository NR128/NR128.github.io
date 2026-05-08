function loadGiscus() {
    const giscusContainer = document.querySelector('.giscus');
    if (!giscusContainer) return;

    // Remove any existing giscus script/iframe if loaded previously
    giscusContainer.innerHTML = '';

    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', 'NR128/NR128.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOSXY_wQ');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOSXY_wc4C8jkE');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'ko');
    script.crossOrigin = 'anonymous';
    script.async = true;

    giscusContainer.appendChild(script);
}

// Ensure the comments are loaded when the post is loaded
document.addEventListener('DOMContentLoaded', () => {
    // We delay the execution slightly to ensure the markdown is fully rendered if needed
    setTimeout(loadGiscus, 500);
});
