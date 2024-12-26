const note = document.getElementById("md-content");
// display title and subtitle of notes in notes-data.json
fetch("/js/notes-data.json")
    .then((response) => response.json())
    .then((data) => {
        let notesSummary = document.getElementById("notes-summary");
        data.forEach((note) => {
            notesSummary.innerHTML += `<p>••••••••••</p>`;
            notesSummary.innerHTML += `<h2>${note.title}</h2>`;
            notesSummary.innerHTML += `<p>${note.subtitle}</p>`;
        });
        // display content of first note in md-content
        fetch(data[0].path)
            .then((response) => response.text())
            .then((text) => {
                note.innerHTML = marked.parse(text);
            });
    });