FROM ruby:3.3

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

# COPY Gemfile Gemfile.lock ./
COPY Gemfile ./
# RUN bundle install
RUN gem install jekyll bundler
# RUN bundle init

COPY . .

# CMD ["./your-daemon-or-script.rb"]