# Build Stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Stage with serve
FROM node:18-alpine

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy build folder from previous stage
COPY --from=build /app/build /app/build

EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
