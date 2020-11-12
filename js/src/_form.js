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

try {
	document.getElementById('submit').addEventListener('click',(e)=>{
		e.preventDefault()
		let messages = {
			'message' : [],
		} 
		let inputs = document.querySelectorAll('form input')
		for(let input of inputs){
			messages.message.push(input.value)
		}
		console.log(messages)
		console.log(JSON.stringify(messages))
		$.ajax({
			type: "POST",
			url: '/ajax.php',
			cache: false,
			data: ({message: messages}),
			dataType: "json",
			success: function(data){
				console.log("Не проиграл");
			},
			error: function(data) {
				console.log("Проиграл", data)
			}
		});
	})
} catch (error) {
	
}