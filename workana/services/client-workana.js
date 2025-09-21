
//Service

export default class ClientWorkana {
  
  constructor(BASE_URL_WORKANA, HEADERS_WORKANA) {
    this.baseUrl = BASE_URL_WORKANA;
    this.headersWorkana = HEADERS_WORKANA;
    
  }


  async getJobs(page) {  
    
    try {
        const response = await fetch(`${this.baseUrl}&page=${page}`, {
        headers: this.headersWorkana,
        });
        const data = await response.json();
        return data.results.results; //array de objetos -- 8jobs por req 
        
    } catch (error) {
        throw new Error('Error fetching jobs from Workana')
    }
  }

  
}
