document.addEventListener('DOMContentLoaded', () => {
    // --- PASTE YOUR MASTER PROJECT LIST CSV URL HERE ---
    const masterSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0ou8Nn5Cr_SqEFYS3wfDKWQkSBXF00O_7z0d2fY284rXf9hcKuOzBbZlZmRelyrDd93bnAIIJeX6f/pub?output=csv';
    // ----------------------------------------------------

    const projectList = document.getElementById('project-list');

    fetch(masterSheetURL)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.trim().split('\n').slice(1);
            
            rows.forEach(row => {
                const values = row.split(',');
                // Corresponds to: Timestamp, Project Title, URL
                if (values.length < 3) return;

                const projectTitle = values[1];
                const projectURL = values[2];

                // Create a new list item
                const listItem = document.createElement('li');
                
                // Create the link and set its properties
                const link = document.createElement('a');
                link.href = projectURL;
                link.textContent = projectTitle;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                
                // Add the link to the list item, and the list item to the list
                listItem.appendChild(link);
                projectList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching project data:", error);
            projectList.innerHTML = `<li>Sorry, there was an error loading the projects.</li>`;
        });
})
