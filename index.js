import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios=[];

function processarCadastroVoluntarios(requisicao,resposta)
{
     //processar os parametros da url em http://localhost:3000/CadastraUsuario.html?nome=Nataly+Lara&sobrenome=Moraes+da+Silva+&nomeUsuario=naatylara&cidade=Presidente+Prudente&uf=PR&cep=19025-410
    const usuario = {
                    nome: requisicao.query.nome,
                    sobrenome: requisicao.query.sobrenome,
                    telefone: requisicao.query.telefone,
                    cidade: requisicao.query.cidade,
                    uf: requisicao.query.uf,
                    cep: requisicao.query.cep,
                    faixaEtaria:requisicao.query.faixaEtaria
                    }
    //adiciona um nome usuario na lista de usuarios ja cadastrados
    listaUsuarios.push(usuario);

    //retornar a lista de usuarios

    let conteudoResposta = `
    <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <title>MENU DO SISTEMA</title>
        </head>
        <body>
            <h1>LISTA DE USUARIO CADASTRADO</h1>
            <table class="table table-striped table-hover">
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
            <a class="btn btn-primary" href="/" role="button">Inicio</a>
            <a class="btn btn-primary" href="/CadastraUsuario.html" role="button">Adotar outra criança</a>
        </body>
       
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html> `;  
        resposta.end(conteudoResposta);
}


const app = express();

//indicando para a aplicacao como servir arquivo estaticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/',(requisicao,resposta) =>{
    resposta.end(`
    <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <title>MENU DO SISTEMA</title>
        </head>
        <body>
            <h1>MENU</h1>
            <ul>
                <li><a href="/CadastraUsuario.html">CADASTRA USUARIO</a></li>
            </ul>
        </body>
    </hmtl>`)
})

//rota para processar o cadastro de usuarios endpont = '/CadastraUsuario'

app.get('/Cadastrados', processarCadastroVoluntarios);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})