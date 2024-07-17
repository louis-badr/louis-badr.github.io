document.addEventListener('DOMContentLoaded', function() {
    fetch("/js/gallery-data.json")
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('image-gallery');
            const popupOverlay = document.getElementById('gallery-popup__overlay');
            const popupContainer = document.getElementById('gallery-popup__container');
            const popupImage = document.getElementById('gallery-popup__image');
            const popupCaption = document.getElementById('gallery-popup__caption');
            const popupTagAndYear = document.getElementById('gallery-popup__tag-year');

            function openPopup(item) {
                popupOverlay.style.display = "flex";
                popupImage.src = "/assets/gallery/" + item.filename;
                popupImage.alt = item.caption;
                popupContainer.style.backgroundImage = "url('/assets/gallery/small/" + item.filename + "')";
                popupCaption.textContent = item.caption;
                popupTagAndYear.textContent = item.tag + " • " + item.year;                                                                    
            }                                                                                   

            function closePopup() {
                popupOverlay.style.display = "none";
            }
            
            data.forEach(item => {
                const imgElement = document.createElement('img');
                imgElement.src = "/assets/gallery/thumbnail/" + item.filename;
                imgElement.alt = item.caption;
                imgElement.loading = "lazy";
                imgElement.className = "rounded-lg hover:outline hover:outline-accent hover:outline-3 hover:outline-offset-[-3px] hover:brightness-75";
                const galleryItem = document.createElement('div');
                galleryItem.style.backgroundImage = "url('/assets/gallery/small/" + item.filename + "')";
                galleryItem.className = "w-full h-full mb-2 bg-[url('/assets/gallery/small/" + item.filename + "')] bg-cover bg-center rounded-lg cursor-pointer";
                galleryItem.appendChild(imgElement);
                
                // Adds a play icon <svg> to animated images
                imgElement.addEventListener('load', () => {
                    if (item.animated) {
                        const playIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        playIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                        playIcon.setAttribute('viewBox', '0 -960 960 960');
                        playIcon.setAttribute('fill', '#F4EFDC');
                        playIcon.setAttribute('class', 'w-14 h-14 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2');
                        const playIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        playIconPath.setAttribute('d', 'M320-258v-450q0-14 9-22t21-8q4 0 8 1t8 3l354 226q7 5 10.5 11t3.5 14q0 8-3.5 14T720-458L366-232q-4 2-8 3t-8 1q-12 0-21-8t-9-22Z');
                        playIcon.appendChild(playIconPath);
                        imgElement.parentElement.style.position = 'relative';
                        imgElement.parentElement.appendChild(playIcon);
                    }
                });


                galleryItem.addEventListener('click', () => openPopup(item));
                gallery.appendChild(galleryItem);
            });

            window.addEventListener('click', (event) => {
                if (event.target == popupOverlay || event.target == popupImage) {
                    closePopup();
                }
            });
        })
        .catch(error => console.error("Error fetching JSON:", error));
});