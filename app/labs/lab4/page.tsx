"use client"
import store from "./store";
import { Provider } from "react-redux";
import Link from "next/link";
import ArrayStateVariable from "./arrayStateVariable";
import BooleanStateVariables from "./booleanStateVariables";
import ClickEvent from "./clickEvent";
import Counter from "./counter";
import DateStateVariable from "./dateStateVariable";
import ObjectStateVariable from "./objectStateVariable";
import ParentStateComponent from "./parentStateComponent";
import PassingDataOnEvent from "./passingDataOnEvent";
import PassingFunctions from "./passingFunctions";
import StringStateVariables from "./stringStateVariables";
import ReduxExamples from "./redux/page";
import CounterRedux from "./redux/counterRedux";
import AddRedux from "./redux/addRedux";
import TodoList from "./redux/todos/todoList";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
      }    
  return (
    <Provider store={store}>
        <div id="wd-lab4">
        <h2>Lab 4</h2>
        <hr />
        <ClickEvent/>
        <PassingDataOnEvent/>
        <PassingFunctions theFunction={sayHello} />
        <Counter/>
        <BooleanStateVariables/>
        <StringStateVariables/>
        <DateStateVariable/>
        <ObjectStateVariable/>
        <ArrayStateVariable/>
        <ParentStateComponent/>
        <ReduxExamples/>
        <CounterRedux/>
        <AddRedux/>
        <TodoList/>
        <Link href="./lab4/react-context">React Context Examples</Link>
        <Link href="./lab4/zustand">Zustand Examples</Link>
        </div>
    </Provider>
  );
}