document.addEventListener('DOMContentLoaded', () => {

	document.querySelectorAll('.card .car').forEach((card) => {

		const lastIndex = card.querySelectorAll('.colors-swiper .swiper-slide').length - 1

		const colorsSwiper = new Swiper(card.querySelector('.colors-swiper'), {
			slidesPerView: 'auto',
			spaceBetween: 16,
			watchSlidesProgress: true,
			initialSlide: lastIndex,
		})

		new Swiper(card.querySelector('.main-swiper'), {
			spaceBetween: 20,
			initialSlide: lastIndex,

			thumbs: {
				swiper: colorsSwiper,
			},
		})

	})

	document.querySelectorAll('.popup-opener').forEach((element) => {
		element.addEventListener('click', () => {
			$.fancybox.open({
				src: '#callbackForm',
				type: 'inline'
			});
		})
	})

})