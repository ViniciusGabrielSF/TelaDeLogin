/*
*todas as variáveis ou constantes com El no final don nome são elementos HTML
*/ 

const loginButtonEl = document.querySelector('#loginButton');
const mainEl = document.querySelector('main');

const apiUrl = 'https://login.microsoftonline.com/be87ed09-e753-468f-8244-e2f3811ceacc/oauth2/v2.0/token';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'SdkVersion': 'postman-graph/v1.0'
};

/*
* Dá as respostas ao Usuário dependendo do sucesso ou falha do login
*/
function loginState(responseObject){
    console.log(responseObject);
    const pUnloggedEl = mainEl.querySelector('p');

    if( responseObject.error === undefined ){
        generateLoggedScreen();
    }else {
        pUnloggedEl.style.color = 'red';
    
        switch(responseObject.error_codes[0]) {
            case 50034 : 
                pUnloggedEl.innerHTML = 'O usuário não existe, tente novamente';
                break; 
            case 900144 :
                pUnloggedEl.innerHTML = 'Usuário ou senha vazios, tente novamente';
                break;
            default :
                pUnloggedEl.innerHTML = 'Usuário ou senha inválidos, tente novamente';
                break;
        }
    }

}

/*
* Cria dinamicamente a pagina do usuário quando não está logado
*/

function generateUnLoggedScreen(){
    document.title = 'Tela de Login';
    mainEl.innerHTML = '';
    mainEl.classList.remove('logged-main');

    let h1UnloggedEl = document.createElement('h1');
    h1UnloggedEl.innerHTML = 'Fazer Login';
    mainEl.appendChild(h1UnloggedEl);

    let pUnloggedEl = document.createElement('p');
    pUnloggedEl.innerHTML = 'Insira os dados e entre em sua conta';
    mainEl.appendChild(pUnloggedEl);

    let sectionUnloggedEl = document.createElement('section');
    mainEl.appendChild(sectionUnloggedEl);


    let inputUserUnloggedEl = document.createElement('input');
    inputUserUnloggedEl.type = 'email';
    inputUserUnloggedEl.id = 'user';
    sectionUnloggedEl.appendChild(inputUserUnloggedEl);

    let labelUserUnloggedEl = document.createElement('label');
    labelUserUnloggedEl.innerHTML = 'Usuário: ';
    labelUserUnloggedEl.htmlfor = inputUserUnloggedEl.id;
    sectionUnloggedEl.insertBefore(labelUserUnloggedEl,inputUserUnloggedEl);


    let inputPasswordUnloggedEl = document.createElement('input');
    inputPasswordUnloggedEl.type = 'password';
    inputPasswordUnloggedEl.id = 'password';
    sectionUnloggedEl.appendChild(inputPasswordUnloggedEl);

    let labelPasswordUnloggedEl = document.createElement('label');
    labelPasswordUnloggedEl.innerHTML = 'Senha: ';
    labelPasswordUnloggedEl.htmlfor = inputPasswordUnloggedEl.id;
    sectionUnloggedEl.insertBefore(labelPasswordUnloggedEl,inputPasswordUnloggedEl);

    let buttonLoginEl = document.createElement('button');
    buttonLoginEl.innerHTML = 'Entrar';
    buttonLoginEl.id = 'buttonLogin';
    buttonLoginEl.addEventListener('click',MakeRequest);
    sectionUnloggedEl.appendChild(buttonLoginEl);
}

/*
* Cria dinamicamente a pagina do usuário quando está logado
*/
function generateLoggedScreen(){
    document.title = 'Usuário Logado';
    mainEl.innerHTML = '';
    mainEl.classList.add('logged-main');

    let h1LoggedEl = document.createElement('h1');
    h1LoggedEl.innerHTML = 'Usuário Logado';
    mainEl.appendChild(h1LoggedEl);

    let pLoggedEl = document.createElement('p');
    pLoggedEl.innerHTML = 'Clique no botão para sair';
    mainEl.appendChild(pLoggedEl);

    let buttonLoggedEl = document.createElement('button');
    buttonLoggedEl.innerHTML = 'Sair';
    buttonLoggedEl.addEventListener('click',generateUnLoggedScreen);
    mainEl.appendChild(buttonLoggedEl);

}

/*
* faz o request e manda o retorno para ser tratado na LoginState
*/
function MakeRequest(){

    const userEl = document.querySelector('#user');
    const passwordEl = document.querySelector('#password');

    const body = new URLSearchParams();

    body.append('grant_type', 'password');
    body.append('client_id','682aac27-6b4b-4f13-a4f9-21f8b0f30f08');
    body.append('client_secret', '.C=T8S7[XpPu0qY-HTPcUgVObr4=bHUF');
    body.append('scope', 'https://graph.microsoft.com/.default');
    body.append('userName', userEl.value);
    body.append('password', passwordEl.value);

    const config = { method: 'post', body, headers};

   fetch(apiUrl,config)
    .then(res => res.json())
    .catch(res => console.error('Houve um erro: ',res.message))
    .then( responseObject => loginState(responseObject));
        
}

loginButtonEl.addEventListener('click',MakeRequest);

