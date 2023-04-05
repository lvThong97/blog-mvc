
const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector(".username-input").value.trim();
    const email = document.querySelector(".email-input").value.trim();
    const password = document.querySelector(".password-input").value.trim();

    const is_admin = false;
  
    if (password.length < 6) {
        alert("The minimum password length is 6 characters.");
    } else if (username && email && password) {
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ username, email, password, is_admin }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(
                "Failed to sign up. " +
                    response.status +
                    ": " +
                    response.statusText
            );
        }
    } else {
        alert("Please fill out all fields.");
    }
};

document
    .querySelector(".signup-button")
    .addEventListener("click", signupFormHandler);
