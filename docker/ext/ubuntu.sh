#! /bin/none

USER_NAME="ubuntu"
USER_HOME="/home/$USER_NAME"
USER_ID=1000

useradd -u $USER_ID -d "$USER_HOME" -m -s /bin/bash "$USER_NAME"
if [ -d "$USER_HOME" ]
then
    chmod +w /etc/sudoers
    echo "$USER_NAME  ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers
    chmod -w /etc/sudoers
    rsync -avz /root/.ssh/ "$USER_HOME/.ssh/"
    chown -R "$USER_NAME:$USER_NAME" "$USER_HOME/.ssh/"
fi
