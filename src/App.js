import React, {Component} from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut} from './leanCloud'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser() ||{},
            newTodo: ' ',
            todoList: []
        }
    }

    render() {
        //过滤掉用户删除的todoList,map循环每个数组，得到有用户输入数据的todo
        let todos = this.state.todoList.filter((item) => !item.deleted).map((item, index) => {
            return (
                <li key={index}>
                    <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)}/>
                </li>
            )
        })

        return (
            <div className="App">
                <h1>{this.state.user.username || '我'}的待办
                    {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
                </h1>
                <div className="inputWrapper">
                    <TodoInput content={this.state.newTodo} onChange={this.changeTitle.bind(this)}
                               onSubmit={this.addTodo.bind(this)}/>
                </div>
                <ol className="todoList">
                    {todos}
                </ol>
                {this.state.user.id ?
                            null :
                            <UserDialog
                               onSignUp={this.onSignUpOrSignIn.bind(this)}
                              onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
            </div>
        )
    }

    signOut(){
            signOut()
            let stateCopy = JSON.parse(JSON.stringify(this.state))
           stateCopy.user = {}
              this.setState(stateCopy)
            }
    onSignUpOrSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
    }
    componentDidUpdate() {
    }

    toggle(e, todo) {
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state)
    }

    changeTitle(event) {
        //把newTodo事先设置的空赋给input，是input清空，需要使用setState来更新渲染
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    addTodo(event) {
        this.state.todoList.push({
            id: idMaker(),
            //获取input的输入值
            title: event.target.value,
            status: null,
            deleted: false
        })
        //操作state更新渲染
        this.setState({
            newTodo: '',
            todoList: this.state.todoList
        })
    }

    //用户点击删除，立即把deleted的状态设为true,并且更新todoList
    delete(event, todo) {
        //把deleted的状态设为true
        todo.deleted = true
        //更新渲染节点
        this.setState(this.state)
    }
}

export default App;

let id = 0

function idMaker() {
    id += 1
    return id
}