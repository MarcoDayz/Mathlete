//genProblem function generates a problem
export const genProblem = (subject) => {
    let equation = {
        solution: 0,
        problem: ""
    };
    if(subject === "" || subject === undefined){
        return equation;
    }
    const num1 = genRandomNumber();
    const num2 = genRandomNumber();

    if(subject === "+"){
        equation.solution = num1 + num2;
        equation.problem = `${num1} + ${num2}`;
    }else if(subject === "-"){
        if(num2 > num1){
            equation.solution = num2 - num1;
            equation.problem = `${num2} - ${num1}`;
            return equation;
        }
        equation.solution = num1 - num2;
        equation.problem = `${num1} - ${num2}`;
    }else if(subject === "*"){
        equation.solution = num1 * num2;
        equation.problem = `${num1} x ${num2}`;
    }else{
        equation = genRandomProblem();
    }
    return equation;
};

const genRandomNumber = () => {
    return Math.floor(Math.random() * 13);
};

const genRandomProblem = () => {
        const equation = {
        solution: 0,
        problem: ""
    };
    const num1 = genRandomNumber();
    const num2 = genRandomNumber();
    const equationArr = ["+","-","*"]
    const randomEquation = equationArr[Math.floor(Math.random() * 3)];
        if(randomEquation === "+"){
        equation.solution = num1 + num2;
        equation.problem = `${num1} + ${num2}`;
    }else if(randomEquation === "-"){
        if(num2 > num1){
            equation.solution = num2 - num1;
            equation.problem = `${num2} - ${num1}`;
            return equation;
        }
        equation.solution = num1 - num2;
        equation.problem = `${num1} - ${num2}`;
    }else{
        equation.solution = num1 * num2;
        equation.problem = `${num1} x ${num2}`;
    }

    return equation;
}

// console.log(genProblem())
// console.log(genProblem("+"))
// console.log(genProblem("-"))
// console.log(genProblem("*"))
// console.log(genProblem("combo"))
