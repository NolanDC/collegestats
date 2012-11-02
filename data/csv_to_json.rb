require 'csv'
require 'json'

input_file = 'trimmed_ipeds.csv'
output_file = "ipeds.json"

college_org = {
	:instname => 'name',
	:city => 'city',
	:state => 'state',
	:zip => 'zip',
	:gender => {
		:enrlm => 'male',
		:enrlw => 'female'		
	},
	:tuition01_tf => 'instate',
	:tuition03_tf => 'outofstate',
	:ugentering => 'entering',
	:student_body => {
		:total_full_time_undergraduates => 'undergrad',
		:total_full_time_graduates => 'grad'		
	},
	:applications => {
		:applcn => 'applied',
		:admssn => 'accepted'	
	},
	:sats => {
		:satmt25 => 'math25',
		:satmt75 => 'math75',
		:satvr25 => 'read25',
		:satvr75 => 'read75'
	}
}

headers = []
colleges = []

CSV.foreach(input_file) do |row|
	if headers.empty?
		headers = row
	else
		hash = {}
		college_org.each_pair do |key, value|
			if value.class == String
				hash[value] = row[headers.index(key.to_s)]
			elsif value.class == Hash
				hash[key] = {}
				value.each_pair do |k, v|
					hash[key][v] = row[headers.index(k.to_s)]
				end
			end
		end
		colleges << hash
	end
end

new_file = File.open(output_file, 'w') do |f|
	#f << JSON.pretty_generate({:colleges => colleges}, new_file)
	f << JSON.generate({:colleges => colleges}, new_file)
end
#JSON.pretty_generate({:colleges => colleges}, new_file)
