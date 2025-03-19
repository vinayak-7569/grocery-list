let groceryList = JSON.parse(localStorage.getItem("groceries")) || [];

function addItem() {
    let item = document.getElementById("item").value;
    let expiry = document.getElementById("expiry").value;

    // Validate inputs
    if (item && expiry) {
        groceryList.push({ item, expiry });
        localStorage.setItem("groceries", JSON.stringify(groceryList));
        displayList();
        clearInputs(); // Clear input fields after adding an item
    } else {
        alert("Please enter both an item and an expiry date.");
    }
}

function displayList() {
    let list = document.getElementById("groceryList");
    list.innerHTML = "";  // Clear previous list

    let today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

    groceryList.forEach((g, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${g.item} - Expiry: ${g.expiry} 
        <button onclick="removeItem(${index})">Remove</button>`;

        // If the expiry date is today or earlier, add the "expiring-soon" class
        if (g.expiry <= today) {
            li.classList.add("expiring-soon");
        }

        list.appendChild(li);
    });
}

function removeItem(index) {
    groceryList.splice(index, 1);  // Remove item from the list
    localStorage.setItem("groceries", JSON.stringify(groceryList));  // Save updated list to localStorage
    displayList();  // Re-render the grocery list
}

// Function to clear the input fields after adding an item
function clearInputs() {
    document.getElementById("item").value = '';
    document.getElementById("expiry").value = '';
}

// Load the grocery list when the page is loaded
displayList();
