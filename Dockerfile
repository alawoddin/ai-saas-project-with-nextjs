# استفاده از Node image
FROM node:18-alpine

# ساخت directory
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy project
COPY . .

# build project
RUN npm run build

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]