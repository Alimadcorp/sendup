import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR1UeKEAJV4x3YOjzMFDsaSUwQiLgJNFQ",
  authDomain: "commentspagetests.firebaseapp.com",
  projectId: "commentspagetests",
  storageBucket: "commentspagetests.firebasestorage.app",
  messagingSenderId: "560501874254",
  appId: "1:560501874254:web:2cab2358cb517c3418ad1f",
  measurementId: "G-HYDSZ89BLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const appname = "sendup";
// DOM Elements
const feedbackForm = document.getElementById("feedbackForm");
const commentTextarea = document.getElementById("comment");
const commentsList = document.getElementById("comments-list");

// Array to store loaded comments
let commentsArray = [];

// Function to add a comment to Firestore
async function addComment(commentText) {
  try {
    await addDoc(collection(db, "sendup"), {
      text: commentText,
      timestamp: serverTimestamp(),
    });
    console.log("Comment added!");
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
}
function fetchVersion(){
  const versionCheck = query(collection(db, "version"));
  onSnapshot(versionCheck, (snapshot) => {
    snapshot.forEach((doc) => {
      let name = doc.data();
      let version = doc.id;
      if(version == appname){ setversion(name.version); }
    });
  });
}
// Fetch comments from Firestore
function fetchComments() {
  const commentsRef = query(collection(db, "sendup"), orderBy("timestamp"));
  onSnapshot(commentsRef, (snapshot) => {
    commentsArray = []; // Clear previous comments
    snapshot.forEach((doc) => {
      const commentData = doc.data();
      commentData.id = doc.id; // Add document ID for uniqueness
      commentsArray.push(commentData); // Push to the comments array
    });

    // Display comments one by one with a delay
    displayCommentsWithDelay();
  });
}

// Function to format the timestamp dynamically
function formatTimeAgo(timestamp) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  if (diffInSeconds < 60) {
    return diffInSeconds === 0 ? "Just now" : `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 14) {
    return `${diffInDays} days ago`;
  }

  // Return exact date if more than 14 days ago
  return timestamp.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Async function to display comments with a delay
async function displayCommentsWithDelay() {
  commentsList.innerHTML = ""; // Clear the list

  for (const comment of commentsArray) {
    await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms delay
    const timestamp = comment.timestamp
      ? comment.timestamp.toDate()
      : new Date();
    const timeAgo = formatTimeAgo(timestamp);

    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
      <p>${comment.text}</p>
      <div class="comment-time">${timeAgo}</div>
    `;

    commentsList.appendChild(commentElement);
  }
}

document.getElementById("sub").addEventListener("click", () => {
  const commentText = commentTextarea.value;
  if (commentText) {
    addComment(commentText);
    commentTextarea.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {fetchComments(); fetchVersion();}) ;