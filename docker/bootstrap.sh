#! /bin/bash

/sbin/ip route|awk '/default/ { print $3,"\tdockerhost" }' >> /etc/hosts

/etc/init.d/ssh start
/etc/init.d/cron start
# /etc/init.d/supervisor start

echo "[hit enter key to exit] or run 'docker stop <container>'"
read
# /etc/init.d/nginx stop
# /etc/init.d/supervisor stop
/etc/init.d/cron stop
/etc/init.d/ssh stop
