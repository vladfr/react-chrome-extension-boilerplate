import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import * as AppSettings from '../constants/AppSettings'

import autoBind from 'react-autobind'

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this._initialState = {
            time: AppSettings.POMODORO,
            running: false
        };
        console.log(this.props.timers);
        this.state = this.props.timers[0];
        this._timer = null;
        autoBind(this);
    }

    init() {
        if (this.state.running) {
            if (this._timer) clearInterval(this._timer);
            this._timer = setInterval(this._tick.bind(this), 1000);
        }
    }

    start() {
        if (!this.state.running) {
            chrome.runtime.sendMessage('start', (response) => {
                this.setState({running: true});
                this.init();
            });
        }
    }

    _tick() {
        if (this.state.time <= 0) {
            this.finish();
        }
        else {
            this.setState({time: this.state.time - 1});
        }
    }

    finish() {
        if (this.props.onFinish) {
            this.props.onFinish();
        }
        this.stop();
    }

    stop() {
        clearInterval(this._timer);
        this.setState(this._initialState);
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    format() {
        let seconds = this.state.time;
        let hh = Math.floor(seconds / 3600);
        let mm = Math.floor((seconds - (hh * 3600)) / 60);
        let ss = seconds - (hh * 3600) - (mm * 60);

        if (hh < 10) {hh = '0' + hh}
        if (mm < 10) {mm = '0' + mm}
        if (ss < 10) {ss = '0' + ss}

        let ret = '';
        if (hh > 0) ret+=hh + ':'; else ret+='00:';
        if (mm > 0) ret+=mm + ':';

        return ret + ss;
    };

    render() {
        return(
            <div style={{textAlign: 'center'}}>
                <CircularProgress
                    mode="determinate"
                    value={this.state.time}
                    max={AppSettings.POMODORO}
                    min={0}
                    size={80}
                    thickness={10}
                />
                <p>{this.format()}</p>
                <RaisedButton disabled={this.state.running} label="Start timer" primary={true} onClick={this.start} />
            </div>
        )
    }
}

