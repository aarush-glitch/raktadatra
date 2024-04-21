import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://raktadatra-3056b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const userRef = ref(database, "users");

const appointmentForm = document.getElementById("appointment-form");

onValue(userRef, function(snapshot) {
    let bArray = Object.values(snapshot.val())
    for(let i = 0; i < bArray.length; i++) {
        console.log(bArray[i])
    }
}) 

appointmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;
    const type = document.getElementById("type2").value;
    onValue(userRef, function(snapshot) {
        let bArray = Object.values(snapshot.val())
        for(let i = 0; i < bArray.length; i++) {
            if(bArray[i].email == email && bArray[i].password === password && bArray[i].type === type) {
                window.userPass = password;
                window.userEmail = email;
                alert("Logged in");
                if(type === "Donor") {
                    window.location.href = "donor.html";
                }
                else {
                    window.location.href = "patient.html?userId=" + bArray[i].userId; // Pass userId as a query parameter
                }
            }
        }
        alert("No user found");
    }) 
});
