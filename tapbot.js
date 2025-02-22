(async () => {
    const apiUrl = "http://gold-eagle-api.fly.dev/tap";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            credentials: "include",  // Ensures session cookies are sent
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("GoldEagle Bot Response:", data);
    } catch (error) {
        console.error("Error interacting with GoldEagle API:", error);
    }
})();
