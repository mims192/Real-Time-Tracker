FROM ubuntu:latest
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh \
    && bash /tmp/nodesource_setup.sh \
    && apt-get install -y nodejs
WORKDIR /app
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy remaining files
COPY . .

# Expose the port 
EXPOSE 3000

# Run index.js
ENTRYPOINT ["node", "index.js"]