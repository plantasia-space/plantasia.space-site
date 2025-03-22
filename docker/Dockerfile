# Use the latest stable Ruby image
FROM ruby:3.2.6

# Set environment variables
ENV LC_ALL=C.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8

# Default Jekyll environment
ARG JEKYLL_ENV=production
ENV JEKYLL_ENV=$JEKYLL_ENV

# Set working directory
WORKDIR /usr/src/app

# Copy Gemfile and install dependencies first
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

# Copy the entire project
COPY . .

# Expose port for Jekyll
EXPOSE 4000

# Default command
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch", "--drafts"]