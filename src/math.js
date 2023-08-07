export const genProblem = () => {
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
};

const genRandomNumber = () => {
    return Math.floor(Math.random() * 13);
};
