document.addEventListener('DOMContentLoaded', () => {
	window.addEventListener('scroll', () => {
		let w = $(window).scrollTop();
		let head = document.querySelector('.header')
		let overlay = document.querySelector('.header-menu')
		w > 100 ? head.classList.add('header_shadow') : head.classList.remove('header_shadow')
		w > 100 ? overlay.classList.add('header-menu_sticky') : overlay.classList.remove('header-menu_sticky')
	})

	document.querySelector('.header-burger__wrap').addEventListener('click', () => {
		document.querySelector('.header-burger__wrap').classList.toggle('header-burger__wrap_close')
		document.querySelector('.header-menu').classList.toggle('header-menu_open')
		document.body.classList.toggle('scroll')
	})

	$('a[href*="#"]').on('click', function(e){
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		},1000);
		e.preventDefault();
		document.querySelector('.header-burger__wrap').classList.toggle('header-burger__wrap_close')
		document.querySelector('.header-menu').classList.toggle('header-menu_open')
		document.body.classList.toggle('scroll')
	});
})