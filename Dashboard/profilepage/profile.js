// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// import { getDatabase, ref,get, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAIkpWec4hXak835yrgmnZ3orphKZy7tmk",
//   authDomain: "devconnect-2476b.firebaseapp.com",
//   databaseURL: "https://devconnect-2476b-default-rtdb.firebaseio.com",
//   projectId: "devconnect-2476b",
//   storageBucket: "devconnect-2476b.firebasestorage.app",
//   messagingSenderId: "193935282350",
//   appId: "1:193935282350:web:f6c7f37d1fc5c941871d3f",
//   measurementId: "G-1L41LT6HLF"
// };

// //cloudinary connection
// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwumcfwz4/image/upload";
// const CLOUDINARY_UPLOAD_PRESET = "ml_default";



// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const author = getAuth(app);
// const database = getDatabase(app);


// //createpost for reloading
// let newpost=document.getElementById("post")
// newpost.addEventListener("click",()=>{
//     location.href="../Createpost/createpost.html"
// })

// //for enabling profile information
// document.addEventListener("DOMContentLoaded", function () {
//     const userIcon = document.getElementById("user"); // The user icon that toggles the menu
//     const userMenu = document.getElementById("userbtn"); // The user menu
  
//     if (userIcon && userMenu) {
//       // Toggle menu on user icon click
//       userIcon.addEventListener("click", function (event) {
//         event.stopPropagation(); // Prevent event from bubbling to document
//         userMenu.classList.toggle("show"); // Toggle the 'show' class
//       });
  
//       // Close menu when clicking outside
//       document.addEventListener("click", function (event) {
//         if (!userMenu.contains(event.target) && event.target !== userIcon) {
//           userMenu.classList.remove("show"); // Hide the menu
//         }
//       });
  
//       // Prevent clicks inside the menu from closing it
//       userMenu.addEventListener("click", function (event) {
//         event.stopPropagation(); // Stop event from bubbling to document
//       });
//     } else {
//       console.error("User icon or menu not found!");
//     }
  
//     // Handle profile navigation
//     const profileLink = document.getElementById("profile");
//     if (profileLink) {
//       profileLink.addEventListener("click", function (event) {
//         event.preventDefault(); // Prevent default behavior
//         window.location.href = "../profilepage/profile.html"; // Navigate to profile page
//       });
//     }
  
//     // Handle logout (if needed)
//     const logoutLink = document.querySelector(".logout");
//     if (logoutLink) {
//       logoutLink.addEventListener("click", function (event) {
//         event.preventDefault();
//         // Add logout logic here
//         console.log("Logout clicked");
//       });
//     }
//   });

// //for getting info of the logged in user
// onAuthStateChanged(author, async (user) => {
//   if (user) {
//     const userRef = ref(database, `Users/${user.uid}`);  // ✅ Using UID instead of name
//     try {
//       const snapshot = await get(userRef);
//       if (snapshot.exists()) {
//         const userData = snapshot.val();
//         console.log("User Data:", userData);

//         // Update UI with fetched user data
//         document.getElementById("name").innerText = userData.name;
//         document.getElementById("username").innerText = userData.username;
//         document.getElementById("names").innerText = userData.name;
//         document.getElementById("usernames").innerText = userData.username;
//         document.getElementById("profileimg").src=userData.profileimg;
//         document.getElementById("profilepic").src=userData.profileimg;
//         document.getElementById("joindate").textContent="Joined"+" "+userData.joined_on;
//         document.getElementById("joindates").textContent="Joined on"+" "+userData.joined_on;



// } else {
//         console.log("No user data found in Realtime Database");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   } else {
//     console.log("No user is logged in");
//     window.location.href = "/login.html"; // Redirect to login if not authenticated
//   }
// });




// //for getting posts that user created
// const postcontentdiv=document.getElementById("forpostingcontent")
// const postdisplay=document.getElementById("postscreated")
// postdisplay.addEventListener("click",()=>{
//   onAuthStateChanged(author, async (user) => {
//     if (user) {
//       const userRef = ref(database, `Users/${user.uid}`);
//       const postRef = ref(database,`Users/${user.uid}/posts`)  // ✅ Using UID instead of name
//       try {
//         const snapshot1 = await get(userRef);
//         const snapshot2 = await get(postRef);
//         if (snapshot1.exists() && snapshot2.exists()) {
//           const userData = snapshot1.val();
//           const postData = snapshot2.val();
//           console.log("User Data:", userData);
//           console.log("logged in user post data:",postData)
//           Object.keys(postData).forEach(x=>{
//             const post = postData[x];
//             let singlepost=document.createElement("div")
//             singlepost.setAttribute("class","mypost")
//             console.log(x)
//             singlepost.innerHTML=`
//             <div class='viewpost1'>
//             <img src=${userData.profileimg} id='vp1_img'>
//             <div class='viewpost1_names'>
//             <p class='vp1_uname'>${userData.username}'s public Squad</p>
//             <p class='vp1_name'>${userData.name}</p>
//             </div>
//             </div>
  
//             <div class='viewpost2'>
//             <p class='vp_title'>${post.title}</p>
//             <img src='${post.thumbnailURL}' id='vp2_img'>
//             </div>
  
//             <div class='viewpost3'>
//             <div class='likeanddislike'>
//             <i class='fa-regular fa-heart' id='likebtn'></i> 
//             <i class='fa-solid fa-heart-crack' id='dislikebtn'></i>
//             </div>
//             <i class='fa-regular fa-message' id='postcomments'></i>
//             <i class='fa-regular fa-bookmark' id='postbookmark'></i>
//             <i class='fa-solid fa-link' id='postlink'></i>
//             </div>
//             `

//             postcontentdiv.append(singlepost);
//           })
//          } else {
//           console.log("No user data found in Realtime Database");
//           let nopostdata=document.createElement("p")
//           nopostdata.textContent=""
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.message,
//           });
        
//       }
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "No user is logged in",
//        });
//       window.location.href = "/login.html"; // Redirect to login if not authenticated
//     }
//   });
// })


// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth,onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Firebase Configuration
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

// Cloudinary Configuration
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwumcfwz4/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
  // Profile Menu Toggle
  const userIcon = document.getElementById("user");
  const userMenu = document.getElementById("userbtn");

  if (userIcon && userMenu) {
    userIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      userMenu.classList.toggle("show");
    });

    document.addEventListener("click", function (event) {
      if (!userMenu.contains(event.target) && event.target !== userIcon) {
        userMenu.classList.remove("show");
      }
    });

    userMenu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  // Profile Navigation
  const profileLink = document.getElementById("profile");
  if (profileLink) {
    profileLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "../profilepage/profile.html";
    });
  }

  // Logout Handling
  const logoutLink = document.querySelector(".logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Logout clicked");
      // Add Firebase logout logic here if needed
    });
  }

  // Create Post Button
  const newpost = document.getElementById("post");
  if (newpost) {
    newpost.addEventListener("click", () => {
      location.href = "../Createpost/createpost.html";
    });
  }

  // Fetch Logged-in User Data
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = ref(database, `Users/${user.uid}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("User Data:", userData);

          // Update UI with user data (only if elements exist)
          if (document.getElementById("name")) document.getElementById("name").innerText = userData.name;
          if (document.getElementById("username")) document.getElementById("username").innerText = userData.username;
          if (document.getElementById("names")) document.getElementById("names").innerText = userData.name;
          if (document.getElementById("usernames")) document.getElementById("usernames").innerText = userData.username;
          if (document.getElementById("profileimg")) document.getElementById("profileimg").src = userData.profileimg;
          if (document.getElementById("profilepic")) document.getElementById("profilepic").src = userData.profileimg;
          if (document.getElementById("joindate")) document.getElementById("joindate").textContent = "Joined " + userData.joined_on;
          if (document.getElementById("joindates")) document.getElementById("joindates").textContent = "Joined on " + userData.joined_on;
        } else {
          console.log("No user data found in Realtime Database");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("No user is logged in");
      window.location.href = "/login.html";
    }
  });

  // Display User Posts
  const postcontentdiv = document.getElementById("forpostingcontent");
  const postdisplay = document.getElementById("postscreated");

  if (postdisplay) {
    postdisplay.addEventListener("click", () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = ref(database, `Users/${user.uid}`);
          const postRef = ref(database, `Users/${user.uid}/posts`);

          try {
            const userSnapshot = await get(userRef);
            const postSnapshot = await get(postRef);

            if (userSnapshot.exists() && postSnapshot.exists()) {
              const userData = userSnapshot.val();
              const postData = postSnapshot.val();
              console.log("User Data:", userData);
              console.log("User Posts:", postData);

              postcontentdiv.innerHTML = ""; // Clear existing content before appending new posts

              Object.keys(postData).forEach((x) => {
                const post = postData[x];
                if (post) {
                  let singlepost = document.createElement("div");
                  singlepost.setAttribute("class", "mypost");
                  singlepost.innerHTML = `
                    <div class='viewpost1'>
                      <img src='${userData.profileimg}' id='vp1_img'>
                      <div class='viewpost1_names'>
                        <p class='vp1_uname'>${userData.username}'s public Squad</p>
                        <p class='vp1_name'>${userData.name}</p>
                      </div>
                    </div>

                    <div class='viewpost2'>
                      <p class='vp_title'>${post.title}</p>
                      <img src='${post.thumbnailUrl}' id='vp2_img'>
                    </div>

                    <div class='viewpost3'>
                      <div class='likeanddislike'>
                       <i class="fa-solid fa-heart" tabindex='0' id='likebtn'></i>
                        <i class='fa-solid fa-heart-crack' id='dislikebtn'></i>
                      </div>
                      <i class='fa-regular fa-message' id='postcomments'></i>
                      <i class='fa-regular fa-bookmark' id='postbookmark'></i>
                      <i class='fa-solid fa-link' id='postlink'></i>
                    </div>
                  `;
                  postcontentdiv.append(singlepost);
                }
              });
            } else {
              console.log("No posts found for this user.");
            }
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        } else {
          console.log("No user is logged in");
          window.location.href = "/login.html";
        }
      });
    });
    
    
  }
});

// Cloudinary Image Upload Function
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    return data.secure_url; // Return uploaded image URL
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}


let feedbutton=document.getElementById("myfeed")
feedbutton.addEventListener("click",()=>{
  location.href="../dashboard.html"
})

let logoutbtn=document.getElementById("logout")
logoutbtn.addEventListener("click", () => {
  Swal.fire({
    title: "User signed out successfully",
    icon: "success",
    draggable: true
  }).then(() => {
    signOut(auth) 
      .then(() => {
        console.log(window.location.href);
        window.location.href = "../../Login/login.html"; 
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
});