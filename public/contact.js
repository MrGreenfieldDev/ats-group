const formContainer = document.getElementById('formContainer');
const contactForm = document.getElementById('contactForm');

// Initial content setup (assuming your form is already in the HTML)
// You should put your form HTML inside a div with id="formContainer"

// --- JavaScript for Submission ---
contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop the browser from navigating away
    
    const form = event.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tell the server we're sending JSON
            },
            // Convert form data to JSON string for Express to read easily
            body: JSON.stringify(formObject) 
        });

        if (response.ok) {
            // Success: Replace the form content with the thank you message
            formContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; border: 1px solid #4CAF50; background-color: #e8f5e9; border-radius: 5px;">
                    <h2 style="color: #4CAF50;">✅ Thank You!</h2>
                    <p>Your query has been successfully sent.</p>
                </div>
            `;
            contactForm.style.display = 'none';
            formContainer.scrollIntoView({ 
                behavior: 'smooth', // For a smooth animated scroll
                block: 'start'      // Aligns the top of the element to the top of the viewport
            });
        } else {
            // Failure: Display a user-friendly error
            alert('Oops! There was an issue sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('A network error occurred. Please check your connection.');
    }
});