import Editor from './Editor.js';
import Timer from './Timer.js';
import List from './List.js';
import ListElement from './ListElement.js';
import Message from './Message.js';
import LoginFrame from './LoginFrame.js';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  showMessage(text) {
    let key = new Date().getTime();
    const message = /*#__PURE__*/React.createElement(ListElement, {
      key: key,
      className: this.props.className,
      value: /*#__PURE__*/React.createElement(Message, {
        value: text
      })
    });
    this.setState({
      messages: [message].concat(this.state.messages)
    });
    setTimeout(() => {
      this.setState({
        messages: this.state.messages.filter(val => {
          console.log(key);
          console.log(val.key);

          if (val.key == key) {
            return false;
          }

          return true;
        })
      });
    }, 3250);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      second = second < 10 ? '0' + second : second;
      minute = minute < 10 ? '0' + minute : minute;
      hour = hour < 10 ? '0' + hour : hour;
      this.setState({
        second: second,
        minute: minute,
        hour: hour
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aside-left"
    }, /*#__PURE__*/React.createElement(List, {
      className: "aside-messagebox",
      value: this.state.messages
    })), /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", null, "Just Write A Note.")), /*#__PURE__*/React.createElement(Editor, {
      className: "editor",
      showMessage: text => this.showMessage(text)
    })), /*#__PURE__*/React.createElement("div", {
      className: "aside-right"
    }, /*#__PURE__*/React.createElement(Timer, null), /*#__PURE__*/React.createElement(LoginFrame, {
      buttonTitle: "?",
      className: "auth"
    })));
  }

}