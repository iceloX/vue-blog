---
title: WSL2下安装GUI界面
date: 2020-12-26
autoIgnore: true
tags:
 - WSL2
 - Linux
categories: 教程分享
---

## 前言

在Linux之父Linus Torvalds加盟微软之后，Windows系统便能够很好的使用linux系统了，最典型便是WSL2的安装和使用，关于WSL2的安装，官方教程已经给的很清楚了，想尝试的小伙伴可以尝试用一下：[适用于 Linux 的 Windows 子系统安装指南 (Windows 10)](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)，在已经安装好了WSL2的基础上，我们可以在Windows的Ubuntu系统上安装一个GUI界面。

## 安装界面

在安装之前，你可以将Ubuntu系统的软件源更换为国内的清华源或者阿里源，确保在下面的安装过程中顺利进行！

### 更新系统软件

![更新软件源](https://image.icelo.cn/wsl2-gui-1.png#mirages-width=840&mirages-height=445&mirages-cdn-type=1)

我们使用如下命令更新一下系统软件！当发现更新出错时，请继续执行命令，确保更新成功！

```shell
sudo apt-get update && upgrade
```

### 安装xrdp

在这里我们使用的`xrdp`来连接我们待会要安装的桌面程序，首先需要安装`xrdp`，使用如下命令：

```shell
sudo apt install xrdp
```

在安装过程中确保安装成功，如有异常错误，请再次执行上述命令！

### 安装桌面程序

这里我们需要安装一个桌面程序`xfce4`及其相关的应用程序，使用如下命令安装：

```shell
sudo apt install xfce4 xfce4-goodies
```

在安装的过程中会选择一个显示管理器，可以随便选择一个，按回车选择！

![显示管理器选择](https://image.icelo.cn/wsl2-gui-2.png#mirages-width=1200&mirages-height=616&mirages-cdn-type=1)

### 编辑配置文件

使用命令：

```shell
sudo vi /ect/xrdp/xrdp.ini
```

编辑配置文件，修改xrdp的最大连接数为128，修改`max_bpp=128`

![修改配置文件](https://image.icelo.cn/wsl2-gui-3.png#mirages-width=876&mirages-height=584&mirages-cdn-type=1)

### xsession配置

对于非root用户登录服务器的情况，应该首先将`xfce4-session`写入该用户文件夹的`xsession`文件：`/home/username/.xsession`

使用如下命令：

```shell
echo xfce4-session > ~/.xsession
```

### 修改启动文件

修改`/etc/xrdp/startwm.sh`文件，在最下面将测试的两行代码注释，并加上`startxfce4`，保存并退出！

![修改启动文件](https://image.icelo.cn/wsl2-gui-4.png#mirages-width=908&mirages-height=571&mirages-cdn-type=1)

### 启动桌面服务

使用命令开启一个桌面服务，显示OK表示开启成功！

```shell
sudo /etc/init.d/xrdp start
```

![开启桌面服务](https://image.icelo.cn/wsl2-gui-5.png#mirages-width=1198&mirages-height=62&mirages-cdn-type=1)

### 远程连接

使用IP查看命令，查看Ubuntu的IP，然后使用Windows下的远程桌面连接工具连接桌面！

```shell
sudo ip a
```

![远程连接](https://image.icelo.cn/wsl2-gui-7.png#mirages-width=473&mirages-height=318&mirages-cdn-type=1)

![远程连接](https://image.icelo.cn/wsl2-gui-6.png#mirages-width=1022&mirages-height=631&mirages-cdn-type=1)

在界面输入用户名和密码即可登录！

## 结语

这里主要是使用`xrdp`远程连接桌面的方式，使用的桌面程序是`xfce4`同样可以使用其他的桌面程序，这种安装界面的方法在wsl上也同样适用！

