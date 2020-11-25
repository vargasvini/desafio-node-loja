# Desafio Node Loja

API desenvolvida para atender os requisitos solicitados no desafio: https://github.com/rh-southsystem/desafio-node-loja
 
### Caso de Uso
Foram definidos três perfis de usuário, atribuindo diferentes permissões para cada um, que são:

 - **Gerente** (Pode realizar qualquer ação disponível na API):
    - Adicionar novo produto
    - Editar produto existente
    - Deletar produto
    - Consultar um produto específico do catálogo
    - Buscar todos os produtos existentes no catálogo
    - Buscar todos os produtos díponíveis
 --
 - **Usuário Autorizado/Autenticado**:
    - Adicionar novo produto
    - Editar produto existente
    - Deletar produto
    - Consultar um produto específico do catálogo
--
- **Cliente (Acesso anônimo)**:
    - Consultar um produto específico do catálogo
    
Obs.: Para facilitar, foi criado um usuário para cada perfil:

USUÁRIO | SENHA | PERFIL | 
------ | -------------- | -------- |
|gerente_da_loja@gmail.com| pass123 | Gerente |
|usuario_autorizado@gmail.com| pass123 | Usuário Autorizado |
![alt text](https://lucid.app/publicSegments/view/3ee2a52b-eae0-4a76-ab17-0a711229507c/image.png)

### Endpoints

Abaixo estão as informações referentes aos endpoints disponíveis:

MÉTODO | FUNCIONALIDADE | ENDEREÇO | 
------ | -------------- | -------- |
|**PUT**| Adicionar Usuário | https://south-system-desafio-node-loja.herokuapp.com/auth/signup |
|**POST**| Autenticar Usuário | https://south-system-desafio-node-loja.herokuapp.com/auth/login |
|**GET**| Busca todos os produtos do catálogo (disponíveis e indisponíveis) | https://south-system-desafio-node-loja.herokuapp.com/catalog/products |
|**POST**| Cadastra um novo produto | https://south-system-desafio-node-loja.herokuapp.com/catalog/product |
|**PUT**| Edita um produto existente | https://south-system-desafio-node-loja.herokuapp.com//catalog/product/:productId |
|**POST**| Deleta um produto específico | https://south-system-desafio-node-loja.herokuapp.com/catalog/delete-product/:productId |
|**GET**| Busca um único produto do catálogo | https://south-system-desafio-node-loja.herokuapp.com/catalog/product/:productId |
|**GET**| Busca todos os produtodos **disponíveis** do catálogo | https://south-system-desafio-node-loja.herokuapp.com/catalog/available-products |

### Como consumir cada Endpoint
No projeto existe um arquivo chamado "API -Postman Collection.json", que pode ser importado diretamente no [Postman](https://www.postman.com/).

### Instalação

Abaixo estão listados os requisitos necessários para instalar o projeto e suas dependências:
 - Ter o Node.js instalado: https://nodejs.org/en/download/
 
Install the dependencies and devDependencies and start the server.

```sh
$ npm install
```


### Desenvolvimento
Iniciar:
```sh
$ npm start
```
Executar os testes:
```sh
$ npm test
```