## Simple DNS Server

This project implements a basic DNS server that simulates a request-response flow using an array of URLs and their corresponding IP addresses. The server listens for DNS requests over UDP and responds with the correct IP if the URL exists in the predefined list.

### Features
- Listens for DNS requests over a UDP socket
- Simulates DNS resolution with a predefined list of URLs and their corresponding IP addresses
- Logs incoming requests and outgoing responses

### Technologies Used
- Node.js
- UDP (Datagram) Sockets

### Setup
#### Prerequisites
To run this DNS server locally, you need the following installed:

- Node.js (v14 or higher)
- npm or yarn (for managing dependencies)

### Clone the repository
```
git clone https://github.com/Ajeet1606/dns-server.git
cd dns-server
```

### Install Dependencies
```
npm install
```

### Predefined URL-IP Mapping
In this project, the DNS server uses a predefined mapping of URLs to IP addresses. You can find and modify this mapping in the index.js file:
```
const db = {
  "hello.world": {
    type: "A",
    data: "127.0.0.1",
  },
  "blog.piyushgarg.dev": {
    type: "CNAME",
    data: 'hashnode.network',
  },
};
```
Feel free to add, remove, or change the URL and IP pairs based on your needs.

### Running the DNS Server
To start the DNS server, run the following command:
```
node index.js
```
The server will start listening for DNS requests on the configured UDP port (default is 53).

You should see output similar to this:
```
DNS server listening on 53
```

### How It Works
1. <b>Server Setup</b>: The DNS server listens on a UDP socket for incoming DNS requests.
2. <b>Request Handling</b>: When a request is received, the server extracts the URL being queried.
3. <b>Response</b>: If the URL is found in the predefined array of URLs and IP addresses, the server responds with the corresponding IP. If not, empty answers message is sent back.
4. <b>Logging</b>: Each request and response is logged in the console for debugging purposes.

### Example DNS Flow
<b>Request</b>: You can send a DNS request to the server, querying for the IP of an URL.
```
nslookup hello.world 127.0.0.1 for windows
dig @localhost hello.world for Mac
```

<b>Server Response</b>: The server checks its array, finds the IP, and sends it back as the response.