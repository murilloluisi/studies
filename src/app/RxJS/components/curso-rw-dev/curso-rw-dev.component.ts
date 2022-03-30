import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncSubject, BehaviorSubject, bindCallback, catchError, debounceTime, defer, delay, distinctUntilChanged, filter, from, fromEvent, generate, interval, map, merge, observable, Observable, of, pluck, range, reduce, ReplaySubject, share, skip, startWith, Subject, subscribeOn, switchMap, take, takeUntil, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'curso-rw-dev',
  templateUrl: './curso-rw-dev.component.html',
  styleUrls: ['./curso-rw-dev.component.css']
})
export class CursoRwDevComponent implements OnInit, AfterViewInit{

  constructor(
  ) { }

  ngOnInit() {
    // this.aula01()
    // this.aula02()
    // this.aula03()
    // this.aula04()
    // this.aula05()
    // this.aula06()
  }

  ngAfterViewInit(){
    // this.aprendendoFromEvent() //TODO ---- APRENDENDO fromEvent DA AULA 06
    // this.dragNDropReativo() //! aula07
    this.autoComplete()
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

    //! NADA É EMITIDO, POR QUE? PORQUE DA LINHA 442 A LINHA 445 TODOS OS VALORES JA FORAM EMITIDOS, SÓ DEPOIS QUE NOS INSCREVEMOS. PORTANTO, "PERDEMOS" ESSES VALORES. O SUBJECT NÃO TÁ NEM AI SE ALGUÉM SE INSCREVEU OU NÃO.
  }

  aula05(){ //* BehaviorSubject, AsyncSubject e ReplaySubject

    //* BEHAVIOR SUBJECT

    // ESTE TIPO DE SUBJECT INICIA COM UM VALOR, E SEMPRE MANTÉM O ÚLTIMO VALOR PRA SER EMITIDO A QUALQUER NOVO SUBSCRIBER.
    // É COMO SE ELE MANTESSE UMA MEMÓRIA DA ÚLTIMA EMISSÃO


    const sub = new BehaviorSubject(0)

    sub.subscribe({
      next: (num: any) => console.log('Observable 1', num), // Printa 0, 1, 2, 3, 4 //! Por que pega os 4 próximos ? Porque ele já está inscrito e consegue pgar os próximos valores, até se desinscrever
      error: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado')
    })

    sub.next(1)
    sub.next(2)
    sub.next(3)
    sub.next(4)

    sub.subscribe({
      next: (num: any) => console.log('Observable 2', num), // PRINTA 4, 5 E 6
      error: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado')
    })

    sub.next(5)
    sub.next(6)

    sub.subscribe({
      next: (num: any) => console.log('Observable 3', num), // PRINTA 6
      error: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado')
    })


    //* REPLAY SUBJECT

    // ARMAZENAM UMA QUANTIDADE DEFINIDA DE VALORES EMITIDOS

    const sub2 = new ReplaySubject(4) // ESTE NÚMERO INDICA A QUANTIDADE DE VALORES EMITIDOS SERÁ PROPAGADO PARA QUEM SE SUBSCREVER. NESSE CASO, O PRÓXIMO QUE SE INSCREVER NESSE SUBJECT VAI PEGAR OS QUATRO ÚLTIMOS VALORES QUE FORAM EMITIDOS

    sub2.next(1)
    sub2.next(2)
    sub2.next(3)
    sub2.next(4)
    sub2.next(5)
    sub2.next(6)

    sub2.subscribe({
      next: (num: any) => console.log('Observable 4', num), // PRINTA 3, 4, 5, 6 //! NO ENTANTO, SE HOUVEREM SUBSCRIÇÕES DEPOIS DELE, SERÃO PRINTADAS TAMBÉM. ENTÃO, NESSE CASO, PRINTARIA 3,4,5,6,7 E 8.
      error: (err: any) => console.log('Error', err),
      complete: () => console.log('Completado')
    })

    sub2.next(7)
    sub2.next(8)

    //? A TÍTULO DE CURIOSIDADE, UM BEHAVIORSUBJECT É O MESMO QUE UM REPLAYSUBJECT(1)

    //! ALÉM DE TUDO ISSO, O REPLAYSUBJECT TEM UMA OUTRA VANTAGEM. ELE PODE RECEBER UM SEGUNDO ARGUMENTO
    //! NO SEU CONSTRUCTOR, INDICANDO INDICANDO O TEMPO(EM MILISSEGUNDOS) MÁXIMO QUE COMEÇARÁ A ARMAZENAR AS EMISSÕES.

    const sub3 = new ReplaySubject(4, 9000)

    sub3.next(1)
    sub3.next(2)
    sub3.next(3)
    sub3.next(4)
    sub3.next(5)

    setTimeout(() => {
      sub3.subscribe({
        next: (num: any) => console.log('Observable 5', num),
        error: (err: any) => console.log('Error', err),
        complete: () => console.log('Completado')
      })
    }, 10000);

    //* ASYNC SUBJECTS

    // O ASYNC SUBJECT SOMENTE REBERÁ A ÚLTIMA EMISSÃO DO SUBJECT, //! E SOMENTE QUANDO O SUBJECT FOR COMPLETADO

    const sub4 = new AsyncSubject()

    sub4.next(1)
    sub4.next(2)
    sub4.next(3)
    sub4.next(4)
    sub4.next(5)

    setTimeout(() => {
      sub4.subscribe({
        next: (num: any) => console.log('Observable 6', num),
        error: (err: any) => console.log('Error', err),
        complete: () => console.log('Completado')
      })
    }, 5000);

    sub4.next(6)
    sub4.next(7)

    sub4.complete()  // VAI PRINTAR 7 E COMPLETADO

    //? O ASYNC SUBJECT TEM UM COMPORTAMENTO SIMILAR AO BEAHVIOR SUBJECT, ARMAZENANDO A ÚLTIMA EMISSÃO.
  }

  aula06(){ //* OPERADORES DE CRIAÇÃO

    // OPERADORES DE CRIAÇÃO SÃO OPERADORES QUE CRIAM OBSERVABLES A PARTIR DE ALGUM DADO OU ALGUM TIPO DE CONJUNTO

    //TODO --- OPERADOR of

    // RECEBE VALORES SEPARADOS POR VÍRGULA (SERÃO OS VALORES FINAIS)

    of(1, true, 'string').subscribe(
      (res: any) => {
        console.log(res) // PRINTA 1, TRUE E 'string', UM DE CADA VEZ
      }
    )

    // SE COLOCARMOS UM ARRAY, ELE SERÁ EMITIDO //! INTEIRO

    of([1,2,3]).subscribe(
      (res: any) => {
        console.log(res) // PRINTA [1,2,3] DE UMA SÓ VEZ
      }
    )

    //TODO --- OPERADOR from

    // DIFERENTEMENTE DO OPERADOR .of, O OPERADOR .from //! RECEBE ESTRUTURAS DE DADOS E, A PARTIR DISSO, TRANSFORMA OS VALORES EM OBSERVABLES.

    from([1,2,3]).subscribe(
      (res: any) => {
        console.log(res) // PRINTA 1, 2, 3 SEPARADAMENTE
      }
    )

    from(Promise.resolve(1)).subscribe( //? Maneira de converter promise em observable.
      (res: any) => {
        console.log(res) // PRINTA 1
      }
    )


    // EXEMPLO COM GENERATORS:

    //! PS: A generator is a function that can stop midway and then continue from where it stopped.
    //! In short, a generator appears to be a function but it behaves like an iterator.

    //! Here are some other common definitions of generators —
    //! Generators are a special class of functions that simplify the task of writing iterators.
    //! A generator is a function that produces a sequence of results instead of a single value, i.e you generate ​a series of values.

    //! {
    //!   value: Any,
    //!   done: true|false
    //! }

    //! The value property will contain the value. The done property is either true or false. When the done becomes true,
    //! the generator stops and won't generate any more values.

    let generator = function* generate() {
      let i = 1
      while(true) {
        yield i++
      }
    }

    from(generator())
      .pipe(
        take(10)
      )
      .subscribe(
        (res: any) => {
          console.log(res)
      }
    )

    // ALÉM DISSO, NO FROM PODEMOS APLICAR OUTRO OBSERVABLE:

    from(of(1,2,3))
      .subscribe(
        (res: any) => {
          console.log(res)
      }
    )


    //TODO --- OPERADOR interval

    // EMISSÃO DE VALORES(NUMÉRICO.....1,2,3,4...n) A PARTIR DE UM CERTO INTERVALO DE TEMPO

    // COM ELE, DEFINIMOS UMA QUANTIDADE DE TEMPO QUE O INTERVALO VAI SER EXECUTADO

    interval(1000)
      .subscribe(
        (num: any) => {
          console.log(num)
        }
      )

    //TODO --- OPERADOR range

    // EMITE VALORES NÚMERICOS TAMBÉM, MAS COM INTERVALO DEFINIDO

    // AO DECLARÁ-LO, INFORMAMOS O VALOR INICIAL E A QUANTIDADE DE EMISSÕES A PARTIR DESSE INTERVALO INICIAL

    range(1000,10)
      .subscribe(
        (num: any) => {
          console.log(num)
        }
      )

    //TODO --- OPERADOR generate

    // SEMELHANTE A UM FOR

    generate(0, condicaoParada => condicaoParada < 10, functionIncremento => functionIncremento + 1) // esse incremento é imutável, não é um functionIncremento++
        .subscribe(
          (num: any) => {
            console.log(num)
          }
        )

    //TODO --- OPERADOR fromEvent

    //? ANOTAÇÕES ESTÃO DENTRO DO MÉTODO aprendendoFromEvent()

    //TODO --- OPERADOR defer

    // ENCAPSULA QUALQUER FUNÇÃO E ELA SERÁ EXECUTADA SOMENTE A PARTIR DO MOMENTO EM QUE EU TENHO UM SUBSCRIBE
    // BOA PARA SE INSCREVER CONDICIONALMENTE EM DIFRENTES OBSERVABLES DEPENDENDO DA CONDIÇÃO

    let teste = (a: any) => defer(() => {
      return a > 10 ? of(1) : of(2)
    })

    teste(11) //! SE FOR < 10 RETORNA 1, SE FOR > 10 RETORNA 2
      .subscribe(
        v => console.log('defer',v)
      )

    //TODO --- OPERADOR bindCallback

    const a = (a: any, cb: any) => {
      cb(a)
    }

    //! A PARTIR DO MOMENTO EM QUE EXECUTAMOS O CALLBACK, O SUBSCRIBE É ATIVADO

    bindCallback(a)(10)
      .subscribe(
        (v: any) => console.log(v) // output: 10
      )









  }

  @ViewChild('card', {static: false}) card: ElementRef

  dragNDropReativo(){ //* CRIANDO UM DRAG'N'DROP REATIVO

    //? ANOTAÇÕES SOBRE EVENTO DE CLICK, MOUSEDOWN E MOUSEUP:

    //? CLICK: EVENTO DISPARADO QUANDO O CLICK E A SOLTURA DO CLICK OCORREM NO MESMO ELEMENTO
    //? MOUSEDOWN: EVENTO DISPARADO NO CLICK, NAO NA SOLTURA
    //? MOUSEUP: EVENTO DISPARADO NA SOLTURA

    //? click fires after both the mousedown and mouseup events have fired, in that order.(DOCUMENTAÇÃO DO MDN)



    const mouseDown$ = fromEvent(this.card?.nativeElement, 'mousedown')
    const mouseUp$ = fromEvent(document, 'mouseup')
    const mouseMove$ = fromEvent(document, 'mousemove')
    const keyUp$ = fromEvent(document, 'keyup')

    //! O FLUXO É O SEGUINTE: QUANDO O MOUSE FOR PRESSIONADO(MOUSEDOWN), SE ELE ESTIVER
    //! PRESSIONADO, CADA EVENTO DE MOVIMENTO QUE OCORRER SERÁ ESCUTADO E REPASSADO PARA
    //! O CARD ATÉ QUE O EVENTO DE MOUSEUP ACONTEÇA

    //! ENQUANTO ESTIVER PRESSIONADO E MOVENDO A DIV ESTÁ MOVENDO. SE SOLTARMOS , ELE PARA DE MOVIMENTAR

    const dragAndDrop$ = mouseDown$.pipe( //TODO --- QUANDO OCORRER UM EVENTO NO MEU MOUSEDOWN
      //! o switchMap é um operador de controle de fluxo(controle de paralelismo ou controle de concorrência). temos também o concatMap, o mergeMap e o exhaustMap.
      //! o switchMap funciona da seguinte forma: cada vez que uma nova emissão acontecer e eu precisar trocar ele por um novo observable, o observable anterior será desinscrito
      //! por que queremos o switchMap aqui ? Por que precisamos pegar o movimento inicial do mouseDown(start). A partir desse evento incial, podemos ouvir(nos inscrever) o evento de mousemove. Assim, usamos o switchMap para evitar que toda vez que tenha um mouseDown$ nos nos inscrevamos nesse evento. O switchmap alternará para o mouseMove$
      // tap(console.log),
      map((event: any) => ({ // map transforma valores
        x: event.clientX,
        y: event.clientY,
        target: { // o target é o próprio card(div.card)
          x: event.target.offsetLeft,
          y: event.target.offsetTop
        }
        //essas informações servem para nós pegarmos o ponto inicial do clique para podermos aplicar as movimentações
      })),
      // tap(console.log),
      switchMap(
        start =>
          merge( // passo aqui dentro a quantidade de observables que eu quero unir
            mouseMove$.pipe(  //TODO --- EU VOU ME INSCREVER NO MOUSEMOVE E VOU FICAR OUVINDO-O ATÉ
            map((event: any) => ({
              x: event.clientX - start.x + start.target.x,
              y: event.clientY - start.y + start.target.y,
            })),
            takeUntil(mouseUp$) // TODO --- QUE TENHA UM MOUSEUP
          ),
          keyUp$.pipe(
            filter((event: any) => event.which === 32), // filtra a barra de espaço
            // A partir disso, quero executar um efeito colateral, NÃO NO MEU SUBSCRIBE, POIS ELE ESTÁ FAZENDO O DRAG'N'DROP
            // Para isso, utilizaremos o operador tap()

            //O tap executa um efeito pegando o valor que foi emitido e RETORNA O PRÓPRIO VALOR, SEM ALTERAR A STREAM.

            tap(tecla => {
              let newNode = this.card.nativeElement.cloneNode(true) // cria uma copia da div
              let parentNode = this.card.nativeElement.parentNode //pega o elemento pai
              parentNode.insertBefore(newNode, this.card.nativeElement) //insere o novo elemento antes do elemento
            })

            // No entanto, nao quero que esse evento chegue ao meu subscribe. Para isso utilizaremos o skip()

          ))

          //! The insertBefore() method of the Node interface inserts a node before a reference node
          //! as a child of a specified parent node.

          //! If the given node already exists in the document, insertBefore() moves it from its
          //! current position to the new position. (That is, it will automatically be removed from
          //! its existing parent before appending it to the specified new parent.)

      )
    )

    dragAndDrop$
      .pipe(
        delay(250) //delay no arrasto

        // Agora, vamos supor que, sempre que eu apertar a barra de espaço, ele deixe uma copia do meu card.
        // Para isso, precisaremos da uma noção de concatenação de streams

        //o que eu quero? Toda vez que meu card estiver em movimento(o drag estiver ativo), sempre que eu aprto a barra de espaço, um card fica para trás
        //! Portanto, dentro do switchMap, precisaremos CONCATENAR OS EVENTOS DE MOUSEMOVE E KEYUP
        //! PARA ISSO, UTILIZAREMOS UM OPERADOR DE CRIAÇÃO CHAMADO merge, QUE UNE DOIS STREAMS





      )
      .subscribe(
        res => {
          this.card.nativeElement.style.top = `${res.y}px`
          this.card.nativeElement.style.left = `${res.x}px`
        }
      )















  }

  @ViewChild('button', {static: false}) button: ElementRef

  aprendendoFromEvent(){
    //TODO --- fromEvent

    // PODEMOS TRANSFORMAR EVENTOS DO JAVASCRIPT EM OBSERVABLES TAMBÉM

    // PARA ISSO, DEVEMOS TER UMA REFERÊNCIA NO HTML PARA ACESSAR ESSE EVENTO. NESSE CASO, USAREMOS UM BOTÃO.

    let button$ = fromEvent(this.button?.nativeElement, 'click')

    button$.subscribe(
      (num: any) => console.log(num) //! EMITE UM POINTER EVENT
    )
  }

  @ViewChild('input', {static: false}) input: ElementRef
  @ViewChild('list', {static: false}) list: ElementRef

  autoComplete(){
    const input$ = fromEvent(this.input.nativeElement, 'input')

    const mostraResultado = (res: any) => {
      this.list.nativeElement.innerHTML = res.map(
        (e: any) => `<li>${e}</li>`
      ).join('')
    }

    const buscaPaisesNaApi = (termo: any) => ajax(`https://restcountries.com/v3.1/name/${termo}`).pipe( //! O AJAX É A FORMA DO RXJS FAZER AS REQUISIÇÕES. É COMO SE FOSSE O FETCH, PORÉM ELE JÁ TEM ALGUMAS PECULIARIDADES, COMO PODER CANCELAR A REQUISIÇÃO DEPENDENDO DO TIPO DE OPERADOR QUE UTILIZARMOS
      // tap(termo => console.log('1',termo)), //OUTPUT: AjaxResponse
      pluck('response'), //pega um objeto e extrai uma propriedade desse objeto //! VEM UM OBJETO DO TIPO AJAXRESPONSE
      // tap(termo => console.log('2',termo)), //OUTPUT: Propriedade response do objeto do tipo AjaxResponse
      map((resposta: any) => resposta.map((e: any) => e.name.common)),
      // tap(termo => console.log('3',termo)), //OUTPUT: Nome dos Países
    )

    input$.pipe(
      debounceTime(300), //!SEMPRE QUE O STREAM FOR EMITIDO, SÓ PEGARÁ A ÚLTIMA EMISSÃO NUM INTERVALO DE 300ms
      pluck('target', 'value'), //! PEGA A PROPRIEDADE VALUE DA PROPRIEDADE TARGET DO EVENTO
      map((e: any) => e.trim()), //! O TRIM APAGA ESPAÇOS EM BRANCO NO INÍCIO E FIM DE STRINGS -- // AFIM DE IGNORAR QUE O USUÁRIO APERTE UM MONTE DE ESPAÇO
      distinctUntilChanged(), //! DISTINGUE ENTRE AS MUDANÇAS QUE TIVERAM ENTRE O VALOR ANTERIOR E O ATUAL(EX: DIGITAMOS BRASIL, APAGAMOS UMA LETRA E DIGITAMOS "L" NOVAMENTE. ELE NAO VAI FAZER A REQUISIÇÃO NOVAMENTE).PODE VARIAR DE ACORDO COM O DEBOUNCE TIME
      switchMap((termo: any) => { //! O AJAX JÁ SE DESINSCREVE QUANDO CANCELAMOS UMA REQUISIÇÃO
        if(!termo || termo.length < 3) return of([]) //! SEMPRE QUE EU QUISER FAZER UMA REQUISIÇÃO(APERTEI A TECLA E FIZ UMA REQUISIÇÃO), SE ELA NÃO TERMINOU AINDA, E EU QUERO FAZER UMA NOVA REQUISIÇÃO,("SE A REQUISIÇÃO FICOU MEIO PRESA LA NO SERVIDOR, ESTA DEMORANDO MUITO PRA RESPONDER, E EU APAGO TUDO E DIGITO UM NOVO PAÍS, ELE VAI MANDAR UMA NOVA REQUISIÇÃO E EU QUERO QUE ELE CANCELE A REQUISIÇÃO ANTERIOR")
        return buscaPaisesNaApi(termo) //se não houver nada no campo ou a string tiver menos que 3 caracteres, retorna uma lista vazia
      }),
      catchError((err, source) => { //! SE EU DIGITO UM VALOR ERRADO, OCORRE UM ERRO NA REQUISIÇÃO, O QUE MATA A STREAM. NÃO QUEREMOS ISSO, PORTANTO TRATAREMOS O ERRO.
        return source.pipe(  //! SOURCE É A FONTE DO STREAM(É O INPUT). DENTRO DO CATCHERROR, PODEMOS FAZER UMA TRATATIVA E RETORNAR UMA NOVA FONTE, OU A MESMA FONTE. DEVEMOS RETORNAR UM STREAM PARA QUE POSSAMOS CONTINUAR O FLUXO
          startWith([]) //! LIMPA QUANDO DA ERRO. SE PASSARMOS O SOURCE PURO, ELE VAI COM OS MESMOS OPERADORES DAS LINHAS ACIMA, E CAIRÁ NO MESMO ERRO.
                        //! O STARTWITH FAZ COM QUE, SEMPRE QUE A INSCRIÇÃO COMEÇAR, ELE EMITA ESSE VALOR
        )
      })
    )
    .subscribe(mostraResultado) //! No final desse stream, receberemos um array de dados(strings, que serão o nome dos países)
  }







}

