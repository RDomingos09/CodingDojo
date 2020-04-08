
// module.exports = function StartController(input) {

//     let Chance = require('chance');

//     let chance = new Chance();

    
//     let model = input;
//     let retorno = [];
//     console.log(input);

//     // let mapa = new Array(input.terreno.altura).fill('.'); //criar as linhas e preencher com zeros
//     //         mapa = mapa.map(linha => new Array(input.terreno.largura).fill('.')); //criar as colunas e preencher com zeros

//     //         for (let i = 0; i < mapa.length; i++){
//     //         let dados = "";
//     //         for (let j = 0; j < mapa[i].length; j++){
//     //             dados += mapa[i][j] + " ";
//     //             mapaN.push(mapa[i][j] + " ");

//     //         }
//     //         input.mapa = mapaN;
//     //         //console.log(dados);
//     //         //console.log('Mapa => ' + input.mapa);
//     //         }

//             //console.log('Dados criado: ' + dados);
//             // console.log('Mapa criado: ' + input.mapa);

//             // input.mapa[0][1] = 'A'

//             // console.log('Mapa Editado: ' + input.mapa);

//             // let mapa = new Array(input.terreno.largura);

//             // matriz = mapa.map(linha => new Array(input.terreno.altura));

//             // let colunas = 10;
//             // let linhas = 10;


//             // console.log('Altura: ' + input.terreno.altura)
//             // console.log('Largura: ' + input.terreno.largura)

//             // console.log('Erro Input: ' + input);
//             // console.log('Erro Model: ' + model.aeroportos);
//             // console.log('Erro Model: ' + model.nuvens);
//             // console.log('Erro Model: ' + model.terreno.altura);
//             // console.log('Erro Model: ' + model.terreno.largura);



//             var matriz = new Array(model.terreno.altura).fill('.');
//             for (var i = 0; i < model.terreno.largura; i++){
//                 matriz[i] = new Array(model.terreno.largura).fill('.');
//             }

//             sortRandomPosition(model, matriz);

//             //console.log('Tamanho da Matriz fora do FOR => ' + matriz.length);


//             for (let i = 0; i < input.terreno.altura; i++){
//                 let dados = "";
//                 //console.log('Tamanho da Matriz dentro do FOR => ' + matriz.length);
//                 for (let j = 0; j < input.terreno.largura; j++){
//                     dados += matriz[i][j] + " ";
//                     //console.log('Tamanho da Matriz dentro do segundo FOR => ' + matriz[i].length);
//                 }
//                 console.log('Dados Matriz editados: ' + dados);
//             }
            

//             // console.log('Array teste 10linhas: ' + testeA);
//             // console.log('Matriz teste 10linhas: ' + matriz);
            
            
//     return retorno;

//     function sortRandomPosition (model, matriz) {
//         //console.log('SortRandom model => ' + model)
//         let range = model.terreno.altura * model.terreno.largura -1
//         let positions = (model.aeroportos + model.nuvens)
//         let countA = model.aeroportos
//         let countN = model.nuvens

//         var numbers = new Array(positions)
//         // for (var i = 0; i < numbers.length; i++) {
//         //     numbers[i] = leftPad(randomIntInc(0, range, positions), 2)
//         // }

//         //numbers = leftPad(randomIntInc(0, range, positions), 2)

//         numbers = randomIntInc(0, range, positions);

//         for(i = 0; i < positions; i++){
//             numbers[i] = leftPad(numbers[i], 2)
//         }
        
//         //console.log('Array de Numeros random: ' + numbers);
        
        
//         setPosition(numbers, matriz, 'A', countA)
//         setPosition(numbers, matriz, '*', countN)

//     };

//     function setPosition(numbers, map, data, positions){

//         // console.log('Array de numeros para setar: ' + numbers)
//         // console.log('Positions em set Position: ' + positions)

        
//         // var x = nteste.charAt(0);
//         // var y = nteste.charAt(1);

//         // console.log('x:' + x);
//         // console.log('y:' + y);
        
//         for (i = 0; i < positions; i++){
//             let position = sliceNumber(numbers[0]);
//             //console.log('Array de posicoes: ' + position);
//             numbers.shift();
//             // console.log('Numero removido => ' + position);
//             // console.log('Array numbers Apos => ' + numbers);
//             // console.log('Position: ' + position);
//             map[position[0]][position[1]] = data;
//         };

//         //console.log('Mapa em SetPosition => ' + mapa);

//     }

//     function randomIntInc(low, high, quantity) {
//         //return Math.floor(Math.random() * (high - low + 1))

//         console.log('Quantity: ' + quantity);

//         return chance.unique(chance.integer, quantity, {min:low, max:high})

//         // var teste = chance.unique(chance.integer, 10, {min: 0, max: 100});
//         //console.log('Random CHANCE =>: ' + teste);
//     }

//     function leftPad(str, length) {
//         str = str == null ? '' : String(str)
//         length = ~~length
//         pad = ''
//         padLength = length - str.length
      
//         while (padLength--) {
//           pad += '0'
//         }
      
//         return pad + str
//     }

//     function sliceNumber(number){
//         //let nteste = 05;

//         //console.log('Numero recebido em slice: ' + number);
//         //console.log('Numero recebido em slice: ' + nteste);       

//         //console.log('stringfy number ' + number);
//         //console.log('stringfy number ' + nteste);
        
//         var x = String(number).charAt(0);
//         var y = String(number).charAt(1);

//         // console.log('x:' + x);
//         // console.log('y:' + y);

//         return [parseInt(x), parseInt(y)]

//         //return 0
//     } 

// };