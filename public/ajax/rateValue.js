$(document).ready(function() {
	$('button').click(function(){
		var rate = $(this).text();
		$.ajax({
			url: "/rate",
			crossDomain: true,
			data: {shortname: $('title').text(), rating: rate},
			success : function(data){
				$('#ratings').html(data)
			}
		})
	})
})