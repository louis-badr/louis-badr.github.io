document.addEventListener('DOMContentLoaded', function() {
    fetch("/js/gallery-data.json")
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('image-gallery');
            const popupOverlay = document.getElementById('gallery-popup__overlay');
            const popupImage = document.getElementById('gallery-popup__image');
            const popupCaption = document.getElementById('gallery-popup__caption');
            const popupTagAndYear = document.getElementById('gallery-popup__tag-year');

            function openPopup(item) {
                popupOverlay.style.display = "flex";
                popupImage.src = "/assets/gallery/" + item.filename;
                popupCaption.textContent = item.caption;
                popupTagAndYear.textContent = item.tag + " • " + item.year;                                                                    
            }                                                                                   

            function closePopup() {
                popupOverlay.style.display = "none";
            }
            
            data.forEach(item => {
                const imgElement = document.createElement('img');
                imgElement.src = "/assets/gallery/" + item.filename;
                imgElement.alt = item.caption;
                const galleryItem = document.createElement('div');
                galleryItem.appendChild(imgElement);
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