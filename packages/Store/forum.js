// forum.js — handles UI and connects to store.ts (compiled as store.js)

// Load existing posts
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("forum-posts") || "[]");

    const container = document.getElementById("posts");
    container.innerHTML = "";

    if (posts.length === 0) {
        container.innerHTML = "<p style='opacity:0.6;'>No posts yet.</p>";
        return;
    }

    posts.forEach((post) => {
        const element = document.createElement("div");
        element.style = `
            padding:12px;
            margin-bottom:10px;
            background:#1A1C1E;
            border-radius:8px;
            border:1px solid #2a2d30;
        `;
        element.innerHTML = `
            <p style="white-space:pre-wrap; font-size:15px;">${post}</p>
        `;
        container.appendChild(element);
    });
}

// Send post
document.getElementById("send-btn").addEventListener("click", () => {
    const input = document.getElementById("post-input");
    const text = input.value.trim();
    if (!text) return;

    // Save to localStorage
    let posts = JSON.parse(localStorage.getItem("forum-posts") || "[]" );
    posts.push(text);

    localStorage.setItem("forum-posts", JSON.stringify(posts));

    input.value = "";
    loadPosts();
});

loadPosts();
