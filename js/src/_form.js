document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('form')) {
		const myform = new Form(document.querySelectorAll('form'), {
			focusValidate: true,
			classes: {
				empty: 'input_empty',
				error: 'input-group__input_error',
				correct: 'input-group__input_correct'
			},
			fields: [{
					fieldName: 'name',
					maxLength: 32,
					realTimeRegExp: 'text',
					realTime: true,
					required: true,
				},
				{
					fieldName: 'message',
					realTimeRegExp: 'text',
					realTime: true,
				},
				{
					fieldName: 'phone',
					maxLength: 32,
					realTimeRegExp: 'phone',
					realTime: true,
					required: true,
					regExp: 'phone',
					mask: '+7 (***) ***-**-**'
				}
			]
		});
	}
})

function valid(e) {
	let inputs = document.querySelectorAll('form input')
	status = 0
	for (let input of inputs) {
		if (input.classList.contains('input-group__input_correct')) {
			status++;
		}
	}
	if (status == 3) {
		e.preventDefault();
		let messages = {
			'message': [],
		}
		let inputs = document.querySelectorAll('form input')
		for (let input of inputs) {
			messages.message.push(input.value)
		}
		JSON.stringify(messages)
		$.ajax({
			type: "POST",
			url: 'ajax.php',
			cache: false,
			data: {
				name: messages.message[0],
				phone: messages.message[1],
				text: messages.message[3]
			},
			dataType: "json",
			success: function (data) {
				document.querySelector('.overlay-loader').classList.toggle('overlay-loader_active')
				document.querySelector('form').remove()
				$('.form-container').append(`<div class="logo"></div><br>
				<h1>Форма успешно отправлена</h1>`)
				setTimeout(() => {
					document.querySelector('.overlay-loader').classList.toggle('overlay-loader_active')
				}, 1000);
				console.log("Не проиграл");
			},
			error: function (data) {
				console.log("Проиграл", data)
			}
		});
	}
}
try {
	document.getElementById('submit').addEventListener('click', (e) => {
		valid(e)
	})
} catch (error) {

}