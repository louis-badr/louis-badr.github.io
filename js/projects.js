function createLinks(links) {
    if (!links || links.length === 0) 
        return "";
    return links
        .map(
            (link) => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-chip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000" class="link-chip__icon">
                <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
            </svg>
            <p class="whitespace-nowrap">${link.website}</p>
        </a>
    `,
        )
        .join("");
}

function createCard(data) {
    return `
        <div
            class="card mb-3 flex w-full md:w-5/6 lg:w-3/4 lg:flex-row lg:justify-between lg:items-center lg:h-[32rem]"
        >
            <div class="lg:flex-1 h-full">
                <h3>${data.title}</h3>
                <h4 class="font-semibold">
                    ${data.subtitle}
                </h4>
                <div class="w-full flex flex-row space-x-2 m-2 ml-0">
                    ${createLinks(data.links)}
                </div>
                <div class="flex w-full justify-center p-2 lg:hidden">
                    <img
                        src="${data.image}"
                        alt="${data.title}"
                        class="h-48 object-contain"
                    />
                </div>
                <p class="max-h-48 overflow-y-scroll lg:max-h-96">
                    ${data.description}
                </p>
            </div>
            <div class="hidden flex-1 p-4 h-full lg:flex justify-center">
                <img src="${data.image}" alt="${data.title}" class="h-full object-contain"/>
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