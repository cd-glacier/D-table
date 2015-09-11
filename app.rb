require "sinatra"
require "sinatra/reloader" if development?

require 'active_record'

ActiveRecord::Base.configurations = YAML.load_file('database.yml')
ActiveRecord::Base.establish_connection(:development)

set :public_folder, File.dirname(__FILE__) + '/public'


after do
  ActiveRecord::Base.connection.close
end

class Zyoushisu_subject < ActiveRecord::Base
	self.primary_key = :code
end


get "/D_table" do
	#loginから情報受け取り
	@semester = params[:semester]
	@grade = params[:grade]
	@gakubu = params[:sub1]
	@gakka = params[:sub2]

	@gakubu_hash = {"rikou" => "理工学部", "keizai" => "経済学部", "bunzyou" => "文化情報学部", "seimei" => "生命医科学部"}
	@gakka_hash = {"zyoushisu" => "情報システムデザイン学科", "interi" => "インテリジェント情報工学科", "denki" => "電気工学科"}
	@day_hash = {0 => "nul", 1 => "Mon", 2 => "Tue", 3 => "Wed", 4 => "Thu", 5 => "Fri", 6 => "Sat"}
	@semester_hash = {"Spring" => "春", "Autumn" => "秋"}

	erb :D_table
end

get "/login" do
	erb :login
end

get '/selectsub1' do
	@id = params[:sub1_id]
	erb  :subselectbox, :layout => false;
end

get "/subjects/:week/:period/:grade/:semester" do
	@week = params[:week]
	@period = params[:period]
	@semester = params[:semester]
	@grade = params[:grade]

	#データベース	
	@subject = Zyoushisu_subject.all
	
	erb :subjects, layout: false

end

post "/:week/:period/:grade/:semester/new" do
	@subject = Zyoushisu_subject.new
	@subject.code = params[:code]
	@subject.subname = params[:subname]
	dates_temp = params[:week] + params[:period]
	@subject.dates = dates_temp 
	@subject.credit = params[:credit]
	@subject.counter = 1
	@subject.this_url = "null"
	@subject.last_url = "null"
	@subject.classes = 1
	@subject.remark = 0
	@subject.grade = params[:grade] 
	@subject.semester = params[:semester]
	@subject.save
end


