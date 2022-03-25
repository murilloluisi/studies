import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'js-studies',
  templateUrl: './js-studies.component.html',
  styleUrls: ['./js-studies.component.css']
})
export class JSStudiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.aprendendoArrayReduce()
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
}
