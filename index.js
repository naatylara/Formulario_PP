import express from 'express';

import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios=[];

function processarCadastroVoluntarios(requisicao,resposta)
{
     // extrair os dados do corpo da requisição, além de validar os dados
     const dados = requisicao.body;
     let conteudoResposta = '';
     
     if (!(dados.nome && dados.sobrenome && dados.tel
         && dados.cidade && dados.uf && dados.cep && dados.faixaEtaria)) 
        {
            conteudoResposta = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Adote uma Criança - Formulário de Voluntariado</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <style>
                        .container{
                            margin: 55px auto;
                            width: 680px;           
                            padding: 20px;  
                            background-color:white;                 
                        }
                    </style>
                </head>
                <body background="Natal.jpg">        
                    <div class="container">
                        <form action="/Cadastrados" method='POST' class="row g-3 needs-validation g-3" novalidate >
                        <!-- <fieldset class="border p-2">-->
                            <legend class="mb-3" style="text-align: center;">Formulário de Voluntariado - Campanha de Natal</legend>
                            
                            <div class="col-md-4">
                            <label for="" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
                            </div>
                `;
                if (!dados.nome){
                    conteudoResposta +=
                        `
                            <div>
                            <p class="text-danger">Por favor, informe o nome!</p>
                            </div>  `;}
                conteudoResposta +=`
                            <div class="col-md-4">
                            <label for="sobrenome" class="form-label">Sobrenome</label>
                            <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${dados.sobrenome}" required>
                            </div>
                            `;
                if (!dados.sobrenome){
                    conteudoResposta += `
                            <div>
                            <p class="text-danger">Por favor, informe seu sobrenome!</p>
                            </div>`;}
        
                    conteudoResposta +=`
                            <div class="col-md-4">
                            <label for="tel" class="form-label">Telefone</label>
                            <div class="input-group has-validation">
                                <input type="tel" class="form-control" id="tel" name="tel" aria-describedby="inputGroupPrepend" value="${dados.tel}" required>
                            </div>`;
                    if (!dados.tel){   
                        conteudoResposta+=`             
                                <div>
                                <p class="text-danger">Por favor, informe o seu telefone!</p>
                                </div>`;}
                    conteudoResposta +=`
                            <div class="col-md-4">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade" value= "${dados.cidade}" required>
                            </div>`;
                    if(!dados.cidade){
                        conteudoResposta +=`
                            <div>
                            <p class="text-danger">Por favor, informe sua cidade!</p>
                            </div>`;}
                        conteudoResposta +=`
                            <div class="col-md-4">
                            <label for="uf" class="form-label">UF</label>
                            <select class="form-select" id="uf" name="uf" value= "${dados.uf}" required>
                                <option selected disabled value="">Escolha um estado</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                                <option value="EX">Estrangeiro</option>
                            </select>
                            </div>`;
                    if(!dados.uf){
                        conteudoResposta+=`
                            <div>
                            <p class="text-danger">Por favor, informe o seu estado!</p>
                            </div>
                            </div>`;}
                            conteudoResposta+=`
                            <div class="col-md-4">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" name="cep" value= "${dados.cep}" required>
                            </div>`;  
                    if(!dados.cep){
                        conteudoResposta +=`                          
                             <div >
                             <p class="text-danger">Por favor, informe o seu CEP!</p>
                            </div>`;}
                            conteudoResposta+=`
                            <div class="col">
                                <label for="faixaEtaria">Faixa Etária da Criança:</label>
                                <select class="form-select" id="faixaEtaria" name="faixaEtaria" value= "${dados.faixaEtaria}" required>
                                <option selected disabled value="">Selecione a idade</option>
                                <option value="0-2">0-2 anos</option>
                                <option value="3-5">3-5 anos</option>
                                <option value="6-8">6-8 anos</option>
                                <option value="9-11">9-11 anos</option>
                                <option value="12-15">12-15 anos</option>
                            </select>
                            </div>`;
                    if(!dados.faixaEtaria){
                        conteudoResposta +=`
                            <div >
                            <p class="text-danger">Por favor, informe a faixa etaria escolhida!</p>
                            </div>`;}
                            conteudoResposta += `
                            <div class="col-12 mt-4"></div>              
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button class="btn btn-danger" style="font-size: larger;"type="submit">Cadastrar</button>
                            </div>                            
                        </form>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                    </body>
                    </html>`;
                    resposta.end(conteudoResposta);
        } 
        else
        {
            
            const usuario = {
                                nome: dados.nome,
                                sobrenome: dados.sobrenome,
                                telefone: dados.tel,
                                cidade: dados.cidade,
                                uf: dados.uf,
                                cep: dados.cep,
                                faixaEtaria: dados.faixaEtaria
                            }
            //adiciona um nome usuario na lista de usuarios ja cadastrados
            listaUsuarios.push(usuario);

            //retornar a lista de usuarios

            conteudoResposta = `
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <title>Adote uma Criança - Lista Voluntariado </title>
                </head>
                <body background="Natal.jpg">
                    <h1 style="text-align: center; color:white">LISTA DE VOLUNTARIADOS</h1>
                    <table class="table table-danger table-hover">
                        <thead>
                            <tr>
                                <th scope="col">NOME</th>
                                <th scope="col">SOBRENOME</th>
                                <th scope="col">TELEFONE</th>
                                <th scope="col">CIDADE/UF</th>
                                <th scope="col">CEP</th>   
                                <th scope="col">FAIXA ETARIA DESEJADA</th>              
                            </tr>
                        </thead>   
                        <tbody>`; 
                        
                for (const usuario of listaUsuarios)
                    {
                        conteudoResposta += `
                            <tr>
                                <td>${usuario.nome}</td>
                                <td>${usuario.sobrenome}</td>
                                <td>${usuario.tel}</td>
                                <td>${usuario.cidade}/${usuario.uf}</td>
                                <td>${usuario.cep}</td>
                                <td>${usuario.faixaEtaria}</td>
                            </tr>
                            `;
                    }
                conteudoResposta +=`
                            </tbody>
                        </table>
                        <a class="btn btn-danger" href="/" role="button">Inicio</a>
                        <a class="btn btn-danger" href="/Form_Volun.html" role="button">Adotar outra criança</a>
                    </body>
                
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                    </html> `;  
                    resposta.end(conteudoResposta);
        } //fim else
}



const app = express();

//ativar a extensão que manipula requisisões HTTP
//opção false ativa a extensão querystring
//opção true ativa a extensão qs (manipula objetos (lista, aninhados))
app.use(express.urlencoded({ extended: true }));


//indicando para a aplicacao como servir arquivo estaticos localizados na pasta 'paginas'
app.use(express.static(path.join(process.cwd(),'paginas')));

//pagina inicial
app.get('/',(requisicao,resposta) =>{
    resposta.end(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Adote uma Criança </title>
            <style>
            body{
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
            }

            .container{
                margin: 55px auto;
                width: 680px;           
                padding: 20px;  
                background-color:white;                 
            }
        
            </style>
        </head>
        <body background="Natal.jpg" >
            <div class="container">
                <h1>MUDE O NATAL DE UMA CRIANÇA !!</h1>
                <h2>Adote uma criança e dê um presente</h2>
                <hr>
                <p>Cadastre aqui o seu interesse em retirar conosco <br>uma cartinha e seja o Papai Noel de uma criança!</p>
                <ul>
                    <p><a href="/Form_Volun.html">CADASTRAR</a></p>
                </ul>
            </div>
        </body>
    </html>         
    `);
})

//rota para processar o cadastro de usuarios endpont = '/CadastraUsuario'

app.post('/Cadastrados', processarCadastroVoluntarios);
//primeiro foi get, agora e post 

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})