#! /bin/bash

function ADD()
{
  curl --silent "$1" -o "$2"
}

function SAVE_COPY()
{
  local src="$1"
  local tgt="$2"

  if [ -f "$src" ];then
    if [ -f "$tgt" ];then
      cp "$src" "$tgt"
      return 0;
    fi
  fi
  return 1;
}

function LOG()
{
    echo "[INFO] "$@
}

function ERROR()
{
    echo "[ERROR] "$@
}

function INSTALL()
{
  LOG "------------------------------------------"
  LOG "Ready to install: ["$@"]"
  apt-fast install -y $@
  LOG "Finish install."
}

function LOAD_EXT()
{
    local extension="$1"
    local old_pwd="$PWD"
    LOG "--------------------------------------------------------------------------------"
    LOG "Load Extension[ $extension ]"
    LOG "--------------------------------------------------------------------------------"
    if [ -f "/root/ext/$extension.sh" ]
    then
        . "/root/ext/$extension.sh"
        return 0
    else
        if [ -f "/root/ext/$extension/main.sh" ]
        then
            cd "/root/ext/$extension"
            . "/root/ext/$extension/main.sh"
            cd "$old_pwd"
            return 0
        else
            ERROR "No entry file for extension[$extension]!!!"
            return 2
        fi
    fi
    return 1
}

if [ -f "/root/.ssh/id_rsa" ];then
  rm -rf "/root/.ssh/id_rsa"
fi

export DEBIAN_FRONTEND=noninteractive
export PHP_VERSION=8.0

LOAD_EXT apt

LOG "Install base command: curl/axel/bash-completion"
apt-get install -y bash-completion sudo curl axel openssh-server

if [ -f "/root/bin/apt-fast" ];then
  test -f /usr/bin/apt-fast && cp /usr/bin/apt-fast{,.orig}
  cp "/root/bin/apt-fast" "/usr/bin/apt-fast"
  chmod +x /usr/bin/apt-fast
fi

if [ ! -d "/data" ]
then
  mkdir "/data"
fi

LOAD_EXT base
LOAD_EXT ubuntu

# docker build -t name:tag .
# docker run --name nodejs -p 2203:22 -i -t -d nodejs:1.0 /bin/bash /root/bootstrap.sh
# ssh -i ./.ssh/sample -p2203 root@localhost
