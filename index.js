const dgram = require("node:dgram");
const dnsPacket = require("dns-packet");
const server = dgram.createSocket("udp4");

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

server.on("message", (msg, rinfo) => {
  const incomingPacket = dnsPacket.decode(msg);

  console.log({
    question: incomingPacket.questions[0],
    rinfo,
  });

  const name = incomingPacket.questions[0].name;

  const record = db[name];
  console.log('record', record);
  if (!record) {
    server.send(
      dnsPacket.encode({
        ...incomingPacket,
        answers: [],
      }),
      rinfo.port,
      rinfo.address
    );
    return;
  }

  const answer = dnsPacket.encode({
    type: "response",
    id: incomingPacket.id,
    flags: dnsPacket.AUTHORITATIVE_ANSWER,
    questions: incomingPacket.questions,
    answers: [
      {
        type: record.type,
        class: "IN",
        name,
        data: record.data,
      },
    ],
  });
  server.send(answer, rinfo.port, rinfo.address);
});

server.bind(53, () => {
  console.log("server listening on " + server.address().port);
});
