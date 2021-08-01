import Button from './Button.js';
import Form from './Form.js';
export default class LoginFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formAddClass: 'rollin hidden',
      untouched: false
    };
  }

  generateFormElements(elems) {
    return elems.map(val => {
      return /*#__PURE__*/React.createElement("input", {
        type: val.type,
        name: val.name,
        placeholder: val.placeholder,
        className: this.props.className + '-' + val.name,
        required: true
      });
    });
  }

  createInput(type, name, placeholder) {
    return {
      type: type,
      name: name,
      placeholder: placeholder
    };
  }

  toggleFormFold() {
    const hidden = this.state.formAddClass.indexOf('rollin') != -1;
    this.setState({
      formAddClass: hidden ? 'rollout' : 'rollin'
    });
    /* 
    if(!hidden) setTimeout(()=>{
      if (this.state.formAddClass == 'rollin')
      this.setState({
          formAddClass: 'rollin hidden'
      })
    }, 1000) */
  }

  render() {
    let elems = [];
    const usernameInput = this.createInput('text', 'username', 'Username');
    const passwordInput = this.createInput('password', 'password', 'Password');
    elems.push(usernameInput, passwordInput);
    elems = this.generateFormElements(elems);
    return /*#__PURE__*/React.createElement("div", {
      className: this.props.className
    }, /*#__PURE__*/React.createElement(Button, {
      className: this.props.className + '-button',
      onClick: () => {
        this.toggleFormFold();
      },
      value: this.props.buttonTitle
    }), /*#__PURE__*/React.createElement(Form, {
      className: this.props.className + '-form',
      elems: elems,
      action: "login",
      formClass: this.state.formAddClass
    }));
  }

}