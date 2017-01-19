import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Timer from '../components/Timer'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
    state => ({
        todos: state.todos,
        timers: state.timers
    }),
    dispatch => ({
        actions: bindActionCreators(TodoActions, dispatch)
    })
)
export default class App extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    render() {
        const { todos, timers, actions } = this.props;

        return (
            <div className={style.normal}>
                <AppBar
                    title={<span>Timeador</span>}
                    iconElementLeft={<span></span>}/>
                <Paper style={{padding: '20px 0'}}><Timer timers={timers} /></Paper>
                <Header addTodo={actions.addTodo} />
                <MainSection todos={todos} actions={actions} />
            </div>
        );
    }
}
