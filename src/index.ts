import {updateObjectInArray, ObjectShape} from "./updateObjectInArray.js";

// Task #1 - Get posts from remote API, iterate over them, and render them as new DOM nodes

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const apiUrl: string = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

function renderPosts(posts: Post[]) {
  const postsContainer = document.getElementById("posts-container");
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post-element";
    postElement.innerHTML = `
        <h2 class="post-title">Title: ${post.title}</h2>
        <p>${post.body}</p>`;
    if (postsContainer) {
      postsContainer.appendChild(postElement);
    } else {
      console.error("Posts container not found");
    }
  });
}

// Task#2
async function main() {
  const initialArray: ObjectShape[] = [
    { id: 1, name: "Iryna", age: 19 },
    { id: 2, name: "Maria", age: 21 },
    { id: 3, name: "Alex", age: 18 },
  ];

  const key = "id";
  const value = 2;
  const patch: Partial<ObjectShape> = { age: 25 };

  const updatedArray = await updateObjectInArray(
    initialArray,
    key,
    value,
    patch
  );
  console.log(updatedArray);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await getPosts();
    renderPosts(posts);
    await main();
  } catch (error) {
    console.error(getErrorMessage(error));
  }
});

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}