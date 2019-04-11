let bg;
let posicao_y_jogador = 475;
let posicao_x_jogador = 42;
let width_avatar = 100;
let height_avatar = 150;
let width=1080;
let height=720;
let pulo;
let tempo_pulo=0;
let pulando;
let pulo_posicao_y_jogador = posicao_y_jogador;

let personagem_parado=[];
let personagem_andando_esquerda=[];
let personagem_andando_direita=[];
let parado = true;
let andando_esquerda = false;
let andando_direita = false;
let indice_personagem_parado =1;
let indice_personagem_andando_esquerda =1;
let indice_personagem_andando_direita =1;
pulo_posicao_y_jogador = posicao_y_jogador;

let regua,vidas=5,reguaspace = 200;
let fontLuckiestGuy;

let num1,num2,resultado,pontos=0;
let fase=0,op;
let posicao_x_numeros = [], posicao_y_numeros = [], numeros = [];
let distancia_colisao=[];
let colidiu_certo=false,colidiu_errado=false, contador_de_frames=0;
let stop = false;

//Estados
let jogar = false, operacao = false, restart = false;
function preload() {
  //Carregando vetores de animação do avatar
  for (let i=1; i<=15; i++) {
    personagem_parado[i]  = loadImage("img/boy_1/Idle ("+i+")-min.png");
    personagem_andando_esquerda[i]  = loadImage("img/boy_1/Run ("+i+")-min-left.png");
    personagem_andando_direita[i]  = loadImage("img/boy_1/Run ("+i+")-min-right.png");
  }
  //Vidas
  regua = loadImage("img/regua.png");


  //carregando musica de fundo
  soundFormats('mp3', 'ogg');
  son_certo = loadSound('sons/certo.mp3');
  son_errado = loadSound('sons/errado.mp3');
  son_tema = loadSound('sons/tema.mp3');
  son_click = loadSound('sons/click.mp3');

  //Carregando fonts
  fontLuckiestGuy = loadFont('fonts/LuckiestGuy.ttf');

  bg = loadImage('img/full-background.png');

}

function setup() {
  createCanvas(width, height);
  adicao();
  son_tema.setVolume(0);
  son_tema.loop();
}

function draw() {
  clear();
  background(bg);
  if(jogar == false){
    textFont(fontLuckiestGuy,50);
    fill(23, 37, 199);
    text("Jogar",width/2.5, height/2);
    if (mouseIsPressed) {
      if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+140)) && (mouseY>=(height/2-27) && mouseY<=height/2)) {
        son_click.play();
        jogar=true;
      }
    }
  }else{
    if((jogar == true) && (operacao ==false)){
      textFont(fontLuckiestGuy,50);
      fill(224, 224, 42);
      text("Adição",width/2.5, height/6);
      fill(23, 37, 199);
      text("Subtração",width/2.5, height/6+100);
      fill(226, 124, 0);
      text("Multiplicação",width/2.5, height/6+200);
      fill(1, 104, 4);
      text("Divisão",width/2.5, height/6+300);
      fill(76, 81, 77);
      text("Todas",width/2.5, height/6+400);

      if (mouseIsPressed) {
        //Click Adição
        if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+155)) && (mouseY>=(height/6-25) && mouseY<=height/6)){
          son_click.play();
          operacao = true;
          op = 1;
          fase=1;
          adicao();
        }
        //Click subtração
        if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+255)) && (mouseY>=(height/6+65) && mouseY<=height/6+100)){
          son_click.play();
          operacao = true;
          op = 2;
          fase=1;
          subtracao();
        }
        //Click Multiplicação
        if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+355)) && (mouseY>=(height/6+170) && mouseY<=height/6+200)){
          son_click.play();
          operacao = true;
          op = 3;
          fase=1;
          multiplicacao();
        }
        //Click Divisão
        if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+175)) && (mouseY>=(height/6+270) && mouseY<=height/6+300)){
          son_click.play();
          operacao = true;
          op = 4;
          fase=1;
          divisao();
        }
        //Click Todas
        if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+155)) && (mouseY>=(height/6+370) && mouseY<=height/6+400)){
          son_click.play();
          operacao = true;
          op = 5;
          fase=1;
          todos();
        }
      }
    }else{
      if(stop == false){
        posterior();
      }else{
        son_tema.setVolume(0);
        fill(103, 29, 135);
        text("Reiniciar",width/2.5, height/6+100);
        text("Mudar operação",width/2.5, height/6+200);
        text("Sair",width/2.5, height/6+300);
        if (mouseIsPressed){
          //Click Reiniciar
          if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+220)) && (mouseY>=(height/6+65) && mouseY<=height/6+100)){
            posicao_y_jogador = 475;
            posicao_x_jogador = 42;
            tempo_pulo=0;
            pulo_posicao_y_jogador = posicao_y_jogador;
            width_avatar = 100;
            height_avatar = 150;
            pontos = 0;
            vidas =5;
            fase=1;
            stop = false;
            switch (op) {
              case 1:
              adicao();
              break;
              case 2:
              subtracao();
              break;
              case 3:
              multiplicacao();
              break;
              case 4:
              divisao();
              break;
              case 5:
              todos();
              break;
              default:
              adicao();
              break;
            }
          }
          //Click Mudar operação
          if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+410)) && (mouseY>=(height/6+160) && mouseY<=height/6+200)){
            operacao = false;
            posicao_y_jogador = 475;
            posicao_x_jogador = 42;
            tempo_pulo=0;
            pulo_posicao_y_jogador = posicao_y_jogador;
            width_avatar = 100;
            height_avatar = 150;
            pontos = 0;
            vidas =5;
            fase=1;
            stop = false;
          }
          //Click Sair
          if ((mouseX>=(width/2.5) && mouseX<=(width/2.5+100)) && (mouseY>=(height/6+260) && mouseY<=height/6+300)){
            remove();
          }
        }
      }
    }
  }

  function posterior(){
    son_tema.setVolume(0.3);
    andar_pular();
    pular();
    for(let i=0;i<vidas;i++){
      image(regua,reguaspace+(i*50),15,50,60);
    }
    textFont(fontLuckiestGuy,50);
    fill(250, 255, 0);
    text("Vidas:", 40, 60);
    fill(250, 255, 0);
    text("Fase:"+fase, 870, 60);
    mostrar_pontos();
    texto_op();
    mostrar();
    colisao();
    animacoes()
  }
}


function mostrar_pontos(){
  switch (pontos) {
    case 0:
    fase = 1;
    break;
    case 10:
    fase = 2;
    break;
    case 20:
    fase = 3;
    break;
    case 30:
    fase = 4;
    break;
    case 40:
    fase = 5;
    break;
    default:
    fase=1;
    break;
  }
  fill(250, 255, 0);
  text("Pontos:"+pontos, 470, 60);
}
function texto_op(){
  if(op ==1){
    switch (fase) {
      case 1:
      fill(224, 224, 42);
      text(num1+'+'+num2+'?', 40, 110);
      break;
      case 2:
      fill(224, 224, 42);
      text(num1+'+'+num2+'?', 40, 110);
      break;
      case 3:
      fill(224, 224, 42);
      text(num1+'+'+num2+'+'+num3+'?', 40, 110);
      break;
      case 4:
      fill(224, 224, 42);
      text(num1+'+'+num2+'+'+num3+'?', 40, 110);
      break;
      case 5:
      fill(224, 224, 42);
      text(num1+'+'+num2+'+'+num3+'+'+num4+'?', 40, 110);
      break;
      default:
      fill(224, 224, 42);
      text(num1+'+'+num2+'?', 40, 110);
      break;
    }
  }
  if(op ==2){
    switch (fase) {
      case 1:
      fill(23, 37, 199);
      text(num1+'-'+num2+'?', 40, 110);
      break;
      case 2:
      fill(23, 37, 199);
      text(num1+'-'+num2+'?', 40, 110);
      break;
      case 3:
      fill(23, 37, 199);
      text(num1+'-'+num2+'-'+num3+'?', 40, 110);
      break;
      case 4:
      fill(23, 37, 199);
      text(num1+'-'+num2+'-'+num3+'?', 40, 110);
      break;
      case 5:
      fill(23, 37, 199);
      text(num1+'-'+num2+'-'+num3+'-'+num4+'?', 40, 110);
      break;
      default:
      fill(23, 37, 199);
      text(num1+'-'+num2+'?', 40, 110);
      break;
    }
  }
  if(op ==3){
    switch (fase) {
      case 1:
      fill(226, 124, 0);
      text(num1+'x'+num2+'?', 40, 110);
      break;
      case 2:
      fill(226, 124, 0);
      text(num1+'x'+num2+'?', 40, 110);
      break;
      case 3:
      fill(226, 124, 0);
      text(num1+'x'+num2+'x'+num3+'?', 40, 110);
      break;
      case 4:
      fill(226, 124, 0);
      text(num1+'x'+num2+'x'+num3+'?', 40, 110);
      break;
      case 5:
      fill(226, 124, 0);
      text(num1+'x'+num2+'x'+num3+'x'+num4+'?', 40, 110);
      break;
      default:
      fill(226, 124, 0);
      text(num1+'x'+num2+'?', 40, 110);
      break;
    }
  }
  if(op ==4){
    fill(1, 104, 4);
    switch (fase) {
      case 1:
      fill(1, 104, 4);
      text(num1+'÷'+num2+'?', 40, 110);
      break;
      case 2:
      fill(1, 104, 4);
      text(num1+'÷'+num2+'?', 40, 110);
      break;
      case 3:
      fill(1, 104, 4);
      text(num1+'÷'+num2+'÷'+num3+'?', 40, 110);
      break;
      case 4:
      fill(1, 104, 4);
      text(num1+'÷'+num2+'÷'+num3+'?', 40, 110);
      break;
      case 5:
      fill(1, 104, 4);
      text(num1+'÷'+num2+'÷'+num3+'÷'+num4+'?', 40, 110);
      break;
      default:
      fill(1, 104, 4);
      text(num1+'÷'+num2+'?', 40, 110);
      break;
    }
  }
  if(op ==5){
    fill(1, 104, 4);
    switch (fase) {
      case 1:
      fill(224, 224, 42);
      text(num1+'+'+num2+'?', 40, 110);
      break;
      case 2:
      fill(23, 37, 199);
      text(num1+'-'+num2+'?', 40, 110);
      break;
      case 3:
      fill(226, 124, 0);
      text(num1+'x'+num2+'?', 40, 110);
      break;
      case 4:
      fill(1, 104, 4);
      text(num1+'÷'+num2+'?', 40, 110);
      break;
      case 5:
      fill(224, 224, 42);
      text(num1+'+'+num2+'?', 40, 110);
      break;
      default:
      fill(224, 224, 42);
      text(num1+'+'+num2+'?', 40, 110);
      break;
    }
  }
}

function animacoes(){
  //animação do personagem
  if (parado) {
    image(personagem_parado[indice_personagem_parado],posicao_x_jogador, pulo_posicao_y_jogador, width_avatar, height_avatar);
    if (indice_personagem_parado < 15) {
      indice_personagem_parado++;
    } else {
      indice_personagem_parado = 1;
    }
  }
  if (andando_esquerda) {
    image(personagem_andando_esquerda[indice_personagem_andando_esquerda],posicao_x_jogador, pulo_posicao_y_jogador, width_avatar, height_avatar);
    if (indice_personagem_andando_esquerda < 15) {
      indice_personagem_andando_esquerda++;
    } else {
      indice_personagem_andando_esquerda = 1;
    }
  }
  if (andando_direita) {
    image(personagem_andando_direita[indice_personagem_andando_direita],posicao_x_jogador, pulo_posicao_y_jogador, width_avatar, height_avatar);
    if (indice_personagem_andando_direita < 15) {
      indice_personagem_andando_direita++;
    } else {
      indice_personagem_andando_direita = 1;
    }
  }
}

function andar_pular() {
  if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && (posicao_x_jogador>=(4))){
    posicao_x_jogador -= 5;
    parado = false;
    andando_esquerda = true;
    andando_direita = false;
  }
  if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(65) && !keyIsDown(68)){
    parado = true;
    andando_esquerda = false;
    andando_direita = false;
  }
  if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && (posicao_x_jogador<(width-(width_avatar)))) {
    posicao_x_jogador += 5;
    andando_esquerda = false;
    andando_direita = true;
    parado = false;
  }
  if ((keyIsDown(UP_ARROW) || keyIsDown(32) || keyIsDown(87)) || (pulo_posicao_y_jogador<posicao_y_jogador)){
    pulando = true;
  }else{
    pulando = false;
  }
}



function pular(){
  if (pulando) {
    pulo =-(tempo_pulo-0)*(tempo_pulo-height*0.035);
    tempo_pulo = tempo_pulo + 0.5;
    if (pulo < 0) {
      pulando=false;
      pulo=0;
      tempo_pulo=0;
    }
    pulo_posicao_y_jogador = posicao_y_jogador - pulo;
  }
}

function colisao(){
  //COLISAO PERSONAGEM E INIMIGO
  for(let i = 0; i<4; i++) {
    distancia_colisao[i] = dist(posicao_x_jogador+width_avatar/2,pulo_posicao_y_jogador+height_avatar/2,posicao_x_numeros[i],posicao_y_numeros[i]);
    if(distancia_colisao[i]<=65){
      if(numeros[i] ==resultado){
        colidiu_certo = true;
        colidiu_errado = false;
      }else{
        colidiu_certo = false;
        colidiu_errado = true;
      }
    }
    if(colidiu_errado){
      colidiu_errado = false;
      colidiu_certo = false;
      posicao_x_numeros[i] = random(150, width-50);
      posicao_y_numeros[i] = random(-450, -50);
      numeros[i] = int(random(resultado-2,resultado+2));
      vidas--;
      if(vidas==5){
        stop = false;
      }else{
        stop = true;
      }
      son_errado.play();
    }
    if(colidiu_certo){
      colidiu_certo = false;
      colidiu_errado = false;
      pontos+=10;
      son_certo.play();
      switch (op) {
        case 1:
        adicao();
        break;
        case 2:
        subtracao();
        break;
        case 3:
        multiplicacao();
        break;
        case 4:
        divisao();
        break;
        default:
        adicao();
        break;
      }
    }
  }
}


function mostrar(){
  for(let i = 0; i<4; i++) {
    posicao_y_numeros[i] = posicao_y_numeros[i]+2;
    if ((posicao_y_numeros[i] > height+50)) {
      posicao_x_numeros[i] = random(150, width-50);
      posicao_y_numeros[i] = random(-450, -50);
      numeros[i] = int(random(resultado,resultado+3));
    }
    if(op ==1){
      fill(224, 224, 42);
    }
    if(op ==2){
      fill(23, 37, 199);
    }
    if(op ==3){
      fill(226, 124, 0);
    }
    if(op ==4){
      fill(1, 104, 4);
    }
    if(op ==5){
      fill(76, 81, 77);
    }
    text(numeros[i], posicao_x_numeros[i], posicao_y_numeros[i]);
  }
}

function adicao(){
  switch (fase) {
    case 1:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    resultado = num1+num2;
    break;
    case 2:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    resultado = num1+num2+num3;
    break;
    case 3:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    resultado = num1+num2+num3;
    break;
    case 4:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    resultado = num1+num2+num3+num4;
    break;
    case 5:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    resultado = num1+num2;
    break;
    default:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    resultado = num1+num2;
    break;
  }

  for(let i = 0; i<4; i++) {
    posicao_x_numeros[i] = random(150, width-50);
    posicao_y_numeros[i] = random(-450, -50);
    numeros[i] = int(random(resultado-2,resultado+2));
  }
}

function subtracao(){
  switch (fase) {
    case 1:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    while(num1<num2){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
    }
    resultado = num1-num2;
    break;
    case 2:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    while((num1<num2) || ((num1-num2)<num3)){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
    }
    resultado = num1-num2-num3;
    break;
    case 3:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    while((num1<num2) || ((num1-num2)<num3)){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
    }
    resultado = num1-num2-num3;
    break;
    case 4:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while ((num1<num2) || ((num1-num2)<num3) || ((num1-num2-num3)<(num4))) {
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = num1-num2-num3-num4;
    break;
    case 5:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    while(num1<num2){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
    }
    resultado = num1-num2;
    break;
    default:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while(num1<num2){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = num1-num2;
    break;
  }
  for(let i = 0; i<4; i++) {
    posicao_x_numeros[i] = random(150, width-50);
    posicao_y_numeros[i] = random(-450, -50);
    numeros[i] = int(random(resultado+1,resultado+3));
  }
}

function multiplicacao(){
  switch (fase) {
    case 1:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    resultado = num1*num2;
    break;
    case 2:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    resultado = num1*num2*num3;
    break;
    case 3:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    resultado = num1*num2*num3;
    break;
    case 4:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    resultado = num1*num2*num3*num4;
    break;
    case 5:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    resultado = num1*num2;
    break;
    default:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    resultado = num1*num2;
    break;
  }
  for(let i = 0; i<4; i++) {
    posicao_x_numeros[i] = random(150, width-50);
    posicao_y_numeros[i] = random(-450, -50);
    numeros[i] = int(random(resultado-2,resultado+2));
  }
}

function divisao(){
  switch (fase) {
    case 1:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    while(num1%num2!=0){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
    }
    resultado = num1/num2;
    break;
    case 2:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    while((num1%num2!=0) || (((num1/num2)%num3)!=0)){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
    }
    resultado = num1/num2/num3;
    break;
    case 3:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    while((num1%num2!=0) || (((num1/num2)%num3)!=0)){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
    }
    resultado = num1/num2/num3;
    break;
    case 4:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while ((num1%num2!=0) || ((num1/num2)%num3!=0) || (((num1/num2/num3)%(num4))!=0)) {
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = num1/num2/num3/num4;
    break;
    case 5:
    while(num1%num2!=0){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
    }
    resultado = num1/num2;
    break;
    default:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while(num1%num2!=0){
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = num1/num2;
    break;
  }
  for(let i = 0; i<4; i++) {
    posicao_x_numeros[i] = random(150, width-50);
    posicao_y_numeros[i] = random(-450, -50);
    numeros[i] = int(random(resultado+1,resultado+3));
  }
}

function todos(){
  switch (fase) {
    case 1:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while ((num1+num2)<(num3+num4)) {
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = (num1+num2)-(num3+num4);
    break;
    case 2:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while ((num1+num2)<(num3+num4)) {
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = (num1+num2)-(num3+num4);
    break;
    case 3:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while ((num1*num2)<(num3+num4)) {
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = (num1*num2)/(num3+num4);
    break;
    case 4:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while ((num1*num2)<(num3+num4)) {
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = (num1*num2)/(num3+num4);
    break;
    case 5:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    while ((num1+num2)<(num3+num4)) {
      num1 = int(random(1,9));
      num2 = int(random(1,9));
      num3 = int(random(1,9));
      num4 = int(random(1,9));
    }
    resultado = (num1+num2)-(num3+num4);
    break;
    default:
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    num3 = int(random(1,9));
    num4 = int(random(1,9));
    resultado = num1+num2;
    break;
  }
  for(let i = 0; i<4; i++) {
    posicao_x_numeros[i] = random(150, width-50);
    posicao_y_numeros[i] = random(-450, -50);
    numeros[i] = int(random(resultado+1,resultado+3));
  }
}
