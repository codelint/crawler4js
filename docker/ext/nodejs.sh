#! /bin/none

sudo add-apt-repository ppa:ubuntu-toolchain-r/test
INSTALL g++-8 gcc cmake

if [ ! -f /root/src/node-v16.14.0.tar.gz ]
then
    axel https://npmmirror.com/mirrors/node/v16.14.0/node-v16.14.0.tar.gz 
fi

cd /root/src
tar -xf node-v16.14.0.tar.gz
cd /root/src/node-v16.14.0

mkdir /opt/nodejs
./configure --prefix=/opt/nodejs

make && make install

cat >>/etc/bash.bashrc <<"EOF"
if [ -x "/opt/nodejs/bin/node" ]
then
        export NODE_HOME="/opt/nodejs"
        export PATH="$NODE_HOME/bin":$PATH
fi
EOF

