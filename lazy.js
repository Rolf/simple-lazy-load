document.addEventListener("DOMContentLoaded", function() {

	var lazyImages = [].slice.call(document.querySelectorAll("img.js-lazy"));
	if ("IntersectionObserver" in window) {

		let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function (entry) {
				let lazyImage = entry.target;

				if ($(lazyImage).hasClass('js-lazy-force')) {
					replaceLazyImage(lazyImage);
				}

				if (entry.isIntersecting) {
					lazyImage.src = lazyImage.dataset.src;
					lazyImage.classList.remove("js-lazy");
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});
		lazyImages.forEach(function(lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});
	} else {
		replaceLazyImages(lazyImages);
	}
});