import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth,onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref,get} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const author = getAuth(app);
 const database = getDatabase(app);


let logoutbtn=document.getElementById("logout")
logoutbtn.addEventListener("click", () => {
  Swal.fire({
    title: "User signed out successfully",
    icon: "success",
    draggable: true
  }).then(() => {
    signOut(author) 
      .then(() => {
        console.log(window.location.href);
        window.location.href = "/Login/login.html"; 
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
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



//for toggling a div when clicked on user
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
        window.location.href = "./profilepage/profile.html"; // Navigate to profile page
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



let newpost=document.getElementById("newpost")
newpost.addEventListener("click",()=>{
    location.href="./Createpost/createpost.html"
})


let myfeed = document.getElementById("myfeed");

myfeed.addEventListener("click", async () => {
  dashboardcards()
})


async function dashboardcards(){
  let divcontainer = document.getElementById("content");
  // let modalCard=document
  divcontainer.innerHTML=""
  try {
    const userRef = ref(database, `Users`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      
      Object.values(userData).forEach(singleuserdata => {
        if (singleuserdata.posts) {
          Object.values(singleuserdata.posts).forEach(singleuserpost => {
            
            let card = document.createElement("div");
            card.setAttribute("class","dashboardcard")
            card.style.width = "300px";
            card.style.height = "500px";
            card.innerHTML = `
              <div class='picandtitle'>
              <img src='${singleuserdata.profileimg || "default-profile.jpg"}' id='dcardprofilepic'> 
              <p id='dcardtitle'>${singleuserpost.title || "Untitled Post"}</p></div>
              <div class='cardhalf'>
              <div class='cardtimeandimg'>
                <p id='cardposttime'>${singleuserpost.created_on || "Unknown Date"}</p>
                <img src='${singleuserpost.thumbnailUrl || "default-thumbnail.jpg"}' id='cardpostthumbnail'>
              </div>
              <div class='cardfooter'>
                <div class='likeanddislike'>
                  <div class='like'>
                    <i class="fa-solid fa-heart" tabindex='0' id='likebtn'></i>
                    <p id='likecount'>${singleuserpost.like || 0}</p>
                  </div>
                  <i class='fa-solid fa-heart-crack' id='dislikebtn'></i>
                </div>
                <div class='footericons'>
                <i class='fa-regular fa-message' id='postcomments'></i>
                <i class='fa-regular fa-bookmark' id='postbookmark'></i>
                <i class='fa-solid fa-link' id='postlink'></i></div></div>
              </div>
            `;
            card.addEventListener("click",()=>{
             let modalCard=new bootstrap.Modal(document.getElementById("exampleModal"));
             let modaltitle=document.getElementById("modaltitle")
             let modaldesc=document.getElementById("modaldesc")
             let modaltime=document.getElementById("modaltime")
             let modalimage=document.getElementById("modalimage")
             let modallikecount=document.getElementById("modallikecount")
             let modalcommcount=document.getElementById("modalcommcount")
             console.log("Likes Count:", singleuserpost.like);


             modaltitle.textContent=`${singleuserpost.title}`
             modaldesc.textContent=`${singleuserpost.description}`
             modaltime.textContent=`${singleuserpost.created_on}`
             modalimage.src=`${singleuserpost.postimageUrl}`
             modallikecount.textContent=`${singleuserpost.like}`+" "+"likes"
            

             modalcommcount.textContent=`${singleuserpost.comments}`+0+" "+"Comments"

             modalCard.show()
            })
            divcontainer.append(card);
          });
        }
      });
    } else {
      console.log("No user data found in Realtime Database");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

}

dashboardcards()




