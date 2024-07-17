function createLinks(links) {
    if (!links || links.length === 0) 
        return "";
    return links
        .map(
            (link) => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="mt-2 flex w-min flex-row items-center rounded-full bg-light px-2 font-semibold text-black mix-blend-lighten">
            <p class="whitespace-nowrap">${link.website}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000" class="h-6 w-6">
                <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
            </svg>
        </a>
    `,
        )
        .join("");
}

function createCard(data) {
    return `
    <div class="mx-4 mb-4 flex snap-start flex-col items-center rounded-2xl border-[3px] border-accent px-3 py-2">
        <div class="flex flex-row">
            <div class="flex-1">
                <h2 class="w-full text-2xl font-bold">${data.title}</h2>
                <h3 class="w-full font-semibold">${data.subtitle}</h3>
                <div class="w-full flex flex-row space-x-2">
                    ${createLinks(data.links)}
                </div>
                <img src="${data.image}" alt="${data.title} Drawing" class="max-w-full max-h-64 p-4 md:hidden"/>
                <p>${data.description}</p>
            </div>
            <img src="${data.image}" alt="${data.title} Drawing" class="h-full p-4 hidden md:block flex-1"/>
        </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("/js/projects-data.json")
        .then((response) => response.json())
        .then((data) => {
            const projectsList = document.getElementById("projects-list");
            data.forEach((project) => {
                projectsList.innerHTML += createCard(project);
            });
        });
});