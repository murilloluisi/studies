import { Component, OnInit } from '@angular/core';
import { filter, from, Observable, reduce } from 'rxjs';

@Component({
  selector: 'curso-rw-dev',
  templateUrl: './curso-rw-dev.component.html',
  styleUrls: ['./curso-rw-dev.component.css']
})
export class CursoRwDevComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.aula01()
    this.aula02()

  }

  // PROGRAMAÇÃO REATIVA:
  // PARADIGMA BASEADO NO FLUXO DE DADOS ASSÍNCRONOS E NA PROPAGAÇÃO DE MUDANÇAS NESSE FLUXO;

  // OU SEJA, UMA FONTE DE DADOS, FINITA OU INFINITA, É DEFINIDA EM ALGUMA PARTE DO CÓDIGO, OU ALGUM MOMENTO DO TEMPO, OU DEPOIS(ASSÍNCRONO), E ATÉ MESMO IMEDIATAMENTE(SÍNCRONO), ELA PODE SER EXECUTADA E SEUS RESULTADOS, ATRAVÉS DE UM FLUXO DE DADOS, NOTIFICA OS INTERESSADOS NESSE FLUXO

  // pessoas É A NOSSA FONTE DE DADOS FINITA, E LOGO DEPOIS ESSES DADOS SÃO PROCESSADOS, PASSANDO SEU RESULTADO ATRAVÉS DE UM FLUXO DE TRANSFORMAÇÃO, ATÉ QUE ELE CHEGUE AO FINAL()

  //TODO PRÍNCIPIOS DA PROGRAMAÇÃO REATIVA
    //? 1) ELASTICIDADE: Reage a à demanda/carga: aplicações podem fazer uso de múltiplos núcleos e múltiplos servidores;
    //* Nosso programa é escalável(horizontalmente); isso significa que  se tivermos muita demanda, é simples de colocarmos uma máquina nova e a carga será dividida em todas as outras intâncias;
    //? 2) RESILIÊNCIA: Reage às falhas. Aplicações reagem e se recuperam de falhas de software, hardware e conectividade;
    //* Programas falham, fato; mas essas falhas não devem ocasionar efeitos colaterais na estrutura do sistema; o sistema não pode parar; ou seja, deve se recuperar das falhas;
    //? 3) ORIENTAÇÃO À EVENTOS: Reage aos eventos(event driven): em vez de compor aplicações por múltiplas threads síncronas, sistemas são compostos de gerenciadores de eventos assíncronos e não bloqueantes;
    //* Nosso sistema deve se comunicar de forma assíncrona, e responder os eventos vindos dele mesmo ou de outro serviço que o compõe (mais haver com arquitetura reativa; ex: microsserviços usam filas, por exemplo)
    //? 4) REPONSIVIDADE: Reage aos usuários: aplicações que oferecem interações ricas e "tempo real com usuários"
    //* O sistema deve reagir às ações do usuário, e não ficar perguntando se algo aconteceu

  maioresAgrupadosPorGenero(){
    const pessoas = [
      {nome: 'João', sexo: 'masculino', idade: 18},
      {nome: 'José', sexo: 'masculino', idade: 32},
      {nome: 'Maria', sexo: 'feminino', idade: 11},
      {nome: 'Julia', sexo: 'feminino', idade: 23}
    ]

    let teste = pessoas.filter(e => e.idade >= 18).reduce((acc: any,value: any) =>
    {
      acc[value.sexo]  = acc[value.sexo] || []
      acc[value.sexo].push(value)
      return acc
    }, {}
    )

    console.log(teste)
  }

  aula01(){
    const pessoas = [
      {nome: 'João', sexo: 'masculino', idade: 18},
      {nome: 'José', sexo: 'masculino', idade: 32},
      {nome: 'Maria', sexo: 'feminino', idade: 11},
      {nome: 'Julia', sexo: 'feminino', idade: 23}
    ]

    const maioresAgrupadosPorGenero = (pessoas: any[]) => pessoas
    .filter(e => e.idade >= 18)
    .reduce((a,b) => (
      {
        ...a,  //extraio o acumulador para o objeto, todas as vezes
        [b.sexo]: [...(a[b.sexo] || []), b] // seto uma nova propriedade
      }),{})

    let pessoasAgrupadas = maioresAgrupadosPorGenero(pessoas)
    console.log(pessoasAgrupadas)

    //* ---- OUTPUT ----
    // {
    //   feminino: [
    //     {nome: 'Julia', sexo: 'feminino', idade: 23}
    //   ],
    //   masculino: [
    //     {nome: 'João', sexo: 'masculino', idade: 18},
    //     {nome: 'José', sexo: 'masculino', idade: 32}
    //   ]
    // }

    let pessoas$ = from(pessoas)

    pessoas$.pipe(
      filter(e => e.idade >= 18), //TODO ----- ATÉ AQUI, SÓMENTE NOSSA LÓGICA ESTÁ DEFINIDA, NINGUÉM ESTA CONSUMINDO-A ATÉ O SUBSCRIBE
      reduce((a: any,b) => (
        {
          ...a,
          [b.sexo]: [...(a[b.sexo] || []), b]
        }
      ),{})
    )
    .subscribe( //TODO ----  O FLUXO SÓ É PROCESSADO QUANDO HOUVER UM SUBSCRIBE(É COMO SE HOUVESSE UMA FILA, E QUANDO ATIVAMOS O SUBSCRIBE A FILA É ESCOADA)

      res => console.log('observable',res),
      error => console.log(error),
      () => {}
    )

    this.maioresAgrupadosPorGenero()
  }

  aula02(){
    //OBSERVABLES E PROMISES SÃO ENCAPSULADORES DE DADOS QUE NOS FORNECEM MÉTODOS PARA TRATÁ-LOS

    //? DIFERENÇAS ENTRE PROMISES E OBSERVABLES:

    //TODO -------- PROMISES
    //* 1 - EMITEM ÚNICO VALOR
    //* 2 - EXECUÇÃO IMEDIATA(EAGER)
    //* 3 - COMPARTILHADAS(MULTICAST)

    //TODO -------- OBSERVABLES
    //* 1 - EMITEM MÚLTIPLOS VALORES
    //* 2 - EXECUÇÃO SOB DEMANDA(LAZY)
    //* 3 - PODEM SER COMPARTILHADAS OU NÃO(MULTICAST OU UNICAST, RESPECTIVAMENTE)


    let promise = new Promise((resolve) => {
      resolve(1)
      resolve(2) //! NÃO ACONTECE NADA AQUI, PQ PROMISE SÓ EMITE UM VALOR
    }).then(num => console.log('Promise',num))

    Observable.create((observer: any) => {
      observer.next(1)
      observer.next(2) //! JÁ AQUI ACONTECE, PQ PODEMOS EMITIR MÚLTIPLOS VALORES NUM OBSERVABLE
    }).subscribe((num: any) => console.log('Observable',num))

    let promise2 = new Promise((resolve) => {
      console.log('Iniciando a promise2')
      resolve(1)
      resolve(2)
    })
    // .then(num => console.log('Promise',num)) //! ESSE BLOCO SERÁ EXECUTADO, POIS A PROMISE TEM EXECUÇÃO IMEDIATA, INDEPENDENTE DO .then

    Observable.create((observer: any) => {
      console.log('Iniciando o observable')
      observer.next(1)
      observer.next(2)
    })
    // .subscribe((num: any) => console.log('Observable',num)) //! JÁ AQUI, ESSE BLOCO NÃO SERÁ EXECUTADO, POIS OBSERVABLES SAO EXECUTADOS APENAS SOB DEMANDA, DEPENDENDO DO .subscribe

    //TODO ----- SE NOS INSCREVERMOS NESSE OBSERVABLE, AÍ SIM ELE SERÁ INICIADO:

    const observer = Observable.create((observer: any) => {
      console.log('Iniciando o observable')
    })

    setTimeout(() => {
      observer.subscribe((num:any) => console.log('Observable', num))
    }, 2000); //! PORTANTO, AQUI, APÓS 2 SEGUNDOS, O OBSERVABLE É ATIVADO

    let promise3 = new Promise((resolve) => {
      console.log('Iniciando a promise3')
      setTimeout(() => {
        resolve(1) //promise3 emite um valor
      }, 3000);
    })

    const observer3 = Observable.create((observer: any) => {
      console.log('Iniciando o observable2')
      setTimeout(() => {
        observer.next(1)
      }, 3000)

    })

    promise3.then((num: any) => console.log('Promise3', num)) // tratamos aqui a emissão do valor de promise3
    observer3.subscribe((num: any) => console.log('Observer3', num) ) // nos inscrevemos para ser notificados de mudanças no observer3

    setTimeout(() => {
      promise3.then((num: any) => console.log('Promise3', num)) // NOVAMENTE tratamos a emissão do valor de promise3
      observer3.subscribe((num: any) => console.log('Observer3', num) ) // nos inscrevemos NOVAMENTE para ser notificados de mudanças no observer3
    }, 2000);

    //! promise3 e observer3 ilustram como promises tem estado compartilhado e observables não. Todos os "then's" são executados após 3 segundos, enquanto que os subscribes são executados cada um no seu tempo.



















  }


}
