import net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  // Handle connection
  //   const coorelationID = 7;
  //   const response = Buffer.from([0, 0, 0, 0, 0, 0, 0, coorelationID]);
  //   connection.write(response);
  connection.on("data", function (data) {
    const apiVersions = [0, 1, 2, 3, 4];
    const request_api_key = data.subarray(0, 2);
    const request_api_version = data.subarray(2, 4);
    const correlation_id = data.subarray(4, 12);
    // connection.write(correlation_id);
    if (apiVersions.includes(request_api_version)) {
      connection.write(correlation_id);
    } else {
      connection.write(correlation_id);
      connection.write(new Uint8Array([0, 35]));
    }
  });
});

server.listen(9092, "127.0.0.1");
// 0,0 -> request_api_key
// 0,0 -> request_api_version
//0,0,0,0 -> correlation_id
