view = {
	init: function() {
		view.listSearchResults('A')
		view.$search_input = $('#search input')
		view.$search_input.focus()
	},
 listSearchResults: function(query) {
		var colleges = {colleges: Colleges.search(query) }
		var html = view.templates.search_list_template(colleges)
		$('#list').html(html)
	},
	showCollege: function(index) {
		$('#results').fadeOut('fast', function() {
			var context = Colleges.find( index )
			var html = view.templates.college_statistics_template(context)
			$('#college').html(html).fadeIn('fast')	
			$('#back').fadeIn('fast')
			view.$search_input.focus().select()	
		})
	},
	showSearchResults: function() {
		$('#back').fadeOut()
		$('#college').fadeOut('fast', function() {
			$('#results').fadeIn()
			view.$search_input.focus()
		})
	},
	templates : {
		search_list_template: Handlebars.compile( $('#search-list-template').html() ),
		college_statistics_template: Handlebars.compile( $('#college-statistics-template').html() )
	}
}

lib = {
	addCommas: function(nStr) {
    nStr += ''
	  var x = nStr.split('.')
	    , x1 = x[0]
	    , x2 = x.length > 1 ? '.' + x[1] : ''
	    , rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
	}
}

Colleges = {
	average_reading_sat: 500,
	average_math_sat: 515,
	init: function(cb) {
		$.get('data/ipeds.json', function(_data) {
			Colleges.colleges = _data.colleges
			if(cb != undefined) cb()
		})
	},
	search: function(query) {
		var results = []
		for(var i = 0; i < this.colleges.length; i++) {
			var college = this.colleges[i]
			var name = college.name
			var location = college.city + ', ' + college.state
			if(name.toLowerCase().search(query.toLowerCase()) >= 0 || location.toLowerCase().search(query.toLowerCase()) >=0 ) {
				results.push({index: i, name: name, location: location})
			}
		}
		return results.slice(0, Math.min(results.length, 16))
	},
	find: function(index) {
		return this.colleges[index]
	}
}

$(function() {
	$('#search input').on('keyup', function() {
		if($('#college').is(':visible'))
			view.showSearchResults()
		view.listSearchResults($(this).val())
	})
	$('#list').on('click', '.college', function() {
		view.showCollege($(this).attr('rel'))
	})
	$('#back').on('click', function() {
		view.showSearchResults()
	})
	Colleges.init(view.init)
})

