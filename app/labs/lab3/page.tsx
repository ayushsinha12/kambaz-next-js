import Add from "./Add";
import AddingAndRemovingToFromArrays from "./addingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./arrayIndexAndLength";
import ArrowFunctions from "./arrowFunctions";
import BooleanVariables from "./booleanVariables";
import Classes from "./classes";
import ClientComponentDemo from "./ClientComponentDemo";
import ConditionalOutputIfElse from "./conditionalOutputIfElse";
import ConditionalOutputInline from "./conditionalOutputInLine";
import Destructing from "./destructing";
import DestructingImports from "./destructingImports";
import FilterFunction from "./filterFunction";
import FindFunction from "./findFunction";
import FindIndex from "./findIndex";
import ForLoops from "./forLoops";
import FunctionDestructing from "./functionDestructing";
import Highlight from "./highlight";
import House from "./house";
import IfElse from "./ifElse";
import ImpliedReturns from "./impliedReturns";
import JsonStringify from "./JSONStringify";
import LegacyFunctions from "./legacyFunctions";
import MapFunction from "./mapFunction";
import PathParameters from "./pathParameters";
import ServerComponentDemo from "./serverComponentDemo";
import SimpleArrays from "./simpleArrays";
import Spreader from "./spreader"
import Square from "./square";
import Styles from "./styles";
import TemplateLiterals from "./templateLiterals";
import TernaryOperator from "./ternaryOperator";
import TodoItem from "./todos/todoItem";
import VariablesAndConstants
  from "./variablesAndConstants";
import VariableTypes from "./variableTypes";
export default function Lab3() {
    console.log('Hello World!');
    return (
      <div>
        <h2>Lab 3</h2>
        <VariablesAndConstants/>
        <VariableTypes/>
        <BooleanVariables/>
        <IfElse/>
        <TernaryOperator/>
        <ConditionalOutputIfElse/>
        <ConditionalOutputInline/>
        <LegacyFunctions/>
        <ArrowFunctions/>
        <ImpliedReturns/>
        <TemplateLiterals/>
        <SimpleArrays/>
        <ArrayIndexAndLength/>
        <AddingAndRemovingToFromArrays/>
        <ForLoops/>
        <MapFunction/>
        <FindFunction/>
        <FindIndex/>
        <FilterFunction/>
        <JsonStringify/>
        <House/>
        <Spreader/>
        <Destructing/>
        <FunctionDestructing/>
        <DestructingImports/>
        <Classes/>
        <Styles/>
        <ClientComponentDemo/>
        <ServerComponentDemo/>

        <Add a={3} b={4} />

        <h4>Square of 4</h4>
        <Square>4</Square>
        <hr />

        <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
        </Highlight>

        <PathParameters/>

        <TodoItem/>


      </div>
  );}
  