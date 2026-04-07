async function submitIssue() {
    const title = document.getElementById("issueTitle").value;
    const description = document.getElementById("issueDesc").value;

    if (!title || !description) {
        alert("Please fill in both the title and description.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/issues/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        console.log("Issue submitted:", data);
        if (response.ok) {

        alert("Issue submitted successfully!");
        document.getElementById("issueTitle").value = "";
        document.getElementById("issueDesc").value = "";

        } else {
        alert("Failed to submit issue: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Error submitting issue:", error);
        alert("An error occurred while submitting your issue. Please try again later.");
    }
}


    document.getElementById("submitIssueBtn").addEventListener("click", submitIssue);
