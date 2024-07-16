const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 3;
const apiKey = "AkJeB_p0gOvdj0fRFy2r_4dGeMljv4JpBRNFsHx8NpM";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// create elements for links and photos, add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;

	photosArray.forEach((photo) => {
		
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
	
		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
	
		img.addEventListener("load", imageLoaded);

		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error)
	}
}

// Check to see if scrolling is near to bottom of page, if yes load more photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});


getPhotos();
