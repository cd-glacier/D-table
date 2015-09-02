require "sinatra"
require "sinatra/reloader" if development?

require 'active_record'

ActiveRecord::Base.configurations = YAML.load_file('database.yml')
ActiveRecord::Base.establish_connection('development')

=begin
class Memos < ActiveRecord::Base
end
=end


get "/D_table" do
	erb :D_table
end

