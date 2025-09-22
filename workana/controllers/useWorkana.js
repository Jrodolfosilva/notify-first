//controller
import { BrokerPublish } from "../broker/channel/queueSaveJob.js";
import clientRedis from "../db/redis/clientRedis.js";
import {
  BASE_URL_WORKANA,
  HEADERS_WORKANA,
  PAGES,
} from "../services/config.js";

import ClientWorkana from "../services/client-workana.js";
const serviceWorkana = new ClientWorkana(BASE_URL_WORKANA, HEADERS_WORKANA);
const broker = new BrokerPublish();
broker.init()

export default class UseWorkana {
  async execute() {
    const allJobs = await Promise.all(
      Array.from({ length: PAGES }, (_, i) => serviceWorkana.getJobs(i))
    );
    const data = allJobs.flat();
    this.processJobs(data);
  }

  async processJobs(dataAllJobs) {
    for (const job of dataAllJobs) {
      const exist = await clientRedis.get(`workana:${job.slug}`);

      if (exist) {
        console.log("Já foi cadastro!");
        continue;
      }
      if (!exist) {
        try {
          await clientRedis.set(`workana:${job.slug}`, JSON.stringify(job), {
            EX: 172800,
          }); //TTL em segundos: 2 dias (2 * 24 * 60 * 60)

          this.emitJob(job);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  async emitJob(job) {
    const sendMessage = await broker.publish("save_job", job, true);
    if (!sendMessage) {
      throw new Error("Message not send");
    }
  }
}
