### Docker概述

#### Docker为什么出现？

1. 环境部署费时费力，为了解决这个问题出现的docker
2. docker可以发布一个项目（），把项目都带上环境安装打包
3. Java -- jar（环境）--打包项目带上环境（镜像）--（Docker仓库：商店）--下载发布的镜像--直接运行
4. Java -- apk --发布（应用商店）--xx使用apk--安装即可用
5. docker通过隔离机制，通过容器相互隔离，可用降服务器利用到极致

#### Docker历史

在容器技术之前，一直使用的虚拟机技术

虚拟机属于虚拟化技术，docker容器化技术也是一种虚拟化技术。

docker火的原因是比较轻巧

docker是基于go语言开发的开源项目

#### Docker能干什么

容器化技术不是模拟的完整的操作系统

容器内的应用直接运行在宿主机的内容，容器是没有自己的内核的，也没有虚拟硬件，比较轻便

每个容器之间是相互隔离，每个容器内都有一个属于自己的文件系统，互不影响



DevOps（开发、运维）

应用更快速的交付和部署

### Docker安装

#### Docker 基本组成

1. 镜像（image）：

   docker镜像好比是一个模板，可以通过run模板来创建容器（提供服务）

   通过镜像可以创建多个容器（最终服务运行或项目运行就在容器中）

2. 容器（container）：

   基本命令：启动、停止、删除

   目前可以简单理解为就是一个简易的Linux系统

3. 仓库（repository）：

   仓库就是存放镜像的地方

   仓库分公有和私有

   

#### Docker的helloworld运行流程图

![image-20201123152850631](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201123152850631.png)

#### Docker启动

```she
$ sudo systemctl enable docker
$ sudo systemctl start docker
```



### Docker的常用命令

#### 镜像命令

docker images 

docker images -a // 全部镜像

docker images -q //只显示id

docker images -aq //查出所有镜像id

docker search

docker search mysql --filter=stars=3000 //找到stars大于3000的镜像

docker pull  // 下载镜像

docker pull mysql === docker pull  docker.io/library/mysql:latest

docker 内部使用的分层下载，联合文件系统

docker rmi 删除镜像

```she
docker rmi -f image_id //删除指定镜像
docker rmi -f image_id image_id image_id //删除多个镜像
docker rmi -f $(docker images -aq) //可以使用$符号来删除全部镜像
```





#### 容器命令

有了镜像才能创建容器

**新建容器并启动**

```shell
docker run [可选参数] image

# 参数说明
--name='Name' 容器名字 tomcat01 
-d			  后台方式运行
-it			  使用交互方式运行，进入容器查看内容
-P 			  指定容器的端口 -P 8080:8080
	-p ip 主机端口：容器端口
	-p 主机端口：容器端口（常用）
	-p 容器端口
	容器端口
-p            随机指定端口

# 启动并进入容器
[root@VM_0_6_centos ~]# docker run -it centos /bin/bash
[root@940649ebecf5 /]# ls #查看容器内的centos

exit # 退出容器
docker ps # 列出当前正在运行的容器
docker ps -a #列出当前正在运行的 +历史运行的容器
docker ps -n=? #显示最近创建的容器
docker ps -q # 只显示容器编号

```

**退出容器**

```shell
exit	  # 退出容器
ctrl+p+q  # 容器不停止退出
```

**删除容器**

```shell
docker rm 容器id

docker rm -f  $(docker ps -aq)  #  强制删除所有的容器

docker rm -f  # 强制删除

docker ps -a -q|xargs docker rm #删除所有内容
```

**启动和停止容器的命令**

```shell
docker start 容器id		#启动容器

docker stop 容器id		#停止容器

docker restart 容器id	#重启容器

docker kill 容器id  		# 强制停止当前容器
```

#### 常用其他命令

**后台启动容器**

```shell
docker run -d image 

# 常见问题：docker容器使用后台运行，就必须要有一个前台进程，docker发现没有应用就会自动停止
# Nginx 容器期待后，发现自己没有提供服务，就会立刻停止，，就是没有程序了
```

**查看日志**

```she
docker logs
docker logs -tf 10 --tail # 查看最近10条日志
```

**查看容器内的进程信息**

```shell
docker top 容器id
```

**查看镜像元数据**

```shell
docker inspect 容器id
```

**进入当前正在运行的容器**

```shell
docker
# 我们通常容器都是使用后台方式运行的，需要进入容器，修改配置
docker exec -it 容器id bashshell(/bin/shell)
# 在容器中新打开一个终端

# 方式二
docker attach 容器id
# 进入容器正在执行的终端，不会打开新的终端



```

**把容器中的文件拷贝到系统中**

```shell
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|

docker cp 9fc6d45b81f0:/home/test.py ~/
```

#### 小结

docker命令

```shell
  attach      Attach local standard input, output, and error streams to a running container # 进入到一个正在运行的容器
  build       Build an image from a Dockerfile # 根据 Dockerfile 构建一个镜像
  commit      Create a new image from a containers change # 根据容器的更改创建一个新的镜像
  cp          Copy files/folders between a container and the local filesystem #在本地文件系统与容器中复制 文件/文件夹
  create      Create a new container #  创建一个新容器
  diff        Inspect changes to files or directories on a containers filesystem #
  events      Get real time events from the server
  exec        Run a command in a running container #在容器中执行一条命令
  export      Export a containers filesystem as a tar archive #
  history     Show the history of an image
  images      List images # 列出镜像
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers # 强制关闭一个或多个正在运行的容器 
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container # 取得容器的日志
  pause       Pause all processes within one or more containers #暂停一个或多个容器的所有进程
  port        List port mappings or a specific mapping for the container
  ps          List containers # 列出所有容器
  pull        Pull an image or a repository from a registry # 拉取一个镜像或仓库到 registry
  push        Push an image or a repository to a registry # 推送一个镜像或仓库到 registry
  rename      Rename a container #重命名一个容器
  restart     Restart one or more containers #重新启动一个或多个容器
  rm          Remove one or more containers #删除一个或多个容器
  rmi         Remove one or more images #删除一个或多个镜像
  run         Run a command in a new container #在一个新的容器中执行一条命令
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images #在 Docker Hub 中搜索镜像
  start       Start one or more stopped containers #启动一个或多个已经停止运行的容器
  stats       Display a live stream of container(s) resource usage statistics # 显示一个容器的实时资源占用
  stop        Stop one or more running containers #停止一个或多个正在运行的容器
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE #为镜像创建一个新的标签
  top         Display the running processes of a container #显示一个容器内的所有进程
  unpause     Unpause all processes within one or more containers #恢复一个或多个容器内所有被暂停的进程
  update      Update configuration of one or more containers
  version     Show the Docker version information #显示docker版本号
  wait        Block until one or more containers stop, then print their exit codes

```

#### 作业练习

> 安装tomcat

```shell
docker run -it --rm tomcat:9.0 # 加了--rm会用完即删

# 前面的方法都是后台运行，停掉后，还可以通过docker ps -a查找到，但是加上--rm会用完即删

# 远程下载后再启动
docker pull tomcat

# 启动运行
docker run -d -p 3344:8080 --name tomcat01 tomcat

#进入容器
docker exec -it tomcat01 /bin/bash

#发现问题：1、Linux命令少了；2、没有webapps，

#解决问题：手动复制webapps.dist中的文件到webapps中去
cp -r webapps.dist/* webapps
```

> 部署es+kibana	



### Docker镜像讲解

#### 镜像是什么



#### Docker镜像加载原理

> UnionFS(联合文件系统)

下载时候看到的一层一层的就是这个



> Docker镜像加载原理

docker 的镜像实际上由一层一层的文件构成



#### 分层理解

啊blablabla

> 特点

Docker镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像顶部！

这一层即通常所说的容器层，容器之下的都叫镜像

远程下载下来的pull下来的是只读的，run的时候，会自动添加一层，容器层，所有的操作基于容器层



#### commit镜像

```shell
docker commit 提交容器成为一个新的副本
# 命令和Git类似
docker commit -m=“提交的描述信息” -a="作者" 容器id 目标镜像名:[TAG]

# 1、启动一个Tomcat
# 2、发现Tomcat文件下面没有webapps的应用  镜像原因，官方的webapps下面没有
# 3、手动从webapps.dist中复制到webapps中
# 4、commit镜像，之后就可以直接启动自己commit的这个
```

![image-20201201153542261](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201201153542261.png)

```shell
如果想要保存当前容器的状态，就可以通过commit来提交，获得一个镜像
```



### 容器数据卷

什么是容器数据卷

docker的理念问题

将应用和环境打包成一个镜像！

希望容器之间可以有一个数据共享的技术！docker容器中产生的数据，同步到本地！

这就是卷技术，即目录的挂在，将容器的目录，挂载在Linux上

总结一句话：容器的持久化和同步操作！容器之间也是可以数据共享的

使用数据卷

> 方式一：使用命令注释 -v

```shell
docker run -it -v 主机目录:容器内目录

# 测试
[root@VM_0_6_centos ~]# docker run -it -v /home/ceshi:/home centos /bin/bash

# 启动起来后可以通过docker inspect 容器id 查看是否挂载成功
```

![image-20201201162818375](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201201162818375.png)

两个目录下数据是双向绑定的

好处：修改只需要在本地修改即可，容器内会自动同步

#### 安装MySQL

思考：数据库持久化问题

```shell
# 1、pull指定版本的mysql（必须小写）

# 2、启动mysql，需要设置密码
# 官方测试 docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
-d # 后台运行
-p # 端口映射
-v # 数据卷挂载
-e # 环境配置
--name # 容器名字
[root@VM_0_6_centos ~]# docker run -d -p 3333:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7


# 启动成功后，在本地测试一下数据库连接
# 连接到服务器的3333 --- 3333和容器内的3306映射，此时可正常连接

# 本地测试创建一个数据库，看映射路径是否OK
```

将容器删除

![image-20201202171429676](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201202171429676.png)

发现，挂载到本地的数据卷依旧没有丢失，即实现了数据持久化功能



#### 具名挂载和匿名挂载

```shell
# 匿名挂载 --- 没有指定主机地址，只写了容器内地址
docker -d -p --name nginx01 -v /etc/nginx nginx

# 查看所有的卷volume
docker volume ls

# 通过 -v 卷名：容器内路径
# 查看卷
docker volume inspect juming-nginx
```

![image-20201202174230304](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201202174230304.png)

所有的docker容器内的卷，没有指定目录的情况下都是在`/var/lib/docker/volumes/xxxx/_data`

通过具名挂载可以方便找到卷，推荐使用具名挂载

```shell
# 如何确定具名挂载、匿名挂载还是指定路径挂载
-v 容器内路径 # 匿名挂载
-v 卷名:容器内路径 # 具名挂载（卷名不以/开头）
-v /宿主机路径: 容器内路径 # 指定路径挂载
```

> 拓展

```shell
# 通过 -v 容器内路径:ro  rw改变读写权限
ro readonly # 只读
rw readwrite # 可读可写

#一旦这个设置了容器权限，容器对挂载出来的内容就有限定了
docker run -d -p --name nginx02 -v juming-nginx:/etc/nginx:ro nginx
docker run -d -p --name nginx02 -v juming-nginx:/etc/nginx:rw nginx

# ro 说明这个路径只能通过宿主机来操作，容器内部无法操作
```



#### 初识DockerFile

DockerFile就是用来构建docker镜像的构建文件！命令脚本！

**构建步骤**

1. 编写一个dockerfile文件
2. docker build 构建成为一个镜像
3. docker run 运行镜像
4. docker push 发布镜像到dockerhub或者阿里云镜像仓库等进行开源



#### 数据卷容器

可以通过`--volumes-from`



### DockerFile

#### DockerFile介绍

DockerFile构建过程

基础知识

1. 每个保留关键字都必须是大写字母
2. 执行从上到下顺序执行
3. #表示注释
4. 每一个指令都会创建提交一个镜像层，并提交

![image-20201214101020522](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201214101020522.png)

dockerfile是面向开发的，我们需要发布项目，做镜像，需要编写dockerfile文件。

**步骤：开发、部署、运维**

DockerFile：构建文件，定义一切步骤，源代码

DockerImages:通过DockerFile构建生成的镜像，最终发布和运行的产品

Docker容器：容器就是镜像运行起来提供服务器

#### DockerFile指令

```shell
FROM	# 基础镜像，一切从这里开始构建  
MAINTAINER	# 镜像是谁写的，姓名+邮箱
RUN			# 镜像构建时候需要运行的命令
ADD			# 步骤：Tomcat镜像，Tomcat压缩包，添加内容，会自动解压文件
WORKDIR		# 镜像的工作目录
VOLUME		# 挂载的目录
EXPOSE		# 暴露端口配置
CMD			# 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT	# 指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD		# 当构建一个被集成dockerfile 此时会运行 onbuild的指令，触发指令
COPY		# 类似ADD，将文件拷贝到镜像中
ENV			# 构建的时候设置环境变量
```

![image-20201214102120916](C:\Users\luoli\Desktop\image-20201214102120916.png)

#### 实战测试

DockerHub中

> 创建一个自己的centos

```shell
# 1.编写dockerfile文件
[root@VM_0_6_centos dockerfile]# cat mydockerfile 

FROM centos
MAINTAINER gajya<1990195770@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "----end----"
CMD /bin/bash

# 2.通过这个文件构建镜像
# 命令 docker build -f dockerfile文件路径 -t 镜像名:版本号 .
[root@VM_0_6_centos dockerfile]# docker build -f mydockerfile -t mycentos:0.1 .
构建成功后
Successfully built 13ecc9573760
Successfully tagged mycentos:0.1

```

官方版本的centos

![image-20201214111213700](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201214111213700.png)

自己改变后的centos

![image-20201214111259364](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201214111259364.png)

我们可以列出本地变更历史

```shell
docker history imageId
```

![image-20201214110859519](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20201214110859519.png)



> CMD和ENTRYPOINT的区别

```shell
CMD			# 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT	# 指定这个容器启动的时候要运行的命令，可以追加命令
```

```shell
[root@VM_0_6_centos dockerfile]# vim dockerfile
[root@VM_0_6_centos dockerfile]# cat dockerfile 
FROM centos
CMD ["ls","-a"]

# 构建镜像，注意 . 必须要加，为路径
[root@VM_0_6_centos dockerfile]# docker build -f dockerfile -t cmdtest .
# 运行镜像
[root@VM_0_6_centos dockerfile]# docker run cmdtest
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
mnt
...

# 想追加一个命令 -l   ls -al
[root@VM_0_6_centos dockerfile]# docker run cmdtest -l
docker: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "exec: \"-l\": executable file not found in $PATH": unknown.
# 报错，希望正常执行需要使用完整的命令docker run cmdtest ls -al
[root@VM_0_6_centos dockerfile]# docker run cmdtest ls -al
total 56
drwxr-xr-x   1 root root 4096 Dec 14 03:26 .
drwxr-xr-x   1 root root 4096 Dec 14 03:26 ..
-rwxr-xr-x   1 root root    0 Dec 14 03:26 .dockerenv
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  340 Dec 14 03:26 dev
drwxr-xr-x   1 root root 4096 Dec 14 03:26 etc
drwxr-xr-x   2 root root 4096 May 11  2019 home

```

ENTRYPOINT

```SHELL
[root@VM_0_6_centos dockerfile]# vim dockerfile-entrypoint
[root@VM_0_6_centos dockerfile]# cat dockerfile-entrypoint 
FROM centos
ENTRYPOINT ["ls","-a"]

# 构建镜像，注意 . 必须要加，为路径
[root@VM_0_6_centos dockerfile]# docker build -f dockerfile-entrypoint -t entrypoint .

# 运行镜像
[root@VM_0_6_centos dockerfile]# docker run entrypoint
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
...
# 直接追加一个命令 -l 可执行
[root@VM_0_6_centos dockerfile]# docker run entrypoint -l
total 56
drwxr-xr-x   1 root root 4096 Dec 14 06:09 .
drwxr-xr-x   1 root root 4096 Dec 14 06:09 ..
-rwxr-xr-x   1 root root    0 Dec 14 06:09 .dockerenv
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  340 Dec 14 06:09 dev
drwxr-xr-x   1 root root 4096 Dec 14 06:09 etc
drwxr-xr-x   2 root root 4096 May 11  2019 home
...
```

1. 准备镜像文件tomcat压缩包，jdk的压缩包

2.  编写dockerfile文件

3. 构建镜像

   ```shell
   docker build -f 镜像名 -t 自定义镜像名 . 
   ```

4. 启动镜像

5. 访问测试

6. 发布项目（由于做了卷挂载，直接在本地编写项目就可以发布了）

   ```xml
   
   ```

   