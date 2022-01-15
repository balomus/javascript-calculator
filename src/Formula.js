const Formula = (props) => {
    return ( 
        // <div id="formula">RF = {props.runningFormula} F = {props.formula}</div>
        <div id="formula">{props.runningFormula}{props.formula}</div>
     );
}
 
export default Formula;