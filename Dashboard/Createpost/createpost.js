import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref,get,set,push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";


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
                // textarea.value += `\n${imgURL}`;
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
    // textarea.value = textarea.value.replace(imgURL, "").trim();
});



//for getting info of the logged in user
onAuthStateChanged(author, async (user) => {
  if (user) {
    const userRef = ref(database, `Users/${user.uid}`);  // ✅ Using UID instead of name
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("User Data:", userData);

        // Update UI with fetched user data
          document.getElementById("name").innerText = userData.name;
          document.getElementById("username").innerText = userData.username;
          document.getElementById("profileimg").src=userData.profileimg;
          document.getElementById("joindate").textContent="Joined on"+" "+userData.joined_on;
          
        } else {
        console.log("No user data found in Realtime Database");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.log("No user is logged in");
    window.location.href = "/login.html"; // Redirect to login if not authenticated
  }
});


//To add data into the logged in user when he creates a post

// Upload Post Function
let newpost_data=document.getElementById("divbtnpost")

newpost_data.addEventListener("click", async () => {
  const postthumbnail = document.getElementById("thumbnailpreview").src
  const posttitle = document.getElementById("pt").value.trim();
  const postdescription = document.getElementById("postthoughts").value.trim()
  const postpicture = document.getElementById("previewImg").src;

  if (!postthumbnail || !posttitle || !postdescription || !postpicture) {
   Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields are required!",
     });
    return;
  }

  onAuthStateChanged(author, async (user) => {
    if (user) {
      const userId = user.uid;
      const postRef = push(ref(database, `Users/${userId}/posts`)); // Unique post ID

      try {
        function getFormattedDate() {
          const date = new Date(); // Gets the current date
          const day = String(date.getUTCDate()).padStart(2, '0');
          const month = String(date.getUTCMonth() + 1).padStart(2, '0');
          const year = date.getUTCFullYear();
      
          return `${day}-${month}-${year}`;
        }
        
        // Store Post Data in Realtime Database
        await set(postRef, {
          title: posttitle,
          description: postdescription,
          postimageUrl: postpicture,
          thumbnailUrl: postthumbnail,
          like:0,
          comments:"",
          created_on: getFormattedDate(),
          
        });
        Swal.fire({
          title: "Post uploaded successfully!",
          icon: "success",
          draggable: true
        });
        const imgURL = removeBtn.getAttribute("data-imgurl");
        removeBtn.style.display = "none";
        fileInputforpostimages.value = "";
        preview.src ="";
        label.style.display = "block"; 
        preview.style.display="none";
        remove.style.display="none";
        document.getElementById("postthoughts").value="";
        document.getElementById("pt").value = "";
        document.getElementById("previewImg").style.display = "none";
        document.getElementById("previewImg").src = "";  
        document.getElementById("removeImg").style.display = "none"; // ✅ Hide remove button
        document.getElementById("pimg").value = "";  
        document.getElementById("thumbnailpreview").src = "";
        document.getElementById("thumbnailimage").value = "";
        document.getElementById("thumbnailimagelabel").style.display = "block";

      } catch (error) {
        console.error("Error uploading post:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          });
        
      }

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not logged in!",
        });
     
    }
  });
});


let feedbutton=document.getElementById("feedsection")
feedbutton.addEventListener("click",()=>{
  location.href="../dashboard.html"
})



// To Retrieve and Display Posts
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     const userId = user.uid;
//     const postsRef = ref(db, `Users/${userId}/posts`);

//     try {
//       const snapshot = await get(postsRef);
//       if (snapshot.exists()) {
//         const postsData = snapshot.val();
//         let postsHTML = "";

//         Object.keys(postsData).forEach((postId) => {
//           const post = postsData[postId];
//           postsHTML += `
//             <div class="post">
//               <img src="${post.thumbnail_url}" alt="Thumbnail">
//               <h3>${post.title}</h3>
//               <p>${post.description}</p>
//               <a href="${post.image_url}" target="_blank">View Full Image</a>
//             </div>
//           `;
//         });

//         document.getElementById("postsContainer").innerHTML = postsHTML;
//       } else {
//         document.getElementById("postsContainer").innerHTML = "<p>No posts found.</p>";
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   } else {
//     console.log("User not logged in");
//   }
// });
