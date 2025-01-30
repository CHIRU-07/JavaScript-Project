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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const author = getAuth(app);
const database = getDatabase(app);

const params = new URLSearchParams(window.location.search);
let emailval = params.get("email");

console.log("Retrieved Email:", emailval);


let signupemailidval = document.getElementById("emailinput");
signupemailidval.value = emailval;





let signbtn = document.getElementById("signbtn")
signbtn.addEventListener("click", async () => {
  let signupnameval = document.getElementById("nameinput").value.trim()
  let signuppassval = document.getElementById("passinput").value.trim()
  let signupuserval = document.getElementById("usernameinput").value.trim()
  let explevelval = document.getElementById("explevel").value.trim()
  let langval = document.getElementById("lang").value.trim()


  console.log(signupemailidval)
  console.log(signupnameval)
  console.log(signuppassval)
  console.log(signupuserval)
  console.log(explevelval)
  console.log(langval)




  const namePattern = /^[A-Za-z]{5,}$/;
  const passpattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernamepattern = /^(?!.*__)[A-Za-z0-9_]{1,}$/;



  if (signupemailidval.value === "" || signupnameval === "" || signuppassval === "" || signupuserval === "" || explevelval === "" || langval === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All inputs must be Filled!",
    });
  }
  else {
    if (!passpattern.test(signuppassval)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character."
      });
    }
    else if (!namePattern.test(signupnameval)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid name! Only letters allowed with a minimum of 5 characters."
      });
    }
    else if (!usernamepattern.test(signupuserval)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid username! Only letters, numbers, and a single underscore (_) are allowed."
      });
    }

    else {
      await createUserWithEmailAndPassword(author, signupemailidval.value, signuppassval)
  .then(() => {
    return set(ref(database, `Users/${signupnameval}`), { 
      name: signupnameval,
      username: signupuserval, 
      email: signupemailidval.value,
      password: signuppassval,
      experience_level: explevelval,
      original_language: langval
    });
  })
  .then(() => {
    Swal.fire({
      title: "Signed in successfully",
      icon: "success",
      draggable: true
    }).then(() => {
      document.getElementById("emailinput").value = "";
      document.getElementById("nameinput").value = "";
      document.getElementById("passinput").value = "";
      document.getElementById("usernameinput").value = "";
      document.getElementById("explevel").value = "";
      document.getElementById("lang").value = "";
      location.href = "../Login/login.html";
    });
  })
  .catch((err) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message 
    });
  });
    }
  }

})

