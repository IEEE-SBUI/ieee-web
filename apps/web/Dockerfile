FROM node:20

WORKDIR /app

# Copy root package.json and lockfile
COPY package*.json ./

# Copy workspaces package.json files
COPY apps/web/package*.json ./apps/web/
COPY apps/studio-ieee-sbui-website/package*.json ./apps/studio-ieee-sbui-website/

# Clean install all dependencies (hoisted to root node_modules)
RUN npm ci

# Copy the rest of the workspace
COPY . .

# Set working directory to the web app workspace
WORKDIR /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev"]