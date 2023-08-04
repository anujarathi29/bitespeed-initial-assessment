FROM node:latest
LABEL version="1.0"
LABEL description="This is the base docker file for back-end of the Bitespeed Backend Task: Identity Reconciliation"
LABEL maintainer="anujarathi2@gmail.com"
WORKDIR /bitespeed-test/back-end
COPY ["package.json","package-lock.json","./"]
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node","app.js"]
