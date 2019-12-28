const express = require('express');
const cors = require('cors');
const data = require('./data.json');

const app = express();
const port = 3000;

app.use(cors());
app.get('/', (req, res) => res.send(data));

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server listening on port http://localhost:${port}!👂🚀`)
);
