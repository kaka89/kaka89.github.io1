1. 获取mysql的docker镜像
```shell
docker pull mysql
```
2.  运行mysql镜像
```shell
docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

3.  检查一下docker运行结果

```shell
docker ps

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
1eb1b4e8496a        mysql               "docker-entrypoint.sh"   8 seconds ago       Up 6 seconds        3306/tcp            mysql1
```
4. 进入mysql的容器

```shell
docker exec -i -t 1eb1b4e8496a /bin/bash
root@1eb1b4e8496a:/#

```
`1eb1b4e8496a`是上条中出现的`CONTAINER ID`

5. 使用mysql命令创建数据库
```shell
mysql> mysql -uroot -p123456
mysql> create database reactivesw;
Query OK, 1 row affected (0.00 sec)
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| reactivesw         |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> 

```
6. 打包自己程序的镜像

```shell
gradle buildDocker
```
检查下自己的Dockerfile之类的准备工作是否做好
7. 查看自己打包出来的镜像
```shell
docker images
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
reactivesw/customer_authentication   latest              cb8010087d4f        4 seconds ago       244.9 MB
```
8. 运行我们自己的容器
```shell
 docker run -p 8080:8080 --name customer-auth --link mysql1:mysql reactivesw/customer_authentication
```
下面是部分运行日志
```shell
ate to spring-boot-starter-data-redis
2016-09-30 06:59:59.100  INFO 1 --- [           main] o.s.j.e.a.AnnotationMBeanExporter        : Registering beans for JMX exposure on startup
2016-09-30 07:00:02.867  INFO 1 --- [           main] s.b.c.e.t.TomcatEmbeddedServletContainer : Tomcat started on port(s): 8080 (http)
2016-09-30 07:00:02.871  INFO 1 --- [           main] o.l.springboot.grpc.GRpcServerRunner     : Starting gRPC Server ...
…………………………
2016-09-30 07:01:15.512  INFO 1 --- [           main] o.l.springboot.grpc.GRpcServerRunner     : gRPC Server started, listening on port 6565.
2016-09-30 07:01:15.516  INFO 1 --- [           main] i.r.customerauthentication.Application   : Started Application in 92.935 seconds (JVM running for 93.8)
2016-09-30 07:01:15.696  INFO 1 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring FrameworkServlet 'dispatcherServlet'
………………………………
```
备注：如果你有环境变量需要设置的，请用-e添加。

9. 测试我们的程序

例如我在刚刚的容器中添加了一个API用于测试，改接口会自动数据库中插入一条数据.
```shell
curl http://localhost:8080/
```
查看数据库结果
```shell
mysql> select * from sw_customer_authentication;
+----+--------------+-----------------+--------------------------------------------------------------+--------+
| id | account_type | identity        | password                                                     | status |
+----+--------------+-----------------+--------------------------------------------------------------+--------+
|  1 |            0 | test@google.com | $2a$10$48cX0Ypn7QP1eYb7Rr20A.2KYLTey6uuScbEEEOM7twWXLphWC2O2 |      2 |
+----+--------------+-----------------+--------------------------------------------------------------+--------+
1 row in set (0.01 sec)
```

10. 至此则检验完了.

平时可以使用docker --help等来查看相关命令的使用。

