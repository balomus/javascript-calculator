const Buttons = (props) => {
    
    const isNum = /[0-9]/;
    const isOperator = /[/X+-]/;
    
    const handleClick = (e) => {
        const buttonValue = e.target.value;

        // console.log(buttonValue + " clicked");
        
        if (buttonValue === "AC")
        {
            props.setOutput("0");
            props.setFormula("0");
            props.setRunningFormula("");
        }

        if (isNum.test(buttonValue))
        {
            if (props.output === "0" || isOperator.test(props.output))
            {
                props.setOutput(buttonValue);
                props.setFormula(buttonValue);
                if (isOperator.test(props.output))
                {
                    props.setRunningFormula(props.runningFormula + props.output);
                }
            }
            else 
            {
                props.setOutput(props.output + buttonValue);
                props.setFormula(props.formula + buttonValue);
            }
        }

        if (buttonValue === "." && !props.output.includes("."))
        {
            if (isOperator.test(props.output))
            {
                props.setOutput("0.");
                props.setFormula("0.")
                props.setRunningFormula(props.runningFormula + props.output);
            }
            else{
                props.setOutput(props.output + buttonValue);
                props.setFormula(props.formula + buttonValue);
            }
        }

        if (isOperator.test(buttonValue))
        {
            if(!isOperator.test(props.output))
            {
                props.setOutput(buttonValue);
                props.setFormula(buttonValue);
                props.setRunningFormula(props.runningFormula + props.output);
            }

            else
            {
                props.setOutput(buttonValue);
                props.setFormula(buttonValue);
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
        // console.log("Index of / is " + formula.indexOf("/"))
        // console.log("Index of * is " + formula.indexOf("X"))
        // console.log("Index of - is " + formula.indexOf("-"))
        // console.log("Index of + is " + formula.indexOf("+"))
        var numbers = formula.split(isOperator);
        var operators = formula.split(isNum);
        var answer;

        operators.shift();
        operators.pop();

        console.log("Numbers are: " + numbers);
        console.log("Numbers length is " + numbers.length)
        
        console.log("Operators are: " + operators);
        console.log("Operator length is " + operators.length)

        for (var i = 0; i < operators.length; i++)
        {
            if (operators[i] == "X")
            {
                console.log("MULTIPLYING")
                numbers.splice(i, 2, multiply(numbers[i], numbers[i + 1]));
                operators.splice(i, 1);

                console.log("Numbers are now: " + numbers);
                console.log("Numbers length is now " + numbers.length)
                
                console.log("Operators are now: " + operators);
                console.log("Operator length is now " + operators.length)

                i--;
            }

            if (operators[i] == "/")
            {
                console.log("DIVIDING")
                numbers.splice(i, 2, divide(numbers[i], numbers[i + 1]));
                operators.splice(i, 1);

                console.log("Numbers are now: " + numbers);
                console.log("Numbers length is now " + numbers.length)
                
                console.log("Operators are now: " + operators);
                console.log("Operator length is now " + operators.length)
            }
        }

        for (var i = 0; i < operators.length; i++)
        {
            if (operators[i] == "+")
            {
                console.log("ADDING")
                numbers.splice(i, 2, add(numbers[i], numbers[i + 1]));
                operators.splice(i, 1);

                console.log("Numbers are now: " + numbers);
                console.log("Numbers length is now " + numbers.length)
                
                console.log("Operators are now: " + operators);
                console.log("Operator length is now " + operators.length)

                i--;
            }

            if (operators[i] == "-")
            {
                console.log("SUBTRACTING")
                numbers.splice(i, 2, subtract(numbers[i], numbers[i + 1]));
                operators.splice(i, 1);

                console.log("Numbers are now: " + numbers);
                console.log("Numbers length is now " + numbers.length)
                
                console.log("Operators are now: " + operators);
                console.log("Operator length is now " + operators.length)
            }
        }

        props.setFormula(props.formula + "=" + numbers[0]);
        props.setOutput(numbers[0]);

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