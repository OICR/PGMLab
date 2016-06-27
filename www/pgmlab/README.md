# PGMLab Queueing with Celery and RabbitMQ
PGMLab allows for submission of jobs to be processed in a queue at a later time. This queue runs on top of [Celery](http://www.celeryproject.org/) using [RabbitMQ](https://www.rabbitmq.com/) for message brokering between Celery and the python server (a [Klein](https://github.com/twisted/klein) application)

### Installation
In the /www/pgmlab directory...

Crossbar, for WAMP routing (assuming we've installed Klein+Autobahn[twisted] already and in virt-env):
```sh
pip install crossbar
crossbar init
```
Celery (in virt-env):
```sh
pip install celery
```
RabbiqMQ:
```sh
brew install rabbitmq
```

### Running
In the /www/pgmlab directory...

Start Crossbar WAMP routing so that Klein can communicate with Client to POST jobs and publish database updates
```sh
crossbar start
```
Start message broker for Celery
```sh
rabbitmq-server
```
Start Klein/SQLite/Celery
```sh
python pgmlab_server
```
Start Celery worker to begin processing tasks
```sh
celery -A pgmlab_server.celery worker --loglevel=info
```
