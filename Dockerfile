FROM ruby:3.1.6

# Set environment variables
ENV LC_ALL=C.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    JEKYLL_ENV=development

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY . .
RUN bundle install

# Copy the full project
COPY . .

# Expose port 4000 for Jekyll
EXPOSE 4000

# Start Jekyll server
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch"]