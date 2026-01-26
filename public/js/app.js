const set = new Set();

document.getElementById("main-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById("url");
    const url = urlInput.value;

    // Creating POST request to shorten URL
    try {
        const response = await fetch("http://localhost:3000/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            alert("Failed to shorten URL", response.error);
        }

        const res = await response.json();
        const shortCode = `${res.data.shortCode}`;

        // Already exists check
        if (shortCode) {
            if (set.has(shortCode)) {
                return;
            } else {
                set.add(shortCode);
            }
        }

        const resultElement = document.getElementById("result");

        const liTemplate = `<li class="result-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; margin-bottom: 0.5rem;">
                <p>http://localhost:3000/shorten/${shortCode}</p>
                <button class="copy-btn"  style="background: none; border: none; padding: 0; cursor: pointer; color: #38bdf8; font-size: 1rem;">📋</button>
                <button class="copy-btn"  style="background: none; border: none; padding: 0; cursor: pointer; color: #38bdf8; font-size: 1rem;">❌</button>
                <button class="copy-btn"  style="background: none; border: none; padding: 0; cursor: pointer; color: #38bdf8; font-size: 1rem;">📊</button>
            </li>
            `;

        resultElement.insertAdjacentHTML("beforeend", liTemplate);

        // Fetched the last button
        const lastCopyButton = resultElement.lastElementChild.querySelector(".copy-btn");
        const lastDeleteButton = resultElement.lastElementChild.querySelectorAll(".copy-btn")[1];
        const lastStatsButton = resultElement.lastElementChild.querySelectorAll(".copy-btn")[2];

        if (!lastCopyButton) return;
        lastCopyButton.addEventListener("click", (e) => {
            navigator.clipboard.writeText(`http://localhost:3000/shorten/${shortCode}`);
            e.target.textContent = "✅";
            setTimeout(() => {
                e.target.textContent = "📋";
            }, 2000);
        });

        if (!lastDeleteButton) return;
        // DELETE request to remove shortened URL
        lastDeleteButton.addEventListener("click", async (e) => {
            const removeResponse = await fetch(`http://localhost:3000/shorten/${shortCode}`, {
                method: "DELETE",
            });

            if (!removeResponse.ok) {
                alert("Failed to delete shortened URL");
                return;
            }

            const liElement = e.target.parentElement;
            liElement.remove();
            set.delete(shortCode);
        });

        if (!lastStatsButton) return;
        lastStatsButton.addEventListener("click", async (e) => {
            const statsResponse = await fetch(`http://localhost:3000/shorten/${shortCode}/stats`, {
                method: "GET",
            });

            if (!statsResponse.ok) {
                alert("Failed to fetch URL statistics", statsResponse.error);
                return;
            }

            const obj = await statsResponse.json();
            const statsData = await obj.data;

            console.log(statsData);

            const resultStatsTemplate = `
                <p>Original url: ${statsData.originalUrl}</p>
                <p>Shortened url: ${statsData.shortenUrl}</p>
                <p>Access count: ${statsData.accessCount}</p>
            `;

            const statsResults = document.getElementById("stats-result");
            statsResults.innerHTML = resultStatsTemplate;

            const statsContainer = document.querySelector(".stats-container");
            statsContainer.removeAttribute("hidden");

            statsContainer.querySelector(".popup-close-btn").addEventListener("click", async (e) => {
                statsResults.innerHTML = "";
                statsContainer.setAttribute("hidden", "");
            });
        });
    } catch (error) {
        console.error("Error shortening URL:", error);
    }
});
