FROM node

RUN apt-get update

#zsh
RUN apt-get install -y zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

RUN git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git ~/.zsh/zsh-autocomplete
RUN echo "source ~/.zsh/zsh-autocomplete/zsh-autocomplete.plugin.zsh" >> ~/.zshrc
RUN sed -i 's/robbyrussell/lukerandall/g' ~/.zshrc

ENV LC_CTYPE C.UTF-8

WORKDIR /Foncode-front

COPY Foncode-front/package*.json /Foncode-front
RUN npm install

COPY /Foncode-front /Foncode-front
RUN npm run build 
RUN npm run dev -- --host --port 8081
