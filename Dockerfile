FROM node

WORKDIR /app

COPY package.json .

#RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
ENV PORT 3009
EXPOSE $PORT

CMD ["node ", "index.js"]


# docker build -t app . (with bound mount)
# docker run -it --init --name node-app -p 3009:3009 -v "D:\Node-Docker:/app" -v node-moduls:/app/node-modules app
# docker build -t app . 
# docker rm node-app(image name)
# docker volume ls
# docker exec -it node-app bash(go to ubntu machine)
# docker logs node-app
# docker ps -a (show all container and images)
# docker system prune -a (Delete all images and container)
# docker compose up -d (build all docker images in docker.yml file)
# docker compose down (stop all container)
# docker volume prune (delete all volume)
# docker volume rm node-app (volume name or id)
# docker-compose up -d(build all images with volume)
# docker-compose down -v(delete unusual volume and stop running volume)
# docker-compose up -d --build(build new image) 

# Two and more Development vs Production configs are run with .yml file
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
# same thing another and down to up -down 
# docker exec -it node-docker-node-app-1 mongo -u "kumar" -p "mypassword"( go to mongo databases and create quires).
# docker volume prune
# docker volume ls docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
# docker inspect node-app(lot of information of volume with name)