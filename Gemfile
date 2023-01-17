source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3', '>= 6.0.3.1'
# Use postgresql as the database for Active Record
#gem 'pg', '>= 0.18', '< 2.0'
gem 'sqlite3'

# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'
gem 'dotenv-rails', '~> 2.7.5'
gem 'roo', '~> 2.8.0'
# Use Active Storage variant
gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

gem 'activeadmin', '~> 2.7.0'
gem 'acts_as_list', '~> 1.0.2'
gem 'arctic_admin', '~> 3.2.0'
gem 'devise', '~> 4.7.2'
gem 'devise_invitable'
gem 'devise-jwt', '0.7.0'
gem 'ice_cube', '~>  0.16.3'
gem 'migration_data', '~> 0.6.0'
gem 'pundit', '~> 2.1.0'
gem 'paper_trail'
gem 'sidekiq', '~> 6.0.2'
gem 'sidekiq-scheduler', '~> 3.0.1'
gem 'sidekiq-failures', '~> 1.0.0'
gem 'tod', '~> 2.2.0'
gem 'warden-jwt_auth', '~> 0.4.2' #https://github.com/waiting-for-dev/devise-jwt/issues/56
gem 'scout_apm', '~> 2.6.9'
gem 'rollbar', '~> 3.0.0'
gem 'acts-as-taggable-on', '~> 7.0'

gem "aws-sdk-s3", require: false
gem 'rack-cors'

group :development, :test do
  gem 'factory_bot_rails'
  gem 'pry-byebug'
  gem 'rspec-rails', '~> 4.0.0'
  gem 'bullet'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'letter_opener'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
  gem 'shoulda-matchers', '~> 4.0'
  gem 'timecop'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
