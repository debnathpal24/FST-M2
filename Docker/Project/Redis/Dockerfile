# Specify base image
FROM alpine

# Set the working directory
WORKDIR /usr/app

# WORKDIR means mkdir & cd together

# Install Redis in Alpine
RUN apk add --update redis

# Start the redis-server
CMD ["redis-server"]
