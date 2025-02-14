import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set,get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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


let loginbtn = document.getElementById("Login")
loginbtn.addEventListener("click", async () => {
    let loginemailval = document.getElementById("emailinput").value.trim()
    let loginpassval = document.getElementById("passinput").value.trim()


    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passpattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;





    if (loginemailval === "" || loginpassval === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All inputs must be Filled!",
        });
    }
    else {
        if (!passpattern.test(loginpassval)) {
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

        else {
            try {

                // const data= await get(ref(database, `Users`), {
                //     name: signupnameval,
                //     uid: user.uid,  
                //     username: signupuserval,
                //     email: signupemailidval.value,
                //     experience_level: explevelval,
                //     original_language: langval,
                //     joined_on: getFormattedDate(),
                //   });
                
                //   console.log(data)

                // if(data){
                //     return console.log(data.val())
                // }

                await signInWithEmailAndPassword(author, loginemailval, loginpassval).then(() => {
                    Swal.fire({
                        title: "Logged in successfully",
                        icon: "success",
                        draggable: true
                    }).then(() => {
                        document.getElementById("emailinput").textContent = ""
                        document.getElementById("passinput").textContent = ""
                        location.href = "../Dashboard/dashboard.html"
                    })
                })
            }
            catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err
                });
            }
        }
    }

})

let signbtn = document.getElementById("signbtn")
signbtn.addEventListener("click", () => {
    location.href = "../Signup/signup.html"
})




