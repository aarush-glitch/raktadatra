import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://raktadatra-3056b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const requestRef = ref(database, "requests");

// Get the current donor's location from the database or any other source
const donorLocation = "Delhi";

// Query to filter requests by location
const locationQuery = query(requestRef, orderByChild("location"), equalTo(donorLocation));

onValue(locationQuery, function(snapshot) {
    const requests = snapshot.val();
    if (requests) {
        const requestContainer = document.getElementById("request-container");
        requestContainer.innerHTML = ""; // Clear existing requests before adding new ones

        Object.keys(requests).forEach(key => {
            const request = requests[key];
            const requestItem = document.createElement("div");
            requestItem.classList.add("request-item");
            // console.log(request.email);
            requestItem.innerHTML = `
                <h4>Patient Email: ${request.email}</h4>
                <p>Blood Group: ${request.bloodGroup}</p>
                <p>Location: ${request.location}</p>
                <div class="btn-group" role="group" aria-label="Donation Options">
                    <button type="button" class="btn btn-success" onclick="acceptRequest('${key}')">Accept</button>
                    <button type="button" class="btn btn-danger" onclick="declineRequest('${key}')">Decline</button>
                </div>
            `;
            requestContainer.appendChild(requestItem);
        });
    }
});

function acceptRequest(requestId) {
    // Update the request status or perform any other action
    // For now, let's just remove the request from the database
    update(ref(requestRef, requestId), { status: "Accepted" })
        .then(() => {
            alert("Request accepted successfully!");
        })
        .catch((error) => {
            console.error("Error accepting request: ", error);
        });
}

function declineRequest(requestId) {
    // Update the request status or perform any other action
    // For now, let's just remove the request from the database
    update(ref(requestRef, requestId), { status: "Declined" })
        .then(() => {
            alert("Request declined successfully!");
        })
        .catch((error) => {
            console.error("Error declining request: ", error);
        });
}
