/**
 * Created by yangliu on 2017/4/15.
 */
import React, { Component } from 'react';

    export default class TodoItem extends Component {
  render(){
            return <div>{this.props.todo.title}</div>
              }
}