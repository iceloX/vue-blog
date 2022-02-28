---
title: Docker搭建Redis主从集群
date: 2022-02-28
autoIgnore: true
tags:
 - Docker
 - Redis
 - 运维
categories: Java
---

## 原理

为主节点master 配置一个节点 slave，不管slave 是否为第一次连接上 master，slave 都会发送一个sync 命令给master 请求复制数据。

master接受到sync 命令后，会在后头进行数据持久化，通过`bgsave` 生成最新的rdb 快照文件，在生成 rdb快照期间 master 如果收到客户端的更新请求，master 会把这些修改的请求缓存在内存中。

当持久化进行完毕之后，master 会把这份rdb文件数据集发送到slave，slave会把接收到的数据进行持久化成rdb，然后加载到内存中，然后master，在将之前缓存在内存中的命令发送到slave；

当master 与 slave 之间的连接由于某些原因而断开，slave 能自动重连master，如果master收到多个slave 并发连接请求，master 只会进行一次持久化，而不是一个链接一次持久化，然后再把这一份持久化数据发送给多个并发连接的 slave

当 master 和 slave 断开重连后，一般会对整份的数据进行复制，但是从redis 2.8 之后master 和slave 端口后重连支持部分复制。

**部分复制的过程：**

master会在其内存中创建一个复制数据用的缓冲队列
![image.png](https://ae02.alicdn.com/kf/H4af8ca2f960449bc98b3c223ace8048f4.png)
![image.png](https://ae03.alicdn.com/kf/H2ef028f3b591457da8019b64c79f546e1.png)
## 主从复制的特点

1. 同一个Master 可以拥有多个Slave
2. Master 下的Slave 还可以接受同一架构中其他Slave 的连接与同步请求，实现数据的级联复制，即Master -> Slave -> Slave模式
3. Master 以非阻塞的方式同步数据至Slave，这将意味着Master 会继续处理一个或者多个Slave 的读写请求
4. 主从复制不会阻塞Master，当一个或多个Slave 与 Master进行初次同步数据的时候，Master 可以继续处理客户端发来的请求
5. 主从复制具有可拓展性，即多个Slave 专门提供只读查询与数据的冗余，Master 专门提供写操作
6. 通过配置禁用Master 数据持久化机制，将其数据持久化操作交给Slave完成，避免在Master中有独立的进程来完成此操作

## 主从复制的优势

* 避免Redis 单点故障
* 做到读写分离，构建读写分离架构，满足读多写少的应用场景

## Docker 搭建 Redis 主从集群
### 1、拉取 Redis 镜像
```bash
docker pull redis
```
### 2、创建文件和文件夹
```bash
cd /usr/local/src 
mkdir redis-cluster  
cd ./redis-cluster 
touch redis-cluster.conf
```
向 `redis-cluster.conf` 写入 配置如下：
```conf
port ${PORT}
cluster-enabled yes
protected-mode no
cluster-config-file nodes.conf
cluster-node-timeout 5000
#对外ip
cluster-announce-ip [ip] # 修改为你的ip地址
cluster-announce-port ${PORT}
cluster-announce-bus-port 1${PORT}
appendonly yes
```
### 3、创建 docker 网络
创建一个 docker 网络，为了 Redis 中的集群通信
```bash
docker network create redis-net
```
### 4、使用 shell 生成配置信息
进入到`redis-cluster`文件夹中 
```bash
cd /usr/local/src/redis-cluster
```
生成conf和data目录，并生成配置信息
```shell
for port in `seq 6000 6005`; 
do 
  mkdir -p ./${port}/conf 
  && PORT=${port} envsubst < ./redis-cluster.conf > ./${port}/conf/redis.conf 
  && mkdir -p ./${port}/data;
done
```
生成6个文件夹，从 6000 到 6005 ，每个文件夹下包含data和conf文件夹，同时conf里面有redis.
### 5、创建 Redis 镜像
创建 shell 脚本
```bash
vim start.sh
```
编写 shell 脚本如下：
```shell
for port in `seq 6000 6005`; 
do 
  docker run -d -ti -p ${port}:${port} -p 1${port}:1${port} -v /usr/local/src/redis-cluster/${port}/conf/redis.conf:/usr/local/etc/redis/redis.conf -v /usr/local/src/redis-cluster/${port}/data:/data  --restart always --name redis-${port} --net redis-net --sysctl net.core.somaxconn=1024 redis redis-server /usr/local/etc/redis/redis.conf; 
done
```
启动容器
```bash
sh start.sh
```
查看容器
```bash
docker ps
```
:::tip
如果容器的状态为up则，启动成功！否则使用
```bash
 docker logs -f --since 30m [CONTAINER ID] 
```
来查看日志
:::
### 6、构建集群
进入到任意一个容器
```bash
docker exec -it CONTAINER ID  /bin/bash
```
执行
```bash
cd /usr/local/bin && redis-cli --cluster create ip:6000 ip:6001 ip:6002 ip:6003 ip:6004 ip:6005 --cluster-replicas 1
```
::: tip
请确保开放了 `6000-6005`和`16000-16005` 端口
如果出现 `waiting for the Cluster to join`，那么应该是你端口没有开放完全。
:::

中途要输入 yes，确认要初始化。

### 查看信息

使用redis-cli进入任一端口
```bash
redis-cli -h ip -c -p 6000
```
查看节点消息
```bash
cluster nodes
```
查看集群信息
```bash
cluster info
```
## 总结
记录一下使用服务器搭建Redis集群，后面可能（大概、也许）会搭建一个哨兵模式，下次见！