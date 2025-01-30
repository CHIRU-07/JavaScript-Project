let indexsignup = document.getElementsByClassName("freesignup")[0];

indexsignup.addEventListener("click", () => {
    let emailidval = document.getElementById("emailinput").value.trim();
    console.log("Captured Email:", emailidval); // Debugging log

    if (emailidval !== "") {
        const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailpattern.test(emailidval)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please check, invalid email!",
            });
        } else {
            // Redirect with encoded email
            location.href = `./signup/signup.html?email=${encodeURIComponent(emailidval)}`;
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email Id cannot be empty",
        });
    }
});


let indexlogin=document.getElementById("indexlogin")
indexlogin.addEventListener("click",()=>{
    location.href="../Login/login.html"
})