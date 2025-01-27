import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDb3WPXoWlbrOA2eIhazjTjzZBpGXtmwvo",
    authDomain: "devconnect-12.firebaseapp.com",
    projectId: "devconnect-12",
    storageBucket: "devconnect-12.firebasestorage.app",
    messagingSenderId: "648442399765",
    appId: "1:648442399765:web:64fc9602e064ddec25921c",
    measurementId: "G-CF3CZ03ZCN"
  };

  const app = initializeApp(firebaseConfig);
  const author=getAuth(app)


let loginbtn=document.getElementById("Login")
loginbtn.addEventListener("click",async ()=>{
    let loginemailval=document.getElementById("emailinput").value.trim()
    let loginpassval=document.getElementById("passinput").value.trim()
   

    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passpattern=/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   
    
        


     if (loginemailval ==="" ||loginpassval===""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All inputs must be Filled!",
        });
    }
    else{
       if(!passpattern.test(loginpassval)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character."
        });
       }
       else if (!emailpattern.test(loginemailval)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please check, invalid email!",
            customClass: {
                popup: 'small-swal-popup',  // Custom class for the popup
                title: 'small-swal-title',  // Custom class for the title
                confirmButton: 'small-swal-button' // Custom class for button
            }
        });
    } 
    
    else{
        try{
          await signInWithEmailAndPassword(author,loginemailval,loginpassval).then(()=>{
            Swal.fire({
                title: "Logged in successfully",
                icon: "success",
                draggable: true
              }).then(()=>{
                document.getElementById("emailinput").textContent=""
                document.getElementById("passinput").textContent=""
                location.href="../Dashboard/dashboard.html"
              })
          })
        }
        catch(err){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:  err
            });
        }
       }
    }
    
})

let signbtn=document.getElementById("signbtn")
signbtn.addEventListener("click",()=>{
    location.href="../Signup/signup.html"
})




