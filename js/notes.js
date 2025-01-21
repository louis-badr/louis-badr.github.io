const leftPage = document.getElementById("left-page");
const rightPage = document.getElementById("right-page");
const note = document.getElementById("md-content");
const queryParams = new URLSearchParams(window.location.search);
const hash = window.location.hash.substring(1);

fetch("/js/notes-data.json")
    .then((response) => response.json())
    .then((data) => {
        let notesList = document.getElementById("notes-list");
        data.forEach((note) => {
            notesList.innerHTML += `<p>••••••••••</p>`;
            notesList.innerHTML += `<h2><a href="/notes#${note.filename}" style="text-decoration: none;">${note.title}</a></h2>`;            
            notesList.innerHTML += `<p>${note.subtitle}</p>`;
        });
        console.log(hash);
        if (hash) {
            // display right page and hide left page
            rightPage.classList.remove("hidden");
            leftPage.classList.add("hidden");
            fetch(`/assets/notes/${hash}.md`)
                .then((response) => response.text())
                .then((text) => {
                    note.innerHTML = marked.parse(text);
                });
        } else {
            // display left page and hide right page
            leftPage.classList.remove("hidden");
            rightPage.classList.add("hidden");
            fetch(`/assets/notes/${data[0].filename}.md`)
                .then((response) => response.text())
                .then((text) => {
                    note.innerHTML = marked.parse(text);
                });
        }
});