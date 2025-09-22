import amqp from "amqplib";

export class BrokerPublish {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async init() {
    this.connection = await amqp.connect(`amqp://${process.env.AMQP_USER}:${process.env.AMQP_PASS}@${process.env.AMQP_HOST || "localhost"}:${process.env.AMQP_PORT || 5672}`);
    this.channel = await this.connection.createChannel();
  }

  async publish(queue, job, durable = true) {
    
    if(!this.connection){
      throw new Error("Connection not initialized")
    }
    if (!this.channel) {
      throw new Error("Channel not initialized! Call init() first.");
    }

    await this.channel.assertQueue(queue, { durable });

    const sent = this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(job)));
    return sent; // true ou false
  }
}
