twistd -n web --class=server.resource -c .crossbar/example.cert.pem -k .crossbar/example.privkey.pem --https=8888 --port=8000
# insecure (for dev on http, https wont allow connection to wss but wss handshake always canceled)
# twistd -n web --port=8000
