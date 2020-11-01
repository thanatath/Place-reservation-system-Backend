FROM node:latest

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install

ENV APP_ID myAppId
ENV MASTER_KEY myMasterKey
ENV DATABASE_URI mongodb+srv://admin:admin@cluster0.d124v.gcp.mongodb.net/PlanBooking?retryWrites=true&w=majority
EXPOSE 1337


CMD [ "npm", "start" ]
