import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import  * as localStore from './localStore'

class App extends Component {
  constructor(props){
        super(props)
        this.state = {
              newTodo: ' ',
              todoList:localStore.load('todoList')||[]
        }
      }
    render() {
                     //过滤掉用户删除的todoList,map循环每个数组，得到有用户输入数据的todo
                let todos = this.state.todoList.filter((item)=> !item.deleted).map((item,index)=>{
                    return(
                        <li key={index}>
                            <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)}/>
                        </li>
                    )
            })

        return (
            <div className="App">
                <h1>我的待办</h1>
                <div className="inputWrapper">
                      <TodoInput content={this.state.newTodo} onChange={this.changeTitle.bind(this)} onSubmit={this.addTodo.bind(this)}/>
                </div>
                <ol className="todoList">
                  {todos}
                </ol>
            </div>
            )
}
    componentDidUpdate(){
          localStore.save('todoList',this.state.todoList)
    }
    toggle(e, todo){
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
            addTodo(event){
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
            delete(event, todo){
                //把deleted的状态设为true
                todo.deleted = true
                //更新渲染节点
                this.setState(this.state)
            }
}

export default App;

let id = 0

function idMaker(){
    id += 1
    return id
}