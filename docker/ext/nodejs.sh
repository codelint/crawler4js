#! /bin/none

sudo add-apt-repository ppa:ubuntu-toolchain-r/test
INSTALL g++ g++-8 gcc cmake

NODE_VERSION=16.14.0
NODE_NAME="node-v$NODE_VERSION"
NODE_SRC_FILE="/root/src/$NODE_NAME.tar.gz"

if [ ! -f "$NODE_SRC_FILE" ]
then
    axel https://npmmirror.com/mirrors/node/v$NODE_VERSION/$NODE_NAME.tar.gz -o "$NODE_SRC_FILE"
fi

cd /root/src
tar -xf $NODE_NAME.tar.gz
cd "/root/src/$NODE_NAME"

mkdir /opt/nodejs
./configure --prefix=/opt/nodejs

make -j4 && make install

cat >>/etc/bash.bashrc <<"EOF"
if [ -x "/opt/nodejs/bin/node" ]
then
        export NODE_HOME="/opt/nodejs"
        export PATH="$NODE_HOME/bin":$PATH
fi
EOF

