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
	@day_hash = {0 => "nul", 1 => "Mon", 2 => "Tue", 3 => "Wed", 4 => "Thu", 5 => "Fri", 6 => "Sat"}
	erb :D_table
end

get "/login" do
	erb :login
end

get '/selectsub1' do
	@id= params[:sub1_id]
	erb  :subselectbox, :layout => false;
end

get "/subjects/:week/:period" do
	@week = params[:week]
	@period = params[:period]

	#仮装データベース
	@subjects_hash = {"Mon1" => ["建キリ", "解析学", "情報工学概論"], "Mon2" => [nil]}
	erb :subjects, layout: false

end

post "/subjects/:week/new" do
	#データベースに保存頼みますー
	redirect to "/D_table"
end


#for debugging
get "/test/subjects/:week/:period" do
	@week = params[:week]
	@period = params[:period]
	erb :subjects
end

get "/test_D_table" do
	@week = "Mon"
	@period = 1
	@day_hash = {0 => "nul", 1 => "Mon", 2 => "Tue", 3 => "Wed", 4 => "Thu", 5 => "Fri", 6 => "Sat"}
	@subjects_hash = {"Mon1" => ["建キリ", "解析学", "情報工学概論"], "Mon2" => [nil]}
	
	erb :test_D_table
end

