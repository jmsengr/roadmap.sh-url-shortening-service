
const set = new Set();

document.getElementById("main-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById("url");
    const url = urlInput.value;
    
    try { 
        const response = await fetch("http://localhost:3000/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        if (response.ok) {
            const res = await response.json();
            const shortCode = `${res.data.shortCode}`;

            // Already exists check
            if(shortCode) {
                if(set.has(shortCode)) {
                    return;
                } else {
                    set.add(shortCode);
                }
            }
           
            const resultElement = document.getElementById("result");

            const liTemplate = 
            `<li class="result-item">
                <p>http://localhost:3000/shorten/${shortCode}</p>
                <button class="copy-btn">Copy</button>
            </li>
            `;

            resultElement.insertAdjacentHTML("beforeend", liTemplate);

            const lastButton = resultElement.lastElementChild.querySelector(".copy-btn");

            if(!lastButton) return;

            lastButton.addEventListener("click", (e) => {
                navigator.clipboard.writeText(`http://localhost:3000/shorten/${shortCode}`);
                e.target.textContent = "Copied!";
                setTimeout(() => {
                    e.target.textContent = "Copy";
                }, 2000);
            })

        } else {
            alert("Failed to shorten URL");
        }

    } catch (error) {
        console.error("Error shortening URL:", error);
    }

})