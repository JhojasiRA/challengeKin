FROM ianwalter/puppeteer:latest
WORKDIR /app
COPY . /app

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install ./google-chrome-stable_current_amd64.deb
RUN npm install -g n
RUN n stable
RUN npm install -g npm@8.5.5
RUN npm install

ENV SPLUNK_TOKEN=xxx \
    USERNAME=xxxx \
    CLIENT_SECRET=xxx \
    PASSWORD=xxxx \
    SPLUNK_HOST=xxxx \
    SPLUNK_INDEX=xxxx \
    API_CS=xxx \
    IS_URL=xxxx \
    PORTAL_URL=xxxx \
    TEST_TO_RUN=headless 

CMD npm run $TEST_TO_RUN || true