# Preenchimento Automatico de Banco de Dados via Excel
Forma de pegar um arquivo .XLSX enviado via requisição HTTPS, ler seus dados e adicionar automaticamente a um banco de dado MongoDB.

## Esse sistema foi desenvolvido do projeto Agenda Aprendize.
Um adminstrador da escola através do Portal da Escola, sobe um arquivo Excel (XLSX) para o site e ao apertar para enviar, o sistema do site enviará esse arquivo para a API via requisição HTTPS que tem esse sistema.
Ao receber o arquivo, ele irá ler os dados, tranformar em JSON e com formato de Objeto, com esses Objetos basta passar por cada um deles e fazer o lançamento em um banco de dados que no meu caso estou usando o MongoDB.

# Bibliotecas utilzadas:
- Express | Criação das rotas e requisições HTTPS
- Mongoose | Interação com Banco de Dados
- Multer | Lidar com tranferência de arquivos via HTTPS
- XLSX | Leitura de arquivos Excel (XLSX)
