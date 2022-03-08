FROM ianwalter/puppeteer:latest
WORKDIR /app
ADD . /app

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install ./google-chrome-stable_current_amd64.deb
RUN npm install -g n
RUN n stable
RUN npm install -g npm@latest
RUN npm install

CMD npx wdio config/chrome.headless.config.ts