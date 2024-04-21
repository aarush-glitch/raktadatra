import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, set, child, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase app configuration
const appSettings = {
    databaseURL: "https://raktadatra-3056b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// Initialize Firebase app
const app = initializeApp(appSettings);
const database = getDatabase(app);

// Reference to the 'users' and 'requests' nodes in the database
const userRef = ref(database, "users");
const requestRef = ref(database, "requests");

// Function to get the current user's ID
function getCurrentUserId() {
    // This function assumes that the user is already logged in and you have their email stored in window.userEmail
    let userId = null;
    onValue(userRef, function(snapshot) {
        const users = snapshot.val();
        if (users) {
            Object.keys(users).forEach(key => {
                if (users[key].email === window.userEmail) {
                    userId = key; // Set userId to the key of the user object with matching email
                    return; // Exit the loop once userId is found
                }
            });
        }
    });
    return userId;
}

// Function to handle form submission
const requestForm = document.getElementById("bloodRequestForm");

requestForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get the current user's ID
    const userId = getCurrentUserId();

    // Extract request details from the form
    const location = document.getElementById("location").value;
    const bloodGroup = document.getElementById("bloodGroup").value;

    // Create a new blood request object
    const request = {
        userId: userId,
        location: location,
        bloodGroup: bloodGroup,
        // Add more details as needed
    };

    // Push the request data to the 'requests' node in the database
    push(requestRef, request)
        .then(() => {
            alert("Blood request submitted successfully!");
            // Optionally, reset the form
            requestForm.reset();
        })
        .catch((error) => {
            console.error("Error adding blood request: ", error);
        });
});
