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

const firebaseConfig = {
  apiKey: "AIzaSyBR1UeKEAJV4x3YOjzMFDsaSUwQiLgJNFQ",
  authDomain: "commentspagetests.firebaseapp.com",
  projectId: "commentspagetests",
  storageBucket: "commentspagetests.firebasestorage.app",
  messagingSenderId: "560501874254",
  appId: "1:560501874254:web:2cab2358cb517c3418ad1f",
  measurementId: "G-HYDSZ89BLH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const appname = "sendup";
const feedbackForm = document.getElementById("feedbackForm");
const commentTextarea = document.getElementById("comment");
const commentsList = document.getElementById("comments-list");
let commentsArray = [];
let userArray = [];
function getLog(){
    const inputElement = document.getElementById("rollNoInput");
    let rollNoInput = inputElement.value;
    let extras = extra.checked;
    let rollNo, grade;
    let logs = "MS";
  if(validate(rollNoInput)){
    rollNo = extract(rollNoInput).rollNo;
    grade = extract(rollNoInput).grade;} else{
    rollNo = 0; grade = 0;
    } 
    logs = logs + rollNo.toString() + grade.toString();
    logs += extras ? "Y" : "N";
    const art = document.getElementById("ART").checked;
    const com = document.getElementById("COM").checked;
    const gs = document.getElementById("GS").checked;
    let selected = document.querySelector('input[name="subject"]:checked');
    let newadd = "I";
    if (selected.value != "ICS") {
      if (selected.value == "PE") {
        newadd = "E";
      }
      if (selected.value == "PM") {
        newadd = "M";
      }
    }
    if (art) {
      newadd += "A";
    }
    if (com) {
      newadd += "C";
    }
    if (gs) {
      newadd += "G";
    }
    logs += newadd;
    return logs;
}
async function addComment(commentText) {
  try {
    await addDoc(collection(db, "sendup"), {
      text: commentText,
      timestamp: serverTimestamp(),
      roll: getLog()
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
      if(version == appname){ setversion(name.version);} 
         
    });
  });
}
function fetchComments() {
  const commentsRef = query(collection(db, "sendup"), orderBy("timestamp"));
  onSnapshot(commentsRef, (snapshot) => {
    commentsArray = []; 
    snapshot.forEach((doc) => {
      const commentData = doc.data();
      commentData.id = doc.id;
      commentsArray.push(commentData); 
    });
    displayCommentsWithDelay(true);
  });
}
function fetchUsers() {
  const userRef = query(collection(db, "user"));
  onSnapshot(userRef, (snapshot) => {
    userArray = []; 
    snapshot.forEach((doc) => {
      const userData = doc.data();
      userData.id = doc.id; 
      userArray.push(userData); 
    });

    fetchComments();
  });
} 
function formatTimeAgo(timestamp) {
  const now = new Date();
  
const diffInSeconds = Math.floor((now - timestamp) / 1000);
if (diffInSeconds < 60) {
  return diffInSeconds <= 0 ? "Just now" : `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
}
const diffInMinutes = Math.floor(diffInSeconds / 60);
if (diffInMinutes < 60) {
  return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
}
const diffInHours = Math.floor(diffInMinutes / 60);
if (diffInHours < 24) {
  return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
}
const diffInDays = Math.floor(diffInHours / 24);
if (diffInDays <= 14) {
  return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
} 
  return timestamp.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function refreshCom(){
  let newArray = [];
  const commentsRef = query(collection(db, "sendup"), orderBy("timestamp"));
  onSnapshot(commentsRef, (snapshot) => {
    snapshot.forEach((doc) => {
      const commentData = doc.data();
      commentData.id = doc.id;
      newArray.push(commentData); 
    });
    if (JSON.stringify(newArray) !== JSON.stringify(commentsArray)) {
  commentsArray = newArray;
  displayCommentsWithDelay(false);
    }
  });
} 
function scrollToBottom() {
  const commentsContainer = document.getElementById("comments-section");
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}
let adding = false;
async function displayCommentsWithDelay(scrolll) {
  if(adding) return;
  adding = true;
  commentsList.innerHTML = "";
  for (const comment of commentsArray) {
    if(scrolll) { await new Promise((resolve) => setTimeout(resolve, 10));} // 50ms delay
    const timestamp = comment.timestamp
      ? comment.timestamp.toDate()
      : new Date();
    let name = "";
    const timeAgo = formatTimeAgo(timestamp);
    const roll = comment.roll;
    if(roll!=null) {
      for(const dat of userArray){
        
        if(roll.includes(dat.roll.trim())){
          name = dat.name;
          break;
        }
      } 
    } 
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    if(name!=""){
      commentElement.innerHTML = `
      <p><strong>${name}:</strong> ${comment.text}</p>
      <div class="comment-time">${timeAgo}</div>
    `;
    } 
    else{
    commentElement.innerHTML = `
      <p>${comment.text}</p>
      <div class="comment-time">${timeAgo}</div>
    `;
 }   
    commentsList.appendChild(commentElement);
  }
  await new Promise((resolve) => setTimeout(resolve, 50));
  if(scrolll) scrollToBottom();
  adding = false;
}

document.getElementById("sub").addEventListener("click", () => {
  const commentText = commentTextarea.value;
  if (commentText) {
    addComment(commentText);
    commentTextarea.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {fetchUsers(); fetchVersion(); setInterval(refreshCom, 8000);}) ;
