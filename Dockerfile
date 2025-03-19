# Use latest stable Ruby version
FROM ruby:3.1

# Set default locale for the environment
ENV LC_ALL=C.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8

# Set working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY Gemfile Gemfile.lock jekyll-text-theme.gemspec ./
RUN bundle install

# Expose the port Jekyll will run on
EXPOSE 4000

# Serve Jekyll site
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]