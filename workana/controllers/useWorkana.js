
//controller

import { BASE_URL_WORKANA, HEADERS_WORKANA, PAGES } from "../services/config.js"
import ClientWorkana from "../services/client-workana.js";
const serviceWorkana = new ClientWorkana(BASE_URL_WORKANA, HEADERS_WORKANA);

export default class UseWorkana {

  async execute() {
   const allJobs = await Promise.all(
      Array.from({length:PAGES},(_,i)=>serviceWorkana.getJobs(i))
   )
   const data = allJobs.flat()
   
    
  }


  async notify(job) {
    console.log('notificando', job.slug)
  }

  async saveJobs() {
    console.log('salvando jobs')
  }
}
