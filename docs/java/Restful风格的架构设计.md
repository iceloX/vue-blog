---
title: Restful风格的Api设计
date: 2020-12-26
autoIgnore: true
tags:
 - Java
 - 网站开发
categories: Java
---

## REST

REST APIs使你能够开发任何类型的网络应用程序，拥有所有可能的CRUD（创建、检索、更新、删除）操作。REST指南建议在对服务器的特定类型的调用中使用特定的HTTP方法（尽管技术上有可能违反这一指南，但这是非常不可取的）。

使用下面给出的信息，为API执行的操作找到一个合适的HTTP方法。

### GET

使用GET请求只为了检索资源的表示/信息--而不是以任何方式修改它。由于GET请求不改变资源的状态，这些方法被称为安全方法。此外，GET API应该是空闲的，这意味着在另一个API（POST或PUT）改变了服务器上的资源状态之前，多次相同的请求必须每次产生相同的结果。

如果Request-URI指的是一个数据产生的过程，那么在响应中应将产生的数据作为实体返回，而不是该过程的源文本，除非该文本正好是该过程的输出。

对于任何给定的HTTP GET API，如果在服务器上找到资源，那么它必须返回HTTP响应代码200（OK）--以及响应主体，通常是XML或JSON内容（由于它们的平台无关性）。

如果在服务器上没有找到资源，那么它必须返回HTTP响应代码404（NOT FOUND）。同样地，如果确定GET请求本身没有正确形成，那么服务器将返回HTTP响应代码400（BAD REQUEST）。

#### Example request URIs

- HTTP GET http://www.appdomain.com/users
- HTTP GET http://www.appdomain.com/users?size=20&page=5
- HTTP GET http://www.appdomain.com/users/123
- HTTP GET http://www.appdomain.com/users/123/address

### POST

使用POST API来创建新的从属资源，例如，一个文件从属于一个包含它的目录，或者一个行从属于一个数据库表。当严格从REST的角度来谈时，POST方法是用来创建一个新的资源到资源集合中的。

理想情况下，如果一个资源已经在源服务器上被创建，响应应该是HTTP响应代码201（创建），并包含一个描述请求状态的实体，指的是新资源，以及一个位置头。

很多时候，由POST方法执行的操作可能不会产生一个可以由URI识别的资源。在这种情况下，HTTP响应代码200（OK）或204（无内容）是适当的响应状态。

对这种方法的响应是不可缓存的，除非该响应包括适当的Cache-Control或Expires头域。

请注意，POST既不安全，也不具有独立性，调用两个相同的POST请求将导致两个不同的资源包含相同的信息（资源ID除外）。

#### Example request URIs

- HTTP POST http://www.appdomain.com/users
- HTTP POST http://www.appdomain.com/users/123/accounts

### PUT

使用PUT API主要是为了更新现有的资源（如果资源不存在，那么API可以决定是否创建一个新资源）。如果一个新的资源被PUT API创建，起源服务器必须通过HTTP响应代码201（创建）响应通知用户代理，如果一个现有的资源被修改，200（OK）或204（无内容）响应代码应该被发送以表示请求的成功完成。

如果请求通过了缓存，并且Request-URI标识了一个或多个当前缓存的实体，那么这些条目应该被视为过时的。对这种方法的响应是不可缓存的。

POST和PUT API之间的区别可以从请求URI中观察到。POST请求是在资源集合上进行的，而PUT请求是在单个资源上进行的。

#### Example request URIs

- HTTP PUT http://www.appdomain.com/users/123
- HTTP PUT http://www.appdomain.com/users/123/accounts/456

### DELETE

顾名思义，DELETE API是用来删除资源（由Request-URI标识）的。

如果响应包括一个描述状态的实体，那么DELETE请求的成功响应应该是HTTP响应代码200（OK）；如果行动已经排队，那么202（接受）；如果行动已经执行但响应不包括一个实体，那么204（无内容）。

DELETE操作是等效的。如果你DELETE了一个资源，它就会从资源集合中删除。在该资源上重复调用DELETE API不会改变结果--然而，在资源上第二次调用DELETE将返回404（NOT FOUND），因为它已经被删除。有些人可能会争论说，这使得DELETE方法变得不具强制性。这是一个讨论和个人意见的问题。

如果请求通过了缓存，并且Request-URI标识了一个或多个当前缓存的实体，那么这些条目应该被视为过时的。对这种方法的响应是不可缓存的。

#### Example request URIs

- HTTP DELETE http://www.appdomain.com/users/123
- HTTP DELETE http://www.appdomain.com/users/123/accounts/456

### PATCH

HTTP PATCH请求是为了对一个资源进行部分更新。如果你看到PUT请求也修改了一个资源实体，那么更清楚的是--PATCH方法是部分更新现有资源的正确选择，而PUT应该只在你完全替换一个资源的时候使用。

请注意，如果你决定在你的应用程序中使用PATCH APIs，会有一些挑战。

浏览器、服务器和Web应用框架对PATCH的支持并不普遍。IE8、PHP、Tomcat、Django和许多其他软件对它的支持缺失或中断。
PATCH请求的有效载荷并不像PUT请求那样直截了当。

### 幂等方法

`Idempotent Methods`

在编程中一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的景响相同。幂等函数，或幂等方法，是指可以使用相同参数重复执行，并能获得相同结果的函数。这些函数不会影响系统状态，也不用担心重复执行会对系统造成改变。例如, "setTrue()7函镂效就是一个幂等函数,无论多次执行，其结果都是一样的更复杂的操作幂等保证是利用唯一交易号(流水号)实现。

一个HTTP方法是**幂等**的，指的是同样的请求被执行一次与连续执行多次的效果是一样的，服务器的状态也是一样的。换句话说就是，幂等方法不应该具有副作用（统计用途除外）。在正确实现的条件下， [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) ， [`HEAD`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD) ， [`PUT`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT) 和 [`DELETE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/DELETE) 等方法都是**幂等**的，而 [`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) 方法不是。所有的 [safe](https://developer.mozilla.org/zh-CN/docs/Glossary/safe) 方法也都是幂等的。

幂等性只与后端服务器的实际状态有关，而每一次请求接收到的状态码不一定相同。例如，第一次调用 [`DELETE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/DELETE) 方法有可能返回 [`200`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/200) ，但是后续的请求可能会返回 [`404`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/404) 。 [`DELETE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/DELETE) 的言外之意是，开发者不应该使用 `DELETE` 法实现具有删除最后条目功能的 RESTful API。

幂等机制的核心是保证资源唯一性，例如客户端重复提交或服务端的多次重试只会产生一份结果。支付场景、退款场景，涉及金钱的交易不能出现多次扣款等问题。事实上，查询接口用于获取资源，因为它只是查询数据而不会影响到资源的变化，因此不管调用多少次接口，资源都不会改变，所以是它是幂等的。而新增接口是非幂等的，因为调用接口多次，它都将会产生资源的变化。因此，我们需要在出现重复提交时进行幂等处理。那么，如何保证幂等机制呢？事实上，我们有很多实现方案。其中，一种方案就是常见的创建唯一索引。在数据库中针对我们需要约束的资源字段创建唯一索引，可以防止插入重复的数据。但是，遇到分库分表的情况是，唯一索引也就不那么好使了，此时，我们可以先查询一次数据库，然后判断是否约束的资源字段存在重复，没有的重复时再进行插入操作。注意的是，为了避免并发场景，我们可以通过锁机制，例如悲观锁与乐观锁保证数据的唯一性。这里，分布式锁是一种经常使用的方案，它通常情况下是一种悲观锁的实现。但是，很多人经常把悲观锁、乐观锁、分布式锁当作幂等机制的解决方案，这个是不正确的。除此之外，我们还可以引入状态机，通过状态机进行状态的约束以及状态跳转，确保同一个业务的流程化执行，从而实现数据幂等。事实上，并不是所有的接口都要保证幂等，换句话说，是否需要幂等机制可以通过考量需不需要确保资源唯一性，例如行为日志可以不考虑幂等性。当然，还有一种设计方案是接口不考虑幂等机制，而是在业务实现的时候通过业务层面来保证，例如允许存在多份数据，但是在业务处理的时候获取最新的版本进行处理。



## 何时在RESTful API中使用路径参数与查询参数？

RESTful API设计的最佳实践是使用路径参数来标识一个或多个特定资源，而使用查询参数来对这些资源进行排序/过滤。

这是一个例子。假设您正在为称为Car的实体实现RESTful API端点。您将像这样构造端点：

GET `/cars`
GET `/cars/:id`
POST `/cars`
PUT `/cars/:id`
DELETE`/cars/:id`

这样，您仅在指定要提取的资源时才使用路径参数，但这不会以任何方式对资源进行排序/过滤。

现在，假设您想在GET请求中添加按颜色过滤汽车的功能。因为color不是资源（它是资源的属性），所以您可以添加执行此操作的查询参数。您可以将查询参数添加到**GET`/cars`**请求中，如下所示：

得到 `/cars?color=blue`

将实现此端点，以便仅退回蓝色汽车。

就语法而言，您的URL名称应全部小写。如果您的实体名称通常是两个英文单词，则可以使用连字符来分隔单词，而不要使用驼峰式大小写。

例如 `/two-words`

## 如何理解 restful 中操作的无状态 “stateless”?

**Stateless** means there is no memory of the past. Every transaction is performed as if it were being done for the very first time.

**Stateful** means that there is memory of the past. Previous transactions are remembered and may affect the current transaction.

* 无状态意味着没有对过去的记忆。每一个事务的执行就像它是第一次被执行一样，每一次执行的结果都是一样的。

* 有状态意味着对过去有记忆。以前的交易会被记住，并可能影响当前的交易。

stateless：

```java
// The state is derived by what is passed into the function

function int addOne(int number)
{
    return number + 1;
}
```

stateful：

```java
// The state is maintained by the function

private int _number = 0; //initially zero

function int addOne()
{
   _number++;
   return _number;
}
```

## 有状态和无状态bean区别

* 无状态会话Bean
  从字面意思来理解，无状态会话Bean是没有能够标识它的目前状态的属性的Bean。例如：

```java
public class A {  
   public A() {}  
   public String hello() {  
      return "Hello 谁？";  
   }  
}  
  
public class Client {  
   public Client() {  
      A a = new A();  
      System.out.println(a.hello());  
      A b = new A();  
      System.out.println(b.hello());  
   }  
}
```

 在Client中生成了两个A的实例，不管是对象a还是b，它们是没有状态的。对于Client来说a和b是没有差别的（但a != b）。所以同一个无状态会话Bean的实例都是相同的，可以被不同的客户端重复使用。

* 状态会话Bean
  至于状态会话Bean，可以这样理解：它是有存储能力的。也就是说至少有一个属性来标识它目前的状态。例如

```java
public class B {  
      private String name;  
      public B(String arg) {  
      this.name = arg;  
      }  
      public String hello() {  
         return "Hello" + this.name;  
      }  
   }  
  
   public class Client {  
      public Client() {  
         B a = new B("中国");  
         System.out.println(a.hello());  
         B b = new B("世界");  
         System.out.println(b.hello());  
      }  
   }  
```

