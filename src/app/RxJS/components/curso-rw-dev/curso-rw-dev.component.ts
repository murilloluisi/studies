import { Component, OnInit } from '@angular/core';
import { filter, from, observable, Observable, reduce, share, Subject } from 'rxjs';

@Component({
  selector: 'curso-rw-dev',
  templateUrl: './curso-rw-dev.component.html',
  styleUrls: ['./curso-rw-dev.component.css']
})
export class CursoRwDevComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.aula01()
    // this.aula02()
    // this.aula03()
    this.aula04()
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

  aula01(){ //* PROGRAMAÇÃO REATIVA COM JAVASCRIPT
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

    let maioresAgrupadosPorGenero2 = () => {
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

    maioresAgrupadosPorGenero2()
  }

  aula02(){ //* OBSERVABLES VS. PROMISES
    //OBSERVABLES E PROMISES SÃO ENCAPSULADORES DE DADOS QUE NOS FORNECEM MÉTODOS PARA TRATÁ-LOS

    //? DIFERENÇAS ENTRE PROMISES E OBSERVABLES:

    //TODO -------- PROMISES
    //* 1 - EMITEM ÚNICO VALOR
    //* 2 - EXECUÇÃO IMEDIATA(EAGER)
    //* 3 - COMPARTILHADAS(MULTICAST)
    //* 4 - SEMPRE SÃO ASSÍNCRONAS
    //* 5 - NÃO SÃO CANCELÁVEIS

    //TODO -------- OBSERVABLES
    //* 1 - EMITEM MÚLTIPLOS VALORES
    //* 2 - EXECUÇÃO SOB DEMANDA(LAZY)
    //* 3 - PODEM SER COMPARTILHADAS OU NÃO(MULTICAST OU UNICAST, RESPECTIVAMENTE)
    //* 4 - PODEM SER SÍNCRONOS OU ASSÍNCRONOS
    //* 5 - CANCELÁVEIS

    let promise = new Promise((resolve) => {
      resolve(1)
      resolve(2) //! NÃO ACONTECE NADA AQUI, PQ PROMISE SÓ EMITE UM VALOR
    })
    .then(num => console.log('Promise',num))

    Observable.create((observer: any) => {
      observer.next(1)
      observer.next(2) //! JÁ AQUI ACONTECE, PQ PODEMOS EMITIR MÚLTIPLOS VALORES NUM OBSERVABLE
    })
    .subscribe((num: any) => console.log('Observable',num))

    let promise2 = new Promise((resolve) => {
      console.log('Iniciando a promise2')
      resolve(1)
      resolve(2)
    })
    // .then(num => console.log('Promise',num)) //! ESSE BLOCO SERÁ EXECUTADO, POIS A PROMISE TEM EXECUÇÃO IMEDIATA, INDEPENDENTE DO .then

    Observable.create((observer: any) => {
      // console.log('Iniciando o observable')
      observer.next(1)
      observer.next(2)
    })
    // .subscribe((num: any) => console.log('Observable',num)) //! JÁ AQUI, ESSE BLOCO NÃO SERÁ EXECUTADO, POIS OBSERVABLES SAO EXECUTADOS APENAS SOB DEMANDA, DEPENDENDO DO .subscribe

    //TODO ----- SE NOS INSCREVERMOS NESSE OBSERVABLE, AÍ SIM ELE SERÁ INICIADO:

    const observer = Observable.create((observer: any) => {
      console.log('Iniciando o observable')
    })

    let promise3 = new Promise((resolve) => {
      console.log('Iniciando a promise3')
      setTimeout(() => {
        resolve(1) //promise3 emite um valor
      }, 10000);
    })

    const observer3 = Observable.create((observer: any) => {
      console.log('Iniciando o observable3')
      setTimeout(() => {
        observer.next(1)
      }, 10000)
    })

    promise3.then((num: any) => console.log('Promise3', num)) // tratamos aqui a emissão do valor de promise3
    observer3.subscribe((num: any) => console.log('Observer3', num) ) // nos inscrevemos para ser notificados de mudanças no observer3

    setTimeout(() => {
      promise3.then((num: any) => console.log('Promise 20s depois', num))
      observer3.subscribe((num: any) => console.log('Observer3', num) )

    // }, 20000);
    }, 9000);

    // TODO ------ AQUI SE COLOCARMOS 9s, O BLOCO SERÁ EXECUTADO APENAS AOS 10s. SE COLOCARMOS 20s, QUANDO DER 20s O BLOCO NÃO VAI CONTAR 10s NOVAMENTE!!!

    //! promise3 e observer3 ilustram como promises tem estado compartilhado e observables não. Todos os "then's" são executados após 10 segundos, enquanto que os subscribes são executados cada um no seu tempo(10s + 20s).

    //! RESUMINDO, A PARTIR DO MOMENTO EM QUE EU DECLARO UMA PROMISE, A EXECUÇÃO DELA ACONTECE UMA ÚNICA VEZ E TODO MUNDO QUE SE "INSCREVER" NELA (.then) RECEBE APENAS O VALOR QUE FOI EMITIDO AQUELA ÚNICA VEZ, E ASSIM O BLOCO NÃO SERÁ RE-EXECUTADO. DIFERENTEMENTE DO OBSERVABLE, QUE EXECUTA TODO O BLOCO PARA CADA SUBSCRIÇÃO (OU SEJA, TEM UM COMPORTAMENTO DE ESTADO NÃO COMPARTILHADO)
  }

  aula03(){ //* OBSERVABLES VS. PROMISES - CRONOLOGIA E CANCELAMENTO

    //* CONTINUANDO OBSERVABLES VS. PROMISES
    //! Podemos obter um comportamento de estado compartilhado no nosso observable com o operador share
    let promise4 = new Promise((resolve) => {
      console.log('Iniciando a promise4')
      setTimeout(() => {
        resolve(1) //promise4 emite um valor
      }, 10000);
    })

    const observer4 = Observable.create((observer: any) => {
      console.log('Iniciando o observable4')
      setTimeout(() => {
        observer.next(1)
      }, 10000)
    }).pipe(
      share()  // A partir do momento em que eu aplico esse operador, todos os subscribers são afetados
    )

    promise4.then((num: any) => console.log('Promise4', num)) // tratamos aqui a emissão do valor de promise4
    observer4.subscribe((num: any) => console.log('Observer4', num) ) // nos inscrevemos para ser notificados de mudanças no observer4

    setTimeout(() => {
      promise4.then((num: any) => console.log('Promise 20s depois', num))
      observer4.subscribe((num: any) => console.log('Observer4', num) )

    // }, 20000);
    }, 9000);

    //* EXEMPLOS DE COMPORTAMENTOS ASSÍNCRONOS DE PROMISES E SÍNCRONOS/ASSÍNCRONOS DE OBSERVABLES:

    const promise5 = new Promise((resolve) => {
      resolve(1)
    })

    const observer5 = Observable.create((observer: any) => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.next(4)
      observer.next(5)
      observer.next(6)
      observer.next(7)
      setTimeout(() => { //assíncrono
        observer.next(8)
      }, 1500);
      observer.next(9)


      //! O observable tentará resolver todos valores forma SÍNCRONA, e somente depois que ele resolverá os valores de forma ASSÍNCRONA
    })

    promise5.then(num => console.log('Promise', num))
    console.log('depois da promise')
    observer5.subscribe((num: any) => console.log('Observable', num))
    console.log('depois do observable')

    //! Primeiro, vem a emissão do observable, só depois o da promise. Por quê ? Porque a promise é assíncrona. Já o Observable, COMO JÁ ESTÁ EMITINDO VALORES, estes virão de forma SÍNCRONA
    //! Portanto, se temos valores no observable emitidos imediatamente, eles serão executados de forma síncrona.

    //* EXEMPLO DE CANCELAMENTOS DE OBSERVABLES

    const promise6 = new Promise((resolve) => {
      resolve(1)
    })

    const observer6 = Observable.create((observer: any) => {
      let i = 0
      const interval = setInterval(() => {
        observer.next(i++)
      }, 1000);

      return () => clearInterval(interval) //! SE NÃO DÁ RETURN, O INTERVAL CONTINUA SENDO EXECUTADO, PODENDO GERAR MEMORY LEAK
    })

    promise6.then(num => console.log('Promise6', num))
    const subscriber = observer6.subscribe((num: any) => console.log('Observable6', num))

    setTimeout(() => {
      subscriber.unsubscribe()
    }, 5000);
  }

  aula04(){ //* SUBJECTS E SUBSCRIPTIONS

    //TODO ----- SUBSCRIPTIONS

    // Sempre que fazemos uma inscrição, ela nos retorna um tipo Subscription

    // O método subscribe recebe 3 parâmetros:

    const observer = Observable.create((observer: any) => {
      console.log('Iniciando o observable')
      let i = 1
      const interval = setInterval(() => {
        observer.next(i++)
      }, 1000)

      setTimeout(() => {
        // observer.complete(1) //! faz cair no callback de completado
        observer.error(new Error('error')) //! cai na callback de erro
      }, 3000)

      return () => clearInterval(interval)
    })

    observer.subscribe(
      (num: any) => console.log('Observable', num),
      (err: any) => console.log('Error: ', err),
      () => console.log('Completado')
    )

    //? OBSERVAÇÕES:
    //? 1) Se o observable for finito (observables que acabam), ao serem finalizados executam o callback de completo (o último parâmetro da subscription)
    //? 2) Quando um erro acontece, ele finaliza nosso observable. NÃO CAI NO COMPLETE. A SUBINSCRIÇÃO ACABA E NÃO TEM MAIS VALORES SENDO EMITIDOS.

    //* Outra forma de receber estes três callbacks é através de um objeto literal:

    const subscription = observer.subscribe({
      next: (num: any) => console.log('Observable', num),
      err: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado'),
    })

    setTimeout(() => {
      subscription.unsubscribe()  //! QUANDO REALIZAMOS UMA DESINSCRIÇÃO, AS ÚLTIMAS DUAS CALLBACKS NÃO SÃO EXECUTADAS
    }, 5000);

    // Agora, imaginemos que tenhamos dois observers:

    const observer1 = Observable.create((observer: any) => {
      console.log('Iniciando o observable')
      let i = 1
      const interval = setInterval(() => {
        observer.next(i++)
      }, 1000);

      setTimeout(() => {
        observer.complete
      }, 5000);

      return () => clearInterval(interval)
    })

    const observer2 = Observable.create((observer: any) => {
      console.log('Iniciando o observable')
      let i = 1
      const interval = setInterval(() => {
        observer.next(i++)
      }, 1300);

      setTimeout(() => {
        observer.complete
      }, 5000);

      return () => clearInterval(interval)
    })

    const subscription1 = observer1.subscribe({
      next: (num: any) => console.log('Observable 1', num),
      err: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado'),
    })

    const subscription2 = observer2.subscribe({
      next: (num: any) => console.log('Observable 2', num),
      err: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado'),
    })

    //* Podemos fazer uma cadeia de desinscrições:

    subscription1.add(subscription2)

    //* E, ao nos desinscrevermos dela, automaticamente as que estão encadeadas nela também perdem a inscrição.

    setTimeout(() => {
      subscription1.unsubscribe()
    }, 3000);

    //* Opostamente, temos o método remove, para desencadear uma subscription da cadeia de inscrições:

    subscription1.remove(subscription2)

    // TODO ----- SUBJECTS

    // Subjects são um tipo especial de Observable. Enquanto observables são por padrão UNICASTS, mas podem vir a ser MULTICASTS, OS SUBJECTS SEMPRE SERÃO MULTICASTEDS(SEMPRE TERÃO SEU ESTADO COMPARTILHADO).
    // Um comportamento peculiar dos subjects é que ao mesmo tempo que eles são OBSERVABLES, eles também são OBSERVERS.
    // Paracem muito com EventEmitters

    const subject = new Subject()

    const subscription6 = subject.subscribe({
      next: (num: any) => console.log('Observable 1', num),
      error: (err: any) => console.log(err),
      complete: () => console.log('Completado')
    })

    const subscription7 = subject.subscribe({
      next: (num: any) => console.log('Observable 1', num),
      error: (err: any) => console.log(err),
      complete: () => console.log('Completado')
    })

    subject.next(1)
    subject.next(2)
    subject.next(3)
    subject.next(4)
    subject.error(new Error('Error'))
    subject.complete()

    subscription6.add(subscription7)
    subscription6.remove(subscription7)

    setTimeout(() => {
      subscription7.unsubscribe()
    }, 3000);


    // ? Observação:
    // ? O padrão de objeto de um subject(recebe um next, um error e um complete) casa perfeitamente com o tipo de um objeto que um subscribe pode receber

    // * Portanto:

    const subject2 = new Subject()

    const observable = Observable.create((observer: any) => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.next(4)
      observer.next(5)
    })

    const subscription3 = subject2.subscribe({
      next: (num: any) => console.log('Observable 1', num),
      error: (err: any) => console.log(err),
      complete: () => console.log('Completado')
    })

    const subscription4 = observable.subscribe(subject2) //! MAS POR QUE ESTE CÓDIGO ESTÁ AQUI, E NÃO NA LINHA 422 ? POIS OS SUBJECT EMITEM VALORES INDEPENDENTE DE QUEM ESTÁ OUVINDO(COMPORTAMENTO MULTICAST). INDEPENDENTE DE EXISTIR UM SUBSCRIBER, ELE VAI EMITIR AQUELE VALOR.  A DEMONSTRAÇÃO ESTÁ NA LINHA 438, ABAIXO;

    subscription4.add(subscription3)
    subscription4.remove(subscription3)

    setTimeout(() => {
      subscription4.unsubscribe()
    }, 3000);

    //* Ilustrando o problema mencionado na linha 429:

    const sub = new Subject()

    sub.next(1)
    sub.next(2)
    sub.next(3)
    sub.next(4)

    const subscription5 = sub.subscribe({
      next: (num: any) => console.log('Observable1', num),
      error: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado')
    })

    setTimeout(() => {
      subscription5.unsubscribe()
    }, 3000);

    //! NADA É EMITIDO, POR QUE? PORQUE DA LINHA 442 A LINHA 445 TODOS OS VALORES JA FORAM EMITIDOS, SÓ DEPOIS QUE NOS INSCREVEMOS. PORTANTO, "PERDEMOS" ESSES VALORES
  }
}
