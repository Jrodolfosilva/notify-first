# Notify-First

## Descrição

O **Notify-First** é uma plataforma de notificação para freelancers que agrega oportunidades de diversas plataformas, começando pela **Workana**.  

O objetivo é permitir que freelancers recebam alertas rápidos sobre novas vagas, evitando barreiras comuns como demora na resposta do cliente ou concorrência alta.  

---

## Propósito

- Agregar jobs das principais plataformas de freelancers e de emprego em tempo real.  
- Notificar freelancers de forma imediata sobre novas oportunidades.  
- Permitir segmentação por categoria e palavra-chave.    
- Enviar notificações via WhatsApp ou outros canais integráveis.  

---

## Benefícios

- Economia de tempo na busca de jobs.  
- Aumento da taxa de resposta e fechamento de serviços.  
- Organização centralizada das oportunidades.  

---

## Tecnologias

- **Node.js** + **Express** – servidor e APIs.  
- **RabbitMQ** – comunicação entre microserviços e fila de jobs.  
- **Fetch / API Requests** – obtenção de jobs da Workana.  
- **Banco de dados** – MongoDB, PostgreSQL e Redis.  
- **WhatsApp API** – envio de notificações, API própria desenvolvida utilizando a Lib Baileys.  
- **Microserviços** – cada plataforma é um serviço isolado.  

---

## Arquitetura

1. **Serviços coletores**: coleta jobs, verifica duplicidade e envia para a fila.  
2. **Fila RabbitMQ**: gerencia os jobs a serem notificados.  
3. **Serviço de Notificação**: consome a fila e envia mensagens via WhatsApp.  
4. **Banco de dados**: armazena jobs já processados para evitar duplicidade.  
