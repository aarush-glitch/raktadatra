import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, set, child, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://raktadatra-3056b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const userRef = ref(database, "users");

const signupForm = document.getElementById("signup-form");
const appointmentForm = document.getElementById("appointment-form");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;
    const date = document.getElementById("date").value;
    const type = document.getElementById("person").value;
    const bloodGroup = document.getElementById("bloodgrp").value;
    const password = document.getElementById("password").value;

    const userData = {
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        date: date,
        type: type,
        bloodGroup: bloodGroup,
        password: password
    };

    // Pushing the user data to the Firebase database
    push(userRef, userData)
        .then(() => {
            alert("Thanks for registering yourself");
            if(userData.type === "Donor") {
                window.location.href = "donor.html";
            }
            else {
                window.location.href = "patient.html";
            }
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
});
