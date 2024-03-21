var zoom = 1.0;
var palpites = []; // COONTÉM OS PALPITES
var avaliacoes = []; // COONTÉM AS AVALIAÇÕES DOS PALPITES
var cursor = 0; // POSIÇÃO DO PALPITE
var senha = []; // SENHA A SER DESCOBERTA
var tela = 'INICIAL'; // QUAL TELA VISÍVEL
var n_cursor = 0; // NÚMERO DO PALPITE ATUAL
var Tabela = document.getElementById("tbl_palpites");
var Avaliacoes = document.getElementById("tbl_avaliacoes");
var som_aplauso = new Audio();  som_aplauso.src="aplauso.mp3";   // SOM DE APLAUSO
var ganhou = false; 
var n_ajuda = 1;

// VERIFICA CLIQUE NA TABELA.
Tabela.addEventListener("click", (event) => {
  const x = Math.floor((event.clientX-5)/60);
  const y = Math.floor((event.clientY-200)/80);

  if (y == (n_cursor-1)) {
    palpites[n_cursor-1][x] = (palpites[n_cursor-1][x]%6)+1; 
    let aux = palpites[n_cursor-1][x].toString();
    MudaImagem(Tabela,y+1,x+1,"imagens/b"+aux+".png")};
});

// MUDA A IMAGEM CONTIDA EM UMA CÉLULA DE UMA TABELA
function MudaImagem(table, row, column, newImage) {
  if (table && row > 0 && row <= table.rows.length && column > 0 && column <= table.rows[0].cells.length) {
    const cell = table.rows[row-1].cells[column-1]; 
    const image = cell.querySelector("img");
    if (image) {
      image.src = newImage;
    }
  }
}

// SPRTEOA UMA NOVA SENHA
function SorteiaSenha(){
  let a1 = Math.floor(Math.random()*6)+1;
  let a2 = Math.floor(Math.random()*6)+1;
  let a3 = Math.floor(Math.random()*6)+1;
  let a4 = Math.floor(Math.random()*6)+1;

  while (a2 == a1) {a2 = Math.floor(Math.random()*6)+1;}
  while (a3 == a2 || a3 == a1 ) {a3 = Math.floor(Math.random()*6)+1;}
  while (a4 == a3 || a4 == a2 || a4 == a1) {a4 = Math.floor(Math.random()*6)+1;}

  senha[0] = a1;
  senha[1] = a2;
  senha[2] = a3;
  senha[3] = a4;
}

 // FAZ AVALIAÇÃO DO PALPITE ATUAL
function AvaliaPalpite(){
  let av = ["s0","s0","s0","s0"]; // NOME DAS IMAGNES DE AVALIAÇÃO
  let n_av = -1; // POSIÇÃO ATUAL DO PONTEIRO DE IMAGENS DE AVALIAÇÃO
  let p = []; // ARMAZENA TEMPORARIAMENTE O PALPITE ATUAL
  let acertos = 0; // NÚMERO DE ACERTOS NO PALPITE ATUAL

  p = palpites[n_cursor-1];

   // VERIFICANDO MOSCAS
   for (let r = 0; r<4; r++){
    if (p[r] == senha[r]) {
      n_av++;
      av[n_av] = "s1";
      acertos++;
    }
   }
   // VERIFICANDO TIROS
   if (p[0] == senha[1]  || p[0] == senha[2] || p[0] == senha[3]){ n_av++;  av[n_av] = "s2"};
   if (p[1] == senha[0]  || p[1] == senha[2] || p[1] == senha[3]){ n_av++;  av[n_av] = "s2"};
   if (p[2] == senha[0]  || p[2] == senha[1] || p[2] == senha[3]){ n_av++;  av[n_av] = "s2"};
   if (p[3] == senha[0]  || p[3] == senha[1] || p[3] == senha[2]){ n_av++;  av[n_av] = "s2"};
  
   MudaImagem(Avaliacoes,(n_cursor-1)*2+1,1,"imagens/"+av[0]+".png");
   MudaImagem(Avaliacoes,(n_cursor-1)*2+1,2,"imagens/"+av[1]+".png");
   MudaImagem(Avaliacoes,(n_cursor-1)*2+2,1,"imagens/"+av[2]+".png");
   MudaImagem(Avaliacoes,(n_cursor-1)*2+2,2,"imagens/"+av[3]+".png");

   // VERIFICA SE GANHOU
   if (acertos == 4) {ganhou = true};
}

var btReiniciar = document.getElementById("bt_Reiniciar");
btReiniciar.addEventListener("click", ReiniciarJogo);

// REINICIANDO O JOGO
function ReiniciarJogo(){
  // MOSTRANDO A TELA DE JOGO
  document.getElementById("div_Jogo").style.display = "none";
  document.getElementById("div_Inicial").style.display = "block";
}

// VERIFICA PALPITE
var btVerifica = document.getElementById("bt_Verifica");
btVerifica.addEventListener("click", VerificaPalpite);
function VerificaPalpite(){
  AvaliaPalpite(n_cursor);

  if (ganhou == true){
      som_aplauso.play();
      document.getElementById("bt_Verifica").style.display = "none";
  } else
  if (n_cursor < 6){
    n_cursor++;
    for (let r = 0; r < 4;r++){
      palpites[n_cursor-1][r] = palpites[n_cursor-2][r];
      MudaImagem(Tabela,n_cursor,r+1,"imagens/b"+palpites[n_cursor-1][r].toString()+".png");
    }
 
   // POSICIONANDO O BOTÃO VERIFICA
   document.getElementById("bt_Verifica").style.top = 208+(n_cursor-1)*76+'px';
   } else {
     // ESCONDE O BOTÃO VERIFICA E MOSTRA A SENHA
     document.getElementById("bt_Verifica").style.display = "none";
     document.getElementById("img_Senha").style.display = "block";
     document.getElementById("div_Senha").style.display = "block";

     // MOSTRANDO A SENHA
     aux = senha[0]+" "+senha[1]+" "+senha[2]+" "+senha[3];
     document.getElementById("div_Senha").textContent = aux;
  }  
};

// INICIA O JOGO
var btIniciar = document.getElementById("bt_Iniciar");
btIniciar.addEventListener("click", IniciarJogo) 
function IniciarJogo(){
   // MOSTRANDO A TELA DE JOGO
   document.getElementById("div_Jogo").style.display = "block";
   document.getElementById("div_Inicial").style.display = "none";
   document.getElementById("img_Senha").style.display = "none";
   document.getElementById("div_Senha").style.display = "none";


   ganhou = false;

   // INICIALIZANDO TABELA DE PALPITES
   for (let y = 0; y < 7; y++){
     for (let x = 0; x < 4; x++){
         MudaImagem(Tabela,y,x+1,"imagens/b0.png")
     }
   }

   // INICIALIZANDO TABELA DE PALPITES
   for (let y = 1; y < 13; y++){
      MudaImagem(Avaliacoes,y,1,"imagens/s0.png")
      MudaImagem(Avaliacoes,y,2,"imagens/s0.png")
   }
  

   // SORTEIA A SENHA
   SorteiaSenha();

   // INICIALIZANDO O ARRAY DE PALPITES
   for (let r = 0; r < 6;r++) {palpites[r] = [r+1,r+1,r+1,r+1]}
   n_cursor = 1;
   for (let r = 0; r < 4;r++){MudaImagem(Tabela,n_cursor,r+1,"imagens/b"+palpites[n_cursor-1][r]+".png")}

  // POSICIONANDO O BOTÃO VERIFICA
  document.getElementById("bt_Verifica").style.display = "block";
  document.getElementById("bt_Verifica").style.top = 208+(n_cursor-1)*76+'px';
};

// DIMINUI O ZOOM DA PÁGINA
function DiminuiZoom(){
    zoom = zoom - 0.02;
    document.body.style.zoom = zoom;
}

// AUMENTA O ZOOM
function AumentaZoom(){
    zoom = zoom + 0.02;
    document.body.style.zoom = zoom;
}  

// MOSTRA A PRÓXIMA AJUDA
var imgAjuda = document.getElementById("img_Ajuda");
imgAjuda.addEventListener("click", ProximaAjuda);
function ProximaAjuda(){
  n_ajuda++;
  if (n_ajuda == 6){
    document.getElementById("div_Ajuda").style.display = "none";
  } 
  imgAjuda.src="Ajuda/0"+n_ajuda.toString()+".png";
}

// MOSTRA A DIV DE AJUDA
var btAjuda = document.getElementById("bt_Ajuda");
btAjuda.addEventListener("click", MostraAjuda);
function MostraAjuda(){
  n_ajuda = 1;
  imgAjuda.src="Ajuda/0"+n_ajuda.toString()+".png";
  document.getElementById("div_Ajuda").style.display = "block";

}

// ESCONDE AS DIV DE JOGO E AJUDA
document.getElementById("div_Jogo").style.display = "none";
document.getElementById("div_Ajuda").style.display = "none";

