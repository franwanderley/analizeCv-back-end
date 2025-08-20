# 🚀 AnaliseCV Backend: Análise de Currículos com IA Gemini
Este projeto é um serviço de back-end desenvolvido para analisar currículos em formato PDF e gerar feedback construtivo utilizando a inteligência artificial da Google Gemini. Com uma API RESTful, ele permite que aplicações front-end enviem currículos para serem processados, recebendo dicas personalizadas para otimizar o documento.

O principal objetivo é demonstrar a integração de Node.js e Fastify com capacidades avançadas de IA, oferecendo uma ferramenta prática para auxiliar na melhoria de currículos.

## ✨ Funcionalidades
Recebe currículos em formato PDF via upload.

Extrai o texto do PDF.

Envia o texto para a API Gemini para análise.

Gera feedback detalhado sobre pontos fortes, pontos a melhorar e sugestões de formatação.

API RESTful de alta performance.

## 💻 Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript assíncrono.

Fastify: Framework web rápido e de baixo overhead para Node.js.

Google Gemini API: Inteligência Artificial para análise textual e geração de feedback.

@fastify/multipart: Plugin Fastify para lidar com upload de arquivos (multipart/form-data).

pdf-parse: Biblioteca para extrair texto de arquivos PDF.

dotenv: Para gerenciamento seguro de variáveis de ambiente.

## 🚀 Como Usar no Seu PC
Siga os passos abaixo para clonar o repositório, instalar as dependências e executar o projeto em sua máquina local.

Pré-requisitos
Node.js (versão 14.x ou superior)

npm ou Yarn

1. Clonar o Repositório
Primeiro, clone o repositório para o seu ambiente local usando Git:
``` cmd
   git clone https://github.com/franwanderley/analizeCv-back-end.git
   cd analizeCv-back-end
```

2. Instalar Dependências
Dentro do diretório do projeto, instale todas as dependências necessárias:
``` cmd
   npm install
   # ou
   yarn install
```
3. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto para armazenar sua chave de API da Gemini.
``` env
   # .env
   GEMINI_API_KEY=SUA_CHAVE_DA_API_GEMINI_AQUI
```
Importante: Obtenha sua chave da API Gemini no Google AI Studio (ou Google Cloud).

4. Executar o Servidor
Após configurar as variáveis de ambiente, você pode iniciar o servidor Fastify:
``` cmd
   npm start
   # ou
   yarn start
```
O servidor será iniciado na porta 3333 por padrão. Você verá uma mensagem no console indicando que o servidor está pronto.

5. Testar a API
A API expõe um endpoint para análise de currículos. Você pode testá-lo usando ferramentas como Postman, Insomnia ou curl.

Endpoint: POST http://localhost:3333/analize-curriculum

Envie uma requisição POST com o cabeçalho Content-Type: multipart/form-data e um campo de formulário chamado file contendo o seu arquivo PDF.

Exemplo de uso com curl:
``` curl
   curl -X POST -F "file=@/caminho/do/seu/curriculo.pdf" http://localhost:3333/analize-curriculum
```
Substitua /caminho/do/seu/curriculo.pdf pelo caminho real do seu arquivo PDF.

Sinta-se à vontade para contribuir com este projeto!