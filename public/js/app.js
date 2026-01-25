
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
            `<li class="result-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; margin-bottom: 0.5rem;">
                <p>http://localhost:3000/shorten/${shortCode}</p>
                <button class="copy-btn"  style="background: none; border: none; padding: 0; cursor: pointer; color: #38bdf8; font-size: 1rem;">📋</button>
            </li>
            `;

            resultElement.insertAdjacentHTML("beforeend", liTemplate);

            // Fetched the last button
            const lastButton = resultElement.lastElementChild.querySelector(".copy-btn");

            if(!lastButton) return;

            lastButton.addEventListener("click", (e) => {
                navigator.clipboard.writeText(`http://localhost:3000/shorten/${shortCode}`);
                e.target.textContent = "✅";
                setTimeout(() => {
                    e.target.textContent = "📋";
                }, 2000);
            })

        } else {
            alert("Failed to shorten URL");
        }

    } catch (error) {
        console.error("Error shortening URL:", error);
    }

})