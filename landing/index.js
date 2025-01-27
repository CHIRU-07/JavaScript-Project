let indexlogin = document.getElementById("indexlogin");
indexlogin.addEventListener("click", () => {
    location.href = "./Login/login.html";
});

//signup -btn
let indexsignup = document.getElementsByClassName("freesignup")[0];
indexsignup.addEventListener("click", () => {
    let emailidval = document.getElementById("emailinput").value.trim();
    console.log(emailidval);
  

    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailidval !== "") {
        if (!emailpattern.test(emailidval)) {
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
        } else {
            location.href = `./signup/signup.html?email=${encodeURIComponent(emailidval)}`;

            
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email Id cannot be empty",
            customClass: {
                popup: 'small-swal-popup',  // Custom class for the popup
                title: 'small-swal-title',  // Custom class for the title
                confirmButton: 'small-swal-button' // Custom class for button
            }
        });
    }
    
});
