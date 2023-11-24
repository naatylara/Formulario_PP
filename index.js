import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

const app = express();

//indicando para a aplicacao como servir arquivo estaticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/',(requisisao,resposta) =>{
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
    </hmtl>
    
    
    
    
    `)
})

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})