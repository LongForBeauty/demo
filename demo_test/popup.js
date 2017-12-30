var form = $('#authentication_form');

form.submit(function(e) {
	e.preventDefault();

	$.ajax({
		type: form.attr('method'),
		url: form.attr('action'),
		data: frm.serialize(),
		success: function(data) {
			console.log('Submission was successful.');
			console.log(data);
		},
		error: function(data) {
			console.log('An error occured.');
			console.log(data);
		},
	});
});