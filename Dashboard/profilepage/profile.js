import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIkpWec4hXak835yrgmnZ3orphKZy7tmk",
  authDomain: "devconnect-2476b.firebaseapp.com",
  databaseURL: "https://devconnect-2476b-default-rtdb.firebaseio.com",
  projectId: "devconnect-2476b",
  storageBucket: "devconnect-2476b.firebasestorage.app",
  messagingSenderId: "193935282350",
  appId: "1:193935282350:web:f6c7f37d1fc5c941871d3f",
  measurementId: "G-1L41LT6HLF"
};

//cloudinary connection
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwumcfwz4/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const author = getAuth(app);
const database = getDatabase(app);


//createpost for reloading
let newpost=document.getElementById("post")
newpost.addEventListener("click",()=>{
    location.href="../Createpost/createpost.html"
})

//for enabling profile information
document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.getElementById("user"); // The user icon that toggles the menu
    const userMenu = document.getElementById("userbtn"); // The user menu
  
    if (userIcon && userMenu) {
      // Toggle menu on user icon click
      userIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent event from bubbling to document
        userMenu.classList.toggle("show"); // Toggle the 'show' class
      });
  
      // Close menu when clicking outside
      document.addEventListener("click", function (event) {
        if (!userMenu.contains(event.target) && event.target !== userIcon) {
          userMenu.classList.remove("show"); // Hide the menu
        }
      });
  
      // Prevent clicks inside the menu from closing it
      userMenu.addEventListener("click", function (event) {
        event.stopPropagation(); // Stop event from bubbling to document
      });
    } else {
      console.error("User icon or menu not found!");
    }
  
    // Handle profile navigation
    const profileLink = document.getElementById("profile");
    if (profileLink) {
      profileLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default behavior
        window.location.href = "../profilepage/profile.html"; // Navigate to profile page
      });
    }
  
    // Handle logout (if needed)
    const logoutLink = document.querySelector(".logout");
    if (logoutLink) {
      logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        // Add logout logic here
        console.log("Logout clicked");
      });
    }
  });



