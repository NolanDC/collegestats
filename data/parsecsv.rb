require 'csv'

def create_headers row
	h = {}
	row.each_with_index do |item, index|
		h[item] = index
	end
	return h
end


required_existence = %w(instname city state zip enrlm enrlw tuition01_tf fee01_tf tuitionfee01_tf ugentering total_full_time_undergraduates total_full_time_graduates applcn admssn satmt25 satmt75 satvr25 satvr75)

required_values = {
	'academicyear' => '2010'
}

race_fields = %w(total_enrollment_amin_tot total_enrollment_asian_tot total_enrollment_black_tot total_enrollment_hisp_tot total_enrollment_white_tot total_enrollment_unkn_tot)

total = 0
headers = nil

CSV.open("trimmed_ipeds.csv", "w") do |new_file|

  CSV.foreach('./ipeds_data.csv') do |row|
		if headers.nil?
			headers = create_headers(row)
			new_file << required_existence
			required_existence.map! {|req| headers[req]}
		end

		required_fields = required_existence.map{|index| row[index] }
		next if required_fields.any?{|value| value.nil?}
		#puts row[headers['academicyear']] == '2010'
	 	number_of_required = required_values.select do |key, value| 
	 		row[headers[key]] == value
	 	end
	 	next if number_of_required.empty?

	 	#races = race_fields.map{|r| row[headers[r]]}
	 	#required_fields += races

		new_file << required_fields
		total +=1
	end

end


puts "total: #{total}"
exit
