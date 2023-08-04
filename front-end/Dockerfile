FROM node:latest
LABEL version="1.0"
LABEL description="This is the base docker file for front-end of the Bitespeed Backend Task: Identity Reconciliation"
LABEL maintainer="anujarathi2@gmail.com"
WORKDIR /bitespeed-test/front-end
COPY ["package.json","package-lock.json","./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
