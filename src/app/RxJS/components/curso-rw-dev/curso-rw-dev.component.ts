import { Component, OnInit } from '@angular/core';
import { filter, from, reduce } from 'rxjs';

@Component({
  selector: 'curso-rw-dev',
  templateUrl: './curso-rw-dev.component.html',
  styleUrls: ['./curso-rw-dev.component.css']
})
export class CursoRwDevComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.aula01()
    this.maioresAgrupadosPorGenero()
  }
  //! AULA 01

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
    .subscribe(
      res => console.log('observable',res),
      error => console.log(error),
      () => {}
    )
  }
  //TODO ----  O FLUXO SÓ É PROCESSADO QUANDO HOUVER UM SUBSCRIBE(É COMO SE HOUVESSE UMA FILA, E QUANDO ATIVAMOS O SUBSCRIBE A FILA É ESCOADA)
}
