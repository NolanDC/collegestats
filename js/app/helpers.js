Handlebars.registerHelper('acceptancePercentage', function(applications) {
  return (parseInt(applications.accepted) / parseInt(applications.applied) * 100).toFixed(1)
});
Handlebars.registerHelper('totalStudents', function(students) {
  return lib.addCommas(parseInt(students.undergrad) + parseInt(students.grad))
});
Handlebars.registerHelper('malePercentage', function(gender) {
	var male = parseInt(gender.male)
		, female = parseInt(gender.female)
		, total = male + female
  return parseInt((male / total)*100)
});
Handlebars.registerHelper('femalePercentage', function(gender) {
	var male = parseInt(gender.male)
		, female = parseInt(gender.female)
		, total = male + female
  return parseInt((female / total)*100)
});
Handlebars.registerHelper('mathDifference', function(sats) {
	var avg = (parseInt(sats.math25)+parseInt(sats.math75))/2
	var diff = avg - Colleges.average_math_sat

	return new Handlebars.SafeString('<div class="statistic">'
					+ '<div class="title"><span>Math</span></div>'
					+	'<div class="value">' + Math.abs(diff) + '</div>'
					+	'<div class="label">' + (diff > 0 ? 'Higher' : 'Lower') + ' than Average</div>'
					+ '</div>')
});
Handlebars.registerHelper('readDifference', function(sats) {
	var avg = (parseInt(sats.read25)+parseInt(sats.read75))/2
	var diff = avg - Colleges.average_math_sat

	return new Handlebars.SafeString('<div class="statistic">'
					+ '<div class="title"><span>Critical Reading</span></div>'
					+	'<div class="value">' + Math.abs(diff) + '</div>'
					+	'<div class="label">' + (diff > 0 ? 'Higher' : 'Lower') + ' than Average</div>'
					+ '</div>')
});
Handlebars.registerHelper('addCommas', function(str) {
	return lib.addCommas(str);
})