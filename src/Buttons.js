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
            props.setAnswerSet(false);
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
                if (props.answerSet === true)
                {
                    props.setRunningFormula("");
                    updateOutputAndDisplay(buttonValue);
                    props.setAnswerSet(false);
                }
                else
                {
                    updateOutputAndDisplay(props.output + buttonValue);
                }
            }
        }

        if (buttonValue === ".")
        {
            if (props.answerSet === false)
            {
                if(!props.output.includes("."))
                {
                    if (isOperator.test(props.output))
                    {
                        updateOutputAndDisplay("0.");
                        props.setRunningFormula(props.runningFormula + props.output);
                    }
                    else
                    {
                        updateOutputAndDisplay(props.output + buttonValue);
                    }
                }
            }
            else
            {
                props.setRunningFormula("");
                updateOutputAndDisplay("0.");
                props.setAnswerSet(false);
            }
        }

        if (isOperator.test(buttonValue))
        {
            if (props.answerSet === false)
            {
                if (buttonValue === "-")
                {
                    if (props.output === "0" || props.output === "+")
                    {
                        updateOutputAndDisplay(buttonValue);
                    }
                    else if (isOperator.test(props.output) && props.output !== "-")
                    {
                        if (!props.output.includes("-"))
                        {
                            updateOutputAndDisplay(props.output + buttonValue);
                        }
                    }
                    else
                    {
                        props.setRunningFormula(props.runningFormula + props.output);
                        updateOutputAndDisplay(buttonValue);
                    }
                }
                else
                {
                    if(!isOperator.test(props.output))
                    {
                        props.setRunningFormula(props.runningFormula + props.output);
                        updateOutputAndDisplay(buttonValue);
                    }

                    else
                    {
                        updateOutputAndDisplay(buttonValue);
                    }
                }
            }
            else
            {
                props.setRunningFormula(props.output);
                updateOutputAndDisplay(buttonValue);
                props.setAnswerSet(false);
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

        for (var i = 0; i < numbers.length; i++)
        {
            if (numbers[i] === "")
            {
                numbers[i + 1] = numbers[i + 1] * -1;
            }
        }

        numbers = numbers.filter(n => n);

        // Updated original operators split/filter to accomodate negative numbers
        // var operators = formula.split("").filter(n => n !== ".").filter(n => !isNum.test(n));
        var operators = formula.split(isNum).filter(n => n).filter(n => n !== ".");
        
        // removing extra "-"s from operators list, only impacts formulas where user does a something like 1 * -2 or 1 / -2
        for (var i = 0; i < operators.length; i++)
        {
            if (operators[i].length > 1)
            {
                operators[i] = operators[i][0];
            }
        }

        if (Math.sign(numbers[0]) === -1)
        {
            operators.shift();
        }

        console.log("numbers = " + numbers);
        console.log("operators = " + operators);

        if (isOperator.test(formula.charAt(formula.length - 1)))
        {
            operators.pop();
            console.log("Operators is now " + operators + " and we should have removed the last element.");
        }

        for (var i = 0; i < operators.length; i++)
        {
            console.log("i = " + i + " operators.length = " + operators.length + " operators[" + i + "] is " + operators[i]);
            if (operators[i] === "X")
            {
                getAnswer(numbers, operators, i, multiply);
                i--;
            }

            if (operators[i] === "/")
            {
                getAnswer(numbers, operators, i, divide);
                i--;
            }
        }

        for (var i = 0; i < operators.length; i++)
        {
            if (operators[i] === "+")
            {
                getAnswer(numbers, operators, i, add);
                i--;
            }

            if (operators[i] === "-")
            {
                getAnswer(numbers, operators, i, subtract);
                i--;
            }
        }

        if (isOperator.test(formula.charAt(formula.length - 1)))
        {
            props.setFormula("=" + Math.round(1000000000000 * numbers[0]) / 1000000000000);
        }
        else
        {
            props.setFormula(props.formula + "=" + Math.round(1000000000000 * numbers[0]) / 1000000000000);
        }
        props.setOutput(Math.round(1000000000000 * numbers[0]) / 1000000000000);
        props.setAnswerSet(true);
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