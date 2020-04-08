'use strict';

const sortRandomPosition = require('../../utils/math');

module.exports = function (router) {

    router.get('/', function (req, res) {
        
        let aeroportos = parseInt(req.query.aeroportos);
        let nuvens = parseInt(req.query.nuvens);
        let linhas = parseInt(req.query.linhas);
        let colunas = parseInt(req.query.colunas);

        let countDays = 1;

        let dayFirst = 0;
        let dayAll = 0;

        let findFirst = true;
        let findAll = true;

        let matriz = new Array(linhas).fill('.');
            for (var i = 0; i < colunas; i++){
                matriz[i] = new Array(colunas).fill('.');
            }

        let simulacao = [];

        const quantity = aeroportos + nuvens;

        let numbers = new Array(quantity)
        numbers = sortRandomPosition(quantity, linhas, colunas, numbers);

        //Mock Corners
        // numbers = [
        //     {x:1, y:3},
        //     {x:9, y:0},
        //     {x:1, y:1},
        //     {x:0, y:0},
        //     {x:4, y:8},
        //     {x:0, y:3},
        //     {x:9, y:9}
        // ]

        matriz = setPosition(numbers, matriz, 'A', aeroportos)
        matriz = setPosition(numbers, matriz, '*', nuvens)


        function setPosition(numbers, map, data, quantity){

            for (let i = 0; i < quantity; i++){
                map[numbers[0].x][numbers[0].y] = data;
                numbers.shift();
            }

            return map;
        }

        while(findAll){
            for(let i = 0; i < linhas; i++){
                for(let j = 0; j < colunas; j++){
                    if(matriz[i][j] === '*'){
                        countDays++;
                        simulacao = propagation(matriz, linhas, colunas);
                        checkMap(matriz, simulacao);
                        matriz = simulacao;
                    }
                }
            }
        }

        res.json({aeroportos, nuvens, linhas, colunas, matriz, dayFirst, dayAll});

        function propagation(matriz, linhas, colunas){

            simulacao = [];
            simulacao = duplicateArray(matriz, linhas, colunas);

            //Procurar nuvens nas extremidades do array
            if(matriz[0][0] === '*'|| matriz[0][colunas-1] === '*'|| matriz[linhas-1][0] === '*'|| matriz[linhas-1][colunas-1] === '*'){ 

                simulacao = cornerPropagation(matriz, simulacao, linhas, colunas)
            }

            //Procurar nuvens nas linha superior do array
            for(let i = 1; i < colunas -1; i++){
                if(matriz[0][i] === '*'){ 
                    simulacao = lineUpPropagation(simulacao, i)
                }
            }
            
            //Procurar nuvens na linha inferior do array
            for(let i = 1; i < colunas -1; i++){
                const x = linhas -1;

                if(matriz[x][i] === '*'){ 
                    simulacao = lineDownPropagation(simulacao, x, i)
                }
            }

            //Procurar nuvens na coluna direita do array
            for(let i = 1; i < linhas -1; i++){
                const x = i ;
                const y = colunas -1 ;

                if(matriz[i][y] === '*'){ 
                    simulacao = columnRightPropagation(simulacao, x, y)
                }
            }

            //Procurar nuvens na coluna esquerda do array
            for(let i = 1; i < linhas -1; i++){
                const x = i ;
                const y = 0;

                if(matriz[i][y] === '*'){ 
                    simulacao = columnLeftPropagation(simulacao, x, y)
                }
            }

            //Procurar nuvens no centro do array
            for(let i = 1; i < linhas -1; i++){
                for( let j = 1; j < colunas -1; j++){
                    if(matriz[i][j] === '*'){ 
                        simulacao = fullPropagation(matriz, simulacao, i, j)
                    }
                }
            }

            return simulacao;
        }

        function fullPropagation(matriz, simulacao, x, y){
                if (matriz[x][y] === '*'){
                    simulacao[x][y-1] = '*' 
                    simulacao[x][y+1] = '*' 
                    simulacao[x-1][y] = '*' 
                    simulacao[x+1][y] = '*' 
                }
            return simulacao;
        }

        function cornerPropagation(matriz, simulacao, linhas, colunas){
 
           
            if (matriz[0][0] === '*'){
                simulacao[0][1] = '*'
                simulacao[1][0] = '*'
            }
            if(matriz[0][colunas -1] === '*'){
                simulacao[0][colunas -2] = '*'
                simulacao[1][colunas -1] = '*'
            }
            if(matriz[linhas -1][0] === '*'){
                simulacao[linhas -1][1] = '*'
                simulacao[linhas -2][0] = '*'
            }
            if(matriz[linhas -1][colunas -1] === '*'){
                simulacao[linhas -1][colunas -2] = '*'
                simulacao[linhas -2][colunas -1] = '*'
            }

            return simulacao;
        
        }

        function lineUpPropagation(simulacao, index){
            const x = 0;
            const y = index;
    
            simulacao = sidesPropagation(simulacao, x, y);
            simulacao = downPropagation(simulacao, x, y);

            return simulacao;
        }

        function lineDownPropagation(simulacao, x, y){
            simulacao = sidesPropagation(simulacao, x, y);
            simulacao = upPropagation(simulacao, x, y);

            return simulacao;
        }

        function columnRightPropagation(simulacao, x, y){
            simulacao = upDownPropagation(simulacao, x, y);
            simulacao = leftPropagation(simulacao, x, y);

            return simulacao;
        }

        function columnLeftPropagation(simulacao, x, y){
            simulacao = upDownPropagation(simulacao, x, y);
            simulacao = rightPropagation(simulacao, x, y);

            return simulacao;
        }

        function sidesPropagation(simulacao, x, y){
            simulacao[x][y + 1] = '*'
            simulacao[x][y - 1] = '*'

            return simulacao;
        }

        function upDownPropagation(simulacao, x, y){
            simulacao[x + 1][y] = '*'
            simulacao[x - 1][y] = '*'

            return simulacao;
        }

        function upPropagation(simulacao, x, y){
            simulacao[x-1][y] = '*'

            return simulacao;
        }

        function downPropagation(simulacao, x, y){
            simulacao[x+1][y] = '*'

            return simulacao;
        }

        function leftPropagation(simulacao, x, y){
            simulacao[x][y-1] = '*'

            return simulacao;
        }

        function rightPropagation(simulacao, x, y){
            simulacao[x][y+1] = '*'

            return simulacao;
        }

        function checkMap(matriz, nmatriz){

            for (let i =0; i < linhas -1; i++){
                for(let j = 0; j < colunas -1; j++){
                    if(matriz[i][j] === 'A' && nmatriz[i][j] === '*' && findFirst){
                        dayFirst = countDays;
                        findFirst = false;
                    }
                    if(nmatriz[i][j] === '*' && findAll && !findFirst){
                        let lastA = matriz.find(filterAirports);
                        if(lastA == undefined){
                            dayAll = countDays;
                            findAll = false;
                        }
                    }
                }
            }
        }

        function filterAirports(obj){

            if(obj.find(element => element === 'A')){giy 
                return true;
            }
        }

    });

    function duplicateArray(matriz, linhas, colunas){
        let nmatriz = new Array(linhas);
        for (let i = 0; i < colunas; i++){
            nmatriz[i] = new Array(colunas)
        }

        for(let i = 0; i < linhas; i++){
            for(let j = 0; j < colunas; j++){
                nmatriz[i][j] = matriz[i][j]
            }
        }

        return nmatriz;

    }
};
