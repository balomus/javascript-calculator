const Buttons = (props) => {
    
    const isNum = /[0-9]/;
    const isOperator = /[/X+-]/;
    
    const handleClick = (e) => {
        const buttonValue = e.target.value;

        // console.log(buttonValue + " clicked");
        
        if (buttonValue === "AC")
        {
            updateOutputAndDisplay("0");
            props.setRunningFormula("");
        }

        if (isNum.test(buttonValue))
        {
            if (props.output === "0" || isOperator.test(props.output))
            {
                updateOutputAndDisplay(buttonValue);
                if (isOperator.test(props.output))
                {
                    props.setRunningFormula(props.runningFormula + props.output);
                }
            }
            else 
            {
                updateOutputAndDisplay(props.output + buttonValue);
            }
        }

        if (buttonValue === "." && !props.output.includes("."))
        {
            if (isOperator.test(props.output))
            {
                updateOutputAndDisplay("0.");
                props.setRunningFormula(props.runningFormula + props.output);
            }
            else{
                updateOutputAndDisplay(props.output + buttonValue);
            }
        }

        if (isOperator.test(buttonValue))
        {
            if(!isOperator.test(props.output))
            {
                updateOutputAndDisplay(buttonValue);
                props.setRunningFormula(props.runningFormula + props.output);
            }

            else
            {
                updateOutputAndDisplay(buttonValue);
            }
        }

        if (buttonValue === "=")
        {
            calculate(props.runningFormula + props.formula);
        }
    }

    const calculate = (formula) => 
    {
        console.log(formula);
        var numbers = formula.split(isOperator);
        var operators = formula.split(isNum).filter(n => n);

        for (var i = 0; i < operators.length; i++)
        {
            if (operators[i] == "X")
            {
                getAnswer(numbers, operators, i, multiply);
                i--;
            }

            if (operators[i] == "/")
            {
                getAnswer(numbers, operators, i, divide);
                i--;
            }
        }

        for (var i = 0; i < operators.length; i++)
        {
            if (operators[i] == "+")
            {
                getAnswer(numbers, operators, i, add);
                i--;
            }

            if (operators[i] == "-")
            {
                getAnswer(numbers, operators, i, subtract);
                i--;
            }
        }

        props.setFormula(props.formula + "=" + numbers[0]);
        props.setOutput(numbers[0]);

    }

    const getAnswer = (numbers, operators, i, operatorFunction) => 
    {
        console.log("Numbers: " + numbers + " operators " + operators);
        console.log(operatorFunction.name + " " + numbers[i] + " and " + numbers[i + 1]);

        numbers.splice(i, 2, operatorFunction(numbers[i], numbers[i + 1]));
        operators.splice(i, 1);
    }

    const divide = (num1, num2) => 
    {
        return num1 / num2;
    }
    
    const multiply = (num1, num2) =>
    {
        return num1 * num2;
    }

    const subtract = (num1, num2) =>
    {
        return num1 - num2;
    }

    const add = (num1, num2) =>
    {
        return Number(num1) + Number(num2);
    }

    const updateOutputAndDisplay = (str) =>
    {
        props.setOutput(str);
        props.setFormula(str);
    }

    return ( 
        <div className="wrapper">
            <button id="clear" value="AC" onClick={handleClick}>AC</button>
            <button id="divide" value="/" onClick={handleClick}>/</button>
            <button id="multiply" value="X" onClick={handleClick}>X</button>
            <button id="seven" value="7" onClick={handleClick}>7</button>
            <button id="eight" value="8" onClick={handleClick}>8</button>
            <button id="nine" value="9" onClick={handleClick}>9</button>
            <button id="subtract" value="-" onClick={handleClick}>-</button>
            <button id="four" value="4" onClick={handleClick}>4</button>
            <button id="five" value="5" onClick={handleClick}>5</button>
            <button id="six" value="6" onClick={handleClick}>6</button>
            <button id="add" value="+" onClick={handleClick}>+</button>
            <button id="one" value="1" onClick={handleClick}>1</button>
            <button id="two" value="2" onClick={handleClick}>2</button>
            <button id="three" value="3" onClick={handleClick}>3</button>
            <button id="equals" value="=" onClick={handleClick}>=</button>
            <button id="zero" value="0" onClick={handleClick}>0</button>
            <button id="decimal" value="." onClick={handleClick}>.</button>
        </div>
     );
}
 
export default Buttons;