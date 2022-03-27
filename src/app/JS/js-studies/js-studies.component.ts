import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'js-studies',
  templateUrl: './js-studies.component.html',
  styleUrls: ['./js-studies.component.css']
})
export class JSStudiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.aprendendoArrayReduce()
    // this.entendendoPromises()

    let promise = new Promise((res, rej) => {
      res(1)
    })

    promise.then((data) => {
      console.log('Primeiro then')
    })

    setTimeout(() => {
      promise.then((data) => {
        console.log('Primeiro then')
      })
    }, 2000);
  }

  aprendendoArrayReduce(){

    //TODO MDN Mozilla
    const array1 = [1, 2, 3, 4];

    // 0 + 1 + 2 + 3 + 4
    const initialValue = 0;
    const sumWithInitial = array1.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    console.log(sumWithInitial);
    // expected output: 10

    //TODO VÍDEO CANAL DEV SOLTINHO
    //* 1) NÚMEROS
    const numeros = [10,20,30,40,50]

    const total = numeros.reduce((acumulador,item) => {
      console.log('acumulador', acumulador) // retorna, um de cada vez: 10, 30, 60, 100
      console.log('item', item) // retorna, um de cada vez: 20, 30, 40, 50
      return acumulador + item
    })

    console.log(total) // 150
    // O REDUCE PODE PARECER QUE FAZ APENAS REDUÇÕES, MAS NA VERDADE FAZ TRANSFORMAÇÕES.
    // PODEMOS TRANSFORMAR UM ARRAY NUMA STRING, NUM OBJETO OU QUALQUER OUTRA COISA NÓS PODEMOS

    //* 2) STRINGS
    const palavras = ['oi', 'Olaaaar', 'paralelepipedo', 'nao']

    const maiorPalavra = palavras.reduce((maiorPalavra, palavraAtual) => {
      //! O PRIMEIRO PARÂMETRO É O VALOR ANTERIOR (previous, current)
      console.log('maiorPalavra:', maiorPalavra)
      console.log('palavraAtual:', palavraAtual)

      if(palavraAtual.length > maiorPalavra.length) {
        return palavraAtual
      }
      return maiorPalavra
    }, '') // essa string vazia('') quer dizer um valor inicial padrão

    console.log('Maior Palavra ->', maiorPalavra)  // Maior Palavra -> Paralelepipedo

    //! Logo, a rotina é a seguinte:
    //! Primeira iteração: '' e 'oi'
    //! 'oi' > '' ? SIM => RETORNA oi
    //! Segunda iteração: 'oi' e 'Olaaaar'
    //! 'Olaaaar' > 'oi' ? SIM =>  RETORNA Olaaaar
    //! Terceira iteração: 'Olaaaar' e 'paralelepipedo'
    //! 'paralelepipedo' > 'Olaaaar' ? SIM => RETORNA paralelepipedo
    //! Quarta iteração: 'Olaaaar' e 'paralelepipedo'
    //! 'paralelepipedo' > 'nao' ? NAO => RETORNA paralelepipedo

    //* 3) TRANSFORMANDO UM ARRAY NUM OBJETO CUJAS PROPRIEDADES SÃO ARRAYS

    const pokemons = [
      {
        name: 'Pikachu',
        type: 'eletric'
      },
      {
        name: 'Squirtle',
        type: 'water'
      },
      {
        name: 'Magikarp',
        type: 'water'
      }
    ]

    const pokemonsPorTipo = pokemons.reduce((pokemonsPorTipo: any, pokemonAtual:any) => {
      console.log('pokemonPorTipo',pokemonsPorTipo)
      console.log('pokemonAtual',pokemonAtual) //retorna { name: 'Pikachu',type: 'eletric'},{ name: 'Squirtle',type: 'water'}, {name: 'Magikarp',type: 'water'}, um de cada vez.
      console.log('este', pokemonsPorTipo[pokemonAtual.type] || []) //NA PRIMEIRA E NA SEGUNDA ITERAÇÃO, RETORNA undefined, POIS AS PROPRIEDADES ELETRIC E WATER AINDA NÃO EXISTEM. NA TERCEIRA ITERAÇÃO [{name: "Squirtle",type: "water"},{name: "Magikarp",type: "water"}]
      pokemonsPorTipo[pokemonAtual.type] = pokemonsPorTipo[pokemonAtual.type] || [] //! ATENÇÃO: AQUI SE pokemonsPorTipo[pokemonAtual.type] FOR undefined, ATRIBUIREMOS UM ARRAY VAZIO, SE NÃO, PEGAMOS O QUE TEM ANTES!!!
      console.log('aqui',pokemonsPorTipo)
      pokemonsPorTipo[pokemonAtual.type].push(pokemonAtual)

      //! Temos o array de pokemons. Sempre que iteramos,
      //! pegamos o tipo e jogamos dentro do objeto de saída
      //! só que aí, se já adicionamos o tipo água, nós pegamos tudo que já tinha e
      //! colocamos nele. Se não tiver um array com tipo água, nós colocamos um array vazio

      return pokemonsPorTipo
    }, {}) // como queremos um objeto ao final da iteração, setamos ele como objeto inicialmente

    console.log(pokemonsPorTipo)
  }

  entendendoPromises() {
    // Vídeo "Aprenda tudo sobre Promises de JavaScript em 20 minutos"

    //TODO ------ PROMISES

    //? - Promises são como promessas da vida real, ela está esperando algum retorno;
    // "Sempre que criamos uma Promise(por exemplo, esperar a resposta de um servidor externo), e assim que essa resposas for recebida, resolveremos essa promessa(mensagem de sucesso ou erro)"
    // "Portanto, estamos prometendo ao JavaScript que algo vai acontecer, e, a partir desse 'algo', faremos alguma outra lógica"
    //? - Para criar uma promessa, instaciamos a classe Promise;
    //? - Que leva dois argumentos: resolve(solução) e reject(erro);
    //? - Para encadear mais processos utilizamos o método .then();
    //? - Alguns recursos de JS(Fetch API) e bibliotecas retornam Promises.

    //* 1 - CRIAÇÃO DE UMA PROMISE
    const myPromise = new Promise((resolve, reject) => {
      const nome = "Murillo" //iremos supor que esse nome vem de uma requisição externa.

      if(nome === 'Murillo') {
        resolve('Usuário Murillo encontrado')
      } else {
        reject('O usuário Murillo não foi encontrado!')
      }
    })

    // Mas como saber o resultado final(se teve sucesso ou erro) ? Usando o método .then

    myPromise.then((data) => { // Aqui pode ser um parâmetro qualquer.
      console.log(data)
    })

    //* 2 - ENCADEAMENTO DE ".then"

    const myPromise2 = new Promise((resolve, reject) => {
      const nome = "Murillo"

      if(nome === 'Murillo') {
        resolve('Usuário Murillo encontrado')
      } else {
        reject('O usuário Murillo não foi encontrado!')
      }
    })

    // Podemos encadear nossa Promise quantas vezes quisermos, para poder modificar nosso dado da maneira como procisarmos:

    myPromise2.then((data) => {
      return (data as string).toLowerCase() // para encadearmos, a promise anterior deve retornar algo.
    }).then((stringModificada) => {
      console.log(stringModificada)
    })

    //* 3 - RETORNO DO REJECT(USANDO .catch)

    const myPromise3 = new Promise((resolve, reject) => {
      const nome = "Murillo"

      if(nome !== 'Murillo') { //! ATENÇÃO: AQUI O EXEMPLO É DIFERENTE DOS ANTERIORES, FORÇANDO O ERRO.
        resolve('Usuário Murillo encontrado')
      } else {
        reject('O usuário Murillo não foi encontrado!')
      }
    })

    myPromise3.then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log('Aconteceu um erro: ' + error) // Quando usamos o .catch, nosso console não nos retornará uma exception (aquela mensagem vermelha), e sim a mensagem "Aconteceu um erro...". Assim o fluxo do código não é interrompido, e podemos seguí-lo normalmente.
    })


    //* 4 - RESOLVENDO VÁRIAS PROMISES (UTILIZANDO .all)

    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('P1 ok! Timeout')
      }, 2000);
    })
    const p2 = new Promise((resolve, reject) => {
      resolve('P2 ok!')
    })
    const p3 = new Promise((resolve, reject) => {
      resolve('P3 ok!')
    })

    const resolveAll = Promise.all([p1, p2, p3]).then(
      (data) => {
        console.log(data) // Todas respostas virão juntas num array.
                          //! APENAS APÓS 2s ELAS SERÃO RESOLVIDAS
      }
    )

    //* 4 - RESOLVENDO VÁRIAS PROMISES (UTILIZANDO .race)

    const p4 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('P4 ok! Timeout')
      }, 2000);
    })
    const p5 = new Promise((resolve, reject) => {
      resolve('P5 ok!')
    })
    const p6 = new Promise((resolve, reject) => {
      resolve('P6 ok!')
    })

    const resolverRace = Promise.race([p4, p5, p6]).then( //! O MÉTODO .race RETORNA A PROMISE QUE FOR RESOLVIDA PRIMEIRO
      (data) => {
        console.log(data)
      }
    )

    //* FETCH REQUEST NA API DO GITHUB (UTILIZANDO O FETCH API, QUE É UMA API NATIVA DO JAVASCRIPT PARA PODER FAZER REQUISIÇÕES ASSÍNCRONAS, OU SEJA, AJAX)

    const userName = 'murilloluisi'

    fetch(`https://api.ithub.com/users/${userName}`, { //Retorna uma promise
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }).then((response) => {
      console.log(typeof response)
      console.log(response)
      return response.json()
    }).then((data) => {
      console.log(data)
      console.log(`O nome do usuário é: ${data.name}`)
    }).catch((error) => {
      console.log(`Houve algum erro: ${error}`)
    })
  }
}
