require "sinatra"
require "sinatra/reloader" if development?

require 'active_record'

ActiveRecord::Base.configurations = YAML.load_file('database.yml')
ActiveRecord::Base.establish_connection('development')

set :public_folder, File.dirname(__FILE__) + '/public'

=begin
class Memos < ActiveRecord::Base
end
=end


get "/D_table" do
	@style = "D_table"
	@day_hash = {0 => "Mon", 1 => "Tue", 2 => "Wed", 3 => "Thu", 4 => "Fri", 5 => "Sat"}
	erb :D_table
end

get "/login" do
	erb :login
end

get "/subjects/:week/:code" do
	erb :subjects
end
