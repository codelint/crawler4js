### 构建镜像
```bash
# cd $WORKSPACE/docker
sudo docker build --tag crawler4js:1.0 .
```
### 启动Docker镜像
```bash
sudo docker run --name crawler4js -p 2200:22  -t -d crawler4js:1.0 /bin/bash /root/bootstrap.sh
# ssh login 
ssh -i ./.ssh/sample -p2200 root@localhost
 ```
