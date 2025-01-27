import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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


const params= new URLSearchParams(location.search)
let emailval= params.get("email")

let signupemailidval=document.getElementById("emailinput")
signupemailidval.value=emailval
console.log(signupemailidval)



let signbtn=document.getElementById("signbtn")
signbtn.addEventListener("click",async ()=>{
    let signupnameval=document.getElementById("nameinput").value.trim()
    let signuppassval=document.getElementById("passinput").value.trim()
    let signupuserval=document.getElementById("usernameinput").value.trim()
    let explevelval=document.getElementById("explevel").value.trim()
    let langval=document.getElementById("lang").value.trim()

    const namePattern = /^[A-Za-z]{5,}$/;
    const passpattern=/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernamepattern= /^(?!.*__)[A-Za-z0-9_]{1,}$/;


    
    if (signupemailidval.value ==="" || signupnameval ==="" || signuppassval==="" || signupuserval==="" ||explevelval===""||langval===""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All inputs must be Filled!",
        });
    }
    else{
       if(!passpattern.test(signuppassval)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character."
        });
       }
       else if(!namePattern.test(signupnameval)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  "Invalid name! Only letters allowed with a minimum of 5 characters."
        });
       }
       else if(!usernamepattern.test(signupuserval)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  "Invalid username! Only letters, numbers, and a single underscore (_) are allowed."
        });
       }

       else{
        try{
          await createUserWithEmailAndPassword(author,signupemailidval.value,signuppassval).then(()=>{
            Swal.fire({
                title: "Signed in successfully",
                icon: "success",
                draggable: true
              }).then(()=>{
                document.getElementById("emailinput").textContent=""
                document.getElementById("nameinput").textContent=""
                document.getElementById("passinput").textContent=""
                document.getElementById("usernameinput").textContent=""
                document.getElementById("explevel").value=""
                document.getElementById("lang").value=""
                location.href="../Login/login.html"
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
