// store.ts — Forum data store

export interface ForumPost {
  message: string;
  timestamp: number;
}

export function getPosts(): ForumPost[] {
  const data = localStorage.getItem("forum-posts-full");

  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addPost(message: string): ForumPost {
  const post: ForumPost = {
    message,
    timestamp: Date.now(),
  };

  const posts = getPosts();
  posts.push(post);

  localStorage.setItem("forum-posts-full", JSON.stringify(posts));

  return post;
}

export function clearPosts() {
  localStorage.removeItem("forum-posts-full");
}
