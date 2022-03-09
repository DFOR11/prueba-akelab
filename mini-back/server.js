var http = require('http');

const PORT = process.env.PORT || 7700;

const fs = require('fs');
const data = fs.readFileSync('Movies.json', 'UTF-8');

const server = http.createServer(async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Max-Age': 2592000,
    'Content-Type': 'application/json',
  };

  if (req.url.includes('/api') && req.method === 'GET') {
    const param = req.url.split('/api?')[1];

    console.log(param);
    if (!param) {
      res.writeHead(400, headers);
      res.write(JSON.stringify({ error: 'Bad request' }));
      return res.end();
    }

    let number = param.split('Akelab=')[1];

    if (!number || number !== '123456789') {
      res.writeHead(400, headers);
      res.write(JSON.stringify({ error: 'Bad request' }));
      return res.end();
    }
    res.writeHead(200, headers);
    res.write(data);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
