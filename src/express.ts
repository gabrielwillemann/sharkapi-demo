import * as express from 'express';
import * as bodyParser from 'body-parser';

export let app;

export async function startExpress() {
  app = express();
  app.use(bodyParser.json());

  let port = process.argv[2] || 3000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
}
