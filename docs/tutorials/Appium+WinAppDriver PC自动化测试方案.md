---
title: Appium+WinAppDriver PC自动化测试方案
date: 2021-11-15
autoIgnore: true
tags:
 - Python
 - 自动化测试
categories: 教程分享
---

### 一、Appium环境搭建

如果已经安装可以跳过本节

#### 1、安装JDK

参考：https://www.runoob.com/java/java-environment-setup.html

验证安装是否成功：打开cmd命令窗口，输入`java -version`，检查是否正常显示java版本信息。成功安装的回显信息如下图：

![image-20211108105329076](https://image.icelo.cn/image-20211108105329076.png)

#### 2、安装SDK

参考：https://www.twle.cn/l/yufei/android/android-basic-sdk.html

验证安卓SDK环境。打开cmd命令窗口，输入 `adb version `指令，如果打印了下图信息则表示环境变量配置成功。

![image-20211108105304818](https://image.icelo.cn/image-20211108105304818.png)

#### 3、安装Node

参考：https://www.runoob.com/nodejs/nodejs-install-setup.html

 检查环境配置是否成功。在电脑任意目录打开cmd，输入`node -v`指令，如果打印以下结果则表示程序安装OK，且环境变量配置成功！

![image-20211108105224027](https://image.icelo.cn/image-20211108105224027.png)

#### 4、安装Appium-Sever

Github工程地址：https://github.com/appium/appium-desktop/releases

可以在Github工程中找到安装包，下载启动即可。

#### 5、检查环境依赖

 检查当前系统的Appium环境依赖是否都已齐备

使用`appium-doctor`程序，可以快速全面检测当前系统中所依赖资源的安装情况，一目了然。

##### 3-1安装`appium-doctor`

打开`cmd`命令窗口，执行`npm`安装指令： `npm install –g appium-doctor `即可！

##### 3-2运行`appium-doctor`

在cmd命令窗口中输入指令：` appium-doctor` ，如果打印如下结果`info AppiumDoctor ### Diagnostic for necessary dependencies completed, no fix needed`（则表明Appium服务端的依赖环境已安装齐全。

![image-20211108104008832](https://image.icelo.cn/image-20211108104008832.png)

#### 6、安装Appium客户端

##### 6-1 安装Python

参考：https://www.runoob.com/python/python-install.html

打开cmd命令窗口，输入指令： python ，如果成功安装则会打印如下信息：

![image-20211108105135245](https://image.icelo.cn/image-20211108105135245.png)

##### 6-2 安装`Appium-Python-Client`

 安装方法：在cmd命令窗口中执行pip命令即可： `pip install Appium-Python-Client`

### 二、WinAppDriver安装

#### 1、准备

`WinAppDriver`，全称为 `Windows Application Driver`，它是 `Windows `上一个类似` Selenium `的 `UI` 自动化驱动服务框架

它支持 `Appium`，可以使用 `Appium-Python-Client `依赖库完成对 `Windows `桌面程序的自动化操作

项目地址：https://github.com/Microsoft/WinAppDriver

需要注意的是，要使用 `WinAppDriver `服务框架完成` Windows `的自动化，需要满足 `Windows10 `或 `Windows Server 2016` 以上系统

另外，它支持的应用程序包含：

- `UWP - Universal Windows Platform`
- `WinForms  -  Windows Forms`
- `WPF  -  Windows Presentation Foundation`
- `Win32  -  Classic Windows`

在实现之前，我们需要做好以下准备工作

##### 1-1  开启「 开发者模式 」

关键字搜索「 开发者设置 」，选择开启「 开发者模式 」

![image-20211108095853484](https://image.icelo.cn/image-20211108095853484.png)

##### 1-2 安装窗口组件元素识别工具

常用的 2 种窗口元素识别工具为：`inspect.exe`、`FlaUInspect`

其中 `inspect.exe`是官方软件，但不推荐，推荐使用`FlaUInspect`

项目地址：https://github.com/FlaUI/FlaUInspect

#### 2、安装WinAppDriver

通过下面链接下载 WinAppDriver 应用程序，并在本地运行起来

https://github.com/Microsoft/WinAppDriver/releases

进入安装目录：使用管理员权限运行：注意端口占用问题！

![image-20211108105423522](https://image.icelo.cn/image-20211108105423522.png)

### 三、编写代码测试

#### 1、使用`FlaUInspect`定位元素

根据FlaUInspect可以定位到WindowsApp软件上的每一个元素

![image-20211108104754851](https://image.icelo.cn/image-20211108104754851.png)

#### 2、代码编写

帮助文档：https://www.selenium.dev/documentation/webdriver/locating_elements/

用户登录代码：

```python
import time

from appium import webdriver
from applitools.eyes import Eyes
from selenium.webdriver.common.keys import Keys


def find_element_by_name_exist(driver, name):
    '''
    查找元素，失败返回None，成功返回元素对象
    :param driver:
    :param name:
    :return:
    '''
    try:
        element = driver.find_element_by_name(name)
    except Exception as e:
        return None
    return element


class BLingDev(object):
    def __init__(self, bling_dev_path="D:\\BLingDev\\BLingDev.exe", already=False):
        desired_caps = {'platformName': 'Windows',
                        'deviceName': 'WindowsPC',
                        'app': "Root"
                        }
        self.driver = webdriver.Remote(
            command_executor='http://127.0.0.1:4723',
            desired_capabilities=desired_caps)
        self.bling_dev_driver = None
        print(self.driver)
        self.bling_dev_driver = self.click_bling(bling_dev_path)

    def click_bling(self, bling_path):
        bling_caps = {"platformName": "Windows", "deviceName": "WindowsPC", "app": bling_path}
        try:
            bling_driver = webdriver.Remote(command_executor='http://127.0.0.1:4723', desired_capabilities=bling_caps)
        except Exception as e:
            return False
        return bling_driver

    def login(self, phone, password):
        phone_element = find_element_by_name_exist(self.driver, "请输入手机号")
        print(phone_element)
        phone_element.clear()
        phone_element.send_keys(phone)
        time.sleep(1)
        password_element = find_element_by_name_exist(self.driver, "请输入密码")
        print(password_element)
        password_element.clear()
        time.sleep(1)
        password_element.send_keys(password)
        time.sleep(1)
        print(password_element.text)
        password_element.send_keys(Keys.ENTER)


if __name__ == "__main__":
    bling_dev = BLingDev(already=False)
    bling_dev.login("17356059136", "icelo1016")

```

发送消息代码：

```python
from appium import webdriver
from selenium.webdriver.common.keys import Keys


def find_element_by_name_exist(driver, name):
    '''
    查找元素，失败返回None，成功返回元素对象
    :param driver:
    :param name:
    :return:
    '''
    try:
        element = driver.find_element_by_name(name)
    except Exception as e:
        return None
    return element


class BLing(object):
    def __init__(self, bling_path=r"D:\BLingDev\BLingDev.exe", already=False):
        self.bling_path = bling_path
        # 获取整个桌面的driver，然后利用桌面的driver获取微信的driver，因为微信具有启动界面，无法直接获取微信的dirver
        desired_caps = {"platformName": "Windows", "deviceName": "WindowsPC", "app": "Root"}
        self.driver = webdriver.Remote(command_executor='http://127.0.0.1:4723', desired_capabilities=desired_caps)
        self.bling_driver = None
        if self.open_bling(already):
            print("已经进入主页面")

    def open_bling(self, already):
        """
        打开Bling，函数
        :return:
        """
        while True:
            if not already:
                self.bling_driver = self.click_bling(self.bling_path)
            if not self.bling_driver:
                # 当打开BLing之后，通过获取微信句柄的方式来获取BLing的driver
                bling = find_element_by_name_exist(self.driver, "BLingDev")
                bling_handler = bling.get_attribute("NativeWindowHandle")
                if bling_handler != 0:
                    bling_caps = {"appTopLevelWindow": str(hex(int(bling_handler)))}
                    self.bling_driver = webdriver.Remote(command_executor='http://127.0.0.1:4723',
                                                         desired_capabilities=bling_caps)
            if self.bling_driver:
                break
        if self.bling_driver:
            return True
        return False

    def click_bling(self, bling_path):
        bling_caps = {"platformName": "Windows", "deviceName": "WindowsPC", "app": bling_path}
        try:
            bling_driver = webdriver.Remote(command_executor='http://127.0.0.1:4723', desired_capabilities=bling_caps)
        except Exception as e:
            return False
        return bling_driver

    def send_message(self, user, msg):
        user = self.bling_driver.find_element_by_name(user)
        print(user)
        user.click()
        element = self.bling_driver.find_element_by_tag_name("ComboBox")
        element.send_keys(msg)
        element.send_keys(Keys.ENTER)


if __name__ == '__main__':
    bling = BLing(already=False)
    bling.open_bling(False)
    bling.send_message("Builder", "你好啊")
```









