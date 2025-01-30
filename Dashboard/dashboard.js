// document.addEventListener("DOMContentLoaded", function () {
//     const userIcon = document.getElementById("user");
//     const userMenu = document.getElementById("userbtn");

//     if (userIcon && userMenu) {
//         userIcon.addEventListener("click", function (event) {
//             event.stopPropagation(); // Prevent click from bubbling to document
//             userMenu.classList.toggle("show"); // Toggle the 'show' class on each click
//         });

       
//         document.addEventListener("click", function (event) {
//             if (!userMenu.contains(event.target) && event.target !== userIcon) {
//                 userMenu.classList.remove("show"); 
//             }
//         });

        
//         userMenu.addEventListener("click", function (event) {
//             event.stopPropagation(); 
//         });
//     } else {
//         console.error("User icon or menu not found!");
//     }
// });


// let profiledata=document.getElementById("profile")
// console.log(profiledata)
// profiledata.addEventListener("click",()=>{
//     location.href="./profilepage/profile.html"
// })

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




