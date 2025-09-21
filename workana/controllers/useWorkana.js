
//controller

//Agendar execução, fazer a paginação por padrão
//Chamar meu banco para salvar
// Emite evento para a fila de notify
import { BASE_URL_WORKANA, HEADERS_WORKANA, PAGES } from "../services/config.js"
import ClientWorkana from "../services/client-workana.js";
const serviceWorkana = new ClientWorkana(BASE_URL_WORKANA, HEADERS_WORKANA);

export default class UseWorkana {
  async execute() {
  console.log('controller no ar')

    for(let i = 1; i <= PAGES; i++){
        const data = await serviceWorkana.getJobs(i)

        await Promise.all(
          data.map(async(job) => {
            /*bate no meu db e verifica se existe se não existe ele salva e chama o 
            notify/ se existir ele ignora e segue para o proximo
            
            */
            await this.notify(job)
          })
        )

    }
    
  }

  async notify(job) {
    console.log('notificando', job.slug)
  }

  async saveJobs() {
    console.log('salvando jobs')
  }
}
