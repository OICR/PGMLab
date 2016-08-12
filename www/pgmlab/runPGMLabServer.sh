twistd -n web --class=server.resource -c .crossbar/example.cert.pem -k .crossbar/example.privkey.pem --https=8888 --port=8000
