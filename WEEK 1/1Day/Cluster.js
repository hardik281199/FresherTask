var cluster = require('cluster');

if (cluster.isWorker) {
  console.log('I am ');
} else {
  console.log('I am a master');
  //cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.kill;       
}