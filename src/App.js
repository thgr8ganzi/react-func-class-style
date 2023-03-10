import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";

function App() {
    const [funcShow, setFuncShow] = useState(true);
    const [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
        <h1>Hello World</h1>
        <input type="button" value="remove func" onClick={()=>funcShow ? setFuncShow(false) : setFuncShow(true)}/>
        <input type="button" value="remove comp" onClick={()=>setClassShow(false)}/>
        {funcShow && (<FuncComp initNumer={2}/>)}
        {classShow && (<ClassComp initNumer={2}/>)}
    </div>
  );
}
var funcStyle = 'color:white';
var funcId = 0;
function FuncComp(props){
    const [number,setNumber] = useState(props.initNumer);
    const [date, setDate] = useState((new Date()).toString());

    useEffect(()=>{
        console.log('%cfunc => useEffect(componentDidMount)' + (++funcId), funcStyle)
        document.title = date + ' : ' + number
        return () => console.log('%cfunc => useEffectReturn(componentWillUnMount)' + (++funcId), funcStyle)

    }, [])

    useEffect(()=>{
        console.log('%cfunc => useEffect()' + (++funcId), funcStyle)
        document.title = date + ' : ' + number
        // return () => console.log('%cfunc => useEffectReturn()' + (++funcId), funcStyle)

    }, [number])

    console.log('%cfunc => render()' + (++funcId), funcStyle)
    return (
        <div className="container">
            <h2>function style component</h2>
            <p>Number : {number}</p>
            <input type="button" value="random" onClick={()=> setNumber(Math.random())}/>
            <p>Date : {date}</p>
            <input type="button" value="date" onClick={()=> setDate((new Date()).toString())}/>
        </div>
    )
}

var classStyle = 'color:red'
class ClassComp extends React.Component{
    state = {
        number: this.props.initNumer,
        date : (new Date()).toString(),
    }
    componentWillMount() {
        console.log('%cclass => componentWillMount',classStyle)
    }
    componentDidMount() {
        console.log('%cclass => componentDidMount',classStyle)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('%cclass => shouldComponentUpdate',classStyle)
        return true;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('%cclass => componentWillUpdate',classStyle)
    }

    render() {
        console.log('%cclass => render', classStyle)
        return(
            <div className="container">
                <h2>class style component</h2>
                <p>Number : {this.state.number}</p>
                <input type="button" value="random" onClick={()=>this.setState({number:Math.random()})}/>
                <p>Date : {this.state.date}</p>
                <input type="button" value="date" onClick={()=>this.setState({date:(new Date()).toString()})}/>
            </div>
        )
    }
}

export default App;
