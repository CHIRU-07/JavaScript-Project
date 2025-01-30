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
    location.href="./createpost.html"
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


        









//Thumbnails//
const fileInput = document.getElementById("thumbnailimage");
const preview = document.getElementById("thumbnailpreview");
const label = document.getElementById("thumbnailimagelabel");
const remove = document.getElementById("removebtn");
document.getElementById("thumbnail").addEventListener("click", function() {
        fileInput.click(); // Opens file picker
});
document.getElementById("thumbnailimage").addEventListener("change", async function(event) {
    const file = event.target.files[0];

if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Required for unsigned uploads

    try {
        // Uploading to Cloudinary
        const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
            const imgURL = data.secure_url; // Get Cloudinary URL
            preview.src = imgURL;
            label.style.display = "none"; 
            preview.style.display="block";
            remove.style.display="block";
        } else {
            console.error("Cloudinary upload failed:", data);
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    }
    remove.addEventListener("click",(e)=>{
                e.stopPropagation()
                preview.src ="";
                label.style.display = "block"; 
                preview.style.display="none";
                remove.style.display="none";
            })

}
  });




//post-images
const fileInputforpostimages = document.getElementById("pimg");
const previewImg = document.getElementById("previewImg");
const removeBtn = document.getElementById("removeImg");
const labelforpostimg = document.getElementById("pimgLabel");
const textarea = document.getElementById("postthoughts");


labelforpostimg.addEventListener("click", function () {
    fileInputforpostimages.click();
});

fileInputforpostimages.addEventListener("change", async function (event) {
    const file = event.target.files[0];

    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Required for unsigned uploads

        try {
            // Uploading to Cloudinary
            const response = await fetch(CLOUDINARY_URL, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.secure_url) {
                const imgURL = data.secure_url; // Get Cloudinary URL
                previewImg.src = imgURL;
                previewImg.style.display = "block";
                removeBtn.style.display = "inline-block";
                textarea.value += `\n${imgURL}`;
                removeBtn.setAttribute("data-imgurl", imgURL); // Store URL for removal
            } else {
                console.error("Cloudinary upload failed:", data);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
});

removeBtn.addEventListener("click", function () {
    const imgURL = removeBtn.getAttribute("data-imgurl");
    previewImg.style.display = "none";
    previewImg.src = "";
    removeBtn.style.display = "none";
    fileInputforpostimages.value = "";

    // Remove the image URL from the textarea
    textarea.value = textarea.value.replace(imgURL, "").trim();
});


let newpostdata=document.getElementById("divbtnpost")
newpost.addEventListener("click",()=>{

})