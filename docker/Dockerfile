FROM ubuntu:18.04

# WORKDIR /root
# COPY package.json .
# RUN npm install
WORKDIR /root

COPY . .

#ENV DEBIAN_FRONTEND=noninteractive
#RUN apt-get update && apt-get install -y apt-utils && apt-get install -y bash-completion sudo curl axel
#ADD 'http://inotseeyou.com/memo/bash/init_system.sh' "/root/init_system.sh"
#RUN bash "/root/init_system.sh"

RUN bash /root/init.sh

#RUN apt-fast install -y openssh-server cron supervisor inetutils-ping inetutils-traceroute net-tools inetutils-telnet nmap vim
#RUN apt-fast install -y nginx memcached mysql-client
#RUN apt-fast install -y tzdata
#RUN apt-fast install -y php7.2
#RUN apt-fast install -y php7.2-fpm php7.2-common php7.2-cli php-curl
#RUN apt-fast install -y php7.2-mbstring php7.2-imap php7.2-intl php7.2-soap php7.2-zip php7.2-mysql php7.2-json php7.2-readline
#RUN apt-fast install -y php7.2-gd php-memcache php-gmagick

#RUN sed -i.orig 's@^listen *= *.*@listen = 0.0.0.0:9000@' "/etc/php/8.0/fpm/pool.d/www.conf"

CMD [ "bash", "/root/bootstrap.sh" ]
# COPY . .
