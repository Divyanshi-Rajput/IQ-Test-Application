function displayMessage(event) {
    event.preventDefault();  // Prevent form from submitting normally
    
    // Get the username and age
    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    
    // Store age in localStorage (for example)
    localStorage.setItem('age', age);

    // Display message and redirect to the quiz page
    alert("Data is submitted");
    window.location.href = "ques.html";  
}
