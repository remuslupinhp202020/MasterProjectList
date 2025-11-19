document.addEventListener('DOMContentLoaded', () => {
    // --- PASTE YOUR MASTER PROJECT LIST CSV URL HERE ---
    const masterSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0ou8Nn5Cr_SqEFYS3wfDKWQkSBXF00O_7z0d2fY284rXf9hcKuOzBbZlZmRelyrDd93bnAIIJeX6f/pub?output=csv';

    // ----------------------------------------------------

    const projectGrid = document.getElementById('project-grid');

    function createProjectCard(projectData) {
        // This function creates the HTML for a single project card
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="card-icon">${projectData.icon}</span>
                <h2>${projectData.title}</h2>
            </div>
            <p class="card-description">${projectData.description}</p>
            <div class="card-buttons">
                <a href="${projectData.liveUrl}" class="button-live" target="_blank" rel="noopener noreferrer">Live Site</a>
                <a href="${projectData.githubUrl}" class="button-github" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        `;
        return card;
    }

    fetch(masterSheetURL)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.trim().split('\n').slice(1);
            
            rows.forEach(row => {
                const values = row.split(',');
                if (values.length < 5) return;

                const projectData = {
                    title: values[0],
                    description: values[1],
                    liveUrl: values[2],
                    githubUrl: values[3],
                    icon: values[4]
                };

                const projectCard = createProjectCard(projectData);
                projectGrid.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error("Error fetching project data:", error);
            projectGrid.innerHTML = `<p>Sorry, there was an error loading the projects.</p>`;
        });
});r of All Projects" dashboard. To add a new project in the future, you just need to add a new row to your Google Sheet, and it will automatically appear on your dashboard.
