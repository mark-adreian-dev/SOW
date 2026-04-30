FROM node:24-alpine3.22

WORKDIR /app

# Copy root package.json
COPY package*.json ./
RUN npm install

# Copy everything (including client/)
COPY . ./

# builds the frontend
RUN npm run build

# For Vite / React preview (adjust if different)
CMD ["npm", "run", "preview"]