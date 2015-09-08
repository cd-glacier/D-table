require 'sinatra'
require 'sinatra/reloader'

before do
    @author = "YHaruka"
end
after do
    logger.info "page displayed succesfully"
end
helpers do
    def strong(s)
        "<strong>#{s}</strong>"
    end
end

get '/' do
    erb :index
end
get '/selectsub1' do
@id= params[:sub1_id]
erb  :subselectbox
end

