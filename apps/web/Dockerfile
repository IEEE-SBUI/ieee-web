FROM node:20

WORKDIR /app

# Copy root package.json and lockfile
COPY package*.json ./

# Copy workspaces package.json files
COPY apps/web/package*.json ./apps/web/
COPY apps/studio-ieee-sbui-website/package*.json ./apps/studio-ieee-sbui-website/

# Configure npm to be resilient against network timeouts, then install dependencies
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retries 10 && \
    npm config set fetch-timeout 600000 && \
    npm ci

# Copy the rest of the workspace
COPY . .

# Set working directory to the web app workspace
WORKDIR /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev"]