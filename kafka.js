const { HighLevelProducer, KafkaClient } = require('kafka-node'); 

const client = new KafkaClient(); 
const producer = new HighLevelProducer(client);


producer.createTopics(['t','t1'], false, function (err, data) {
    console.log(data);
});


producer.createTopics(['t'], true, function (err, data) {});
producer.createTopics(['t'], function (err, data) {}); 

