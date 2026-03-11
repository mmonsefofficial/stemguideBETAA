// Replace with your actual API endpoint and key. 
// NOTE: For a live website, API keys should be hidden on a backend server, not exposed in the frontend code!
const API_URL = "YOUR_AI_API_ENDPOINT";
const API_KEY = "YOUR_API_KEY"; 

async function askAI() {
    const inputField = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const question = inputField.value;

    if (!question.trim()) return;

    // Display user's question
    chatBox.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
    inputField.value = '';

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Example fetch setup (adjust headers/body according to the specific API documentation)
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}` 
            },
            body: JSON.stringify({
                prompt: question,
                // Add instructions to guide the AI's persona
                system_instruction: "You are a helpful STEM tutor. Explain concepts clearly and concisely."
            })
        });

        const data = await response.json();
        
        // Extract the AI's text response (this path changes depending on the API provider)
        const aiResponse = data.choices[0].text; 

        // Display AI's response
        chatBox.innerHTML += `<p><strong>AI:</strong> ${aiResponse}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `<p style="color: red;"><strong>System:</strong> Connection error. Make sure your API key is configured.</p>`;
    }
}

// Allow pressing 'Enter' to send
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        askAI();
    }
});