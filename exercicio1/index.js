//Calculadora


function Soma (num1, num2) {
    const calculo = num1 + num2;
    return calculo;
};

function Subtrai (num1, num2) {
    const calculo = num1 - num2;
    return num1 - num2;
};

function Multiplica (num1, num2) {
    return num1 * num2;
};

function Divide (num1, num2) {
    return num1 / num2;
};

const MostraResultado = (num1, num2) => {
    console.log(`A Soma entre ${num1} e ${num2} é igual à`, Soma(num1, num2));
    console.log(`A Diferença entre ${num1} e ${num2} é igual à`, Subtrai(num1, num2));
    console.log(`O Produto entre ${num1} e ${num2} é igual à`, Multiplica(num1, num2));
    console.log(`O Quociente entre ${num1} e ${num2} é igual à`, Divide(num1, num2));
};

MostraResultado(12, 2);