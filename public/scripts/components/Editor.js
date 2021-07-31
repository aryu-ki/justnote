import TextField from './TextField.js';
import Button from './Button.js';
export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.saveNote.bind(this);
    this.state = {
      note: "",
      code: -1
    };
  }

  async componentDidMount() {
    this.autoSaver = setInterval(() => {
      this.saveNote(true);
    }, 1000 * 60 * 5);
    const response = await fetch('/start_session');
    const json = await response.json();
    this.setState({
      code: json.code
    });
    console.log(json.code);
  }

  async saveNote(auto = false) {
    try {
      let response = await fetch('/save_note', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          note: this.state.note,
          code: this.state.code
        })
      });
      response = await response.json();

      if (auto) {
        this.props.showMessage('Autosaving..');
      } else {
        this.props.showMessage('Saved successfully!');
      }
    } catch (error) {
      if (!auto) alert(`Couldn't reach the server`);
      console.log(error);
    }
  }

  handleChange(e) {
    console.log(this.state.note);
    this.setState({
      note: e.target.value
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.props.className
    }, /*#__PURE__*/React.createElement(TextField, {
      className: this.props.className + '-textbox',
      onChange: e => this.handleChange(e)
    }), /*#__PURE__*/React.createElement(Button, {
      className: this.props.className + '-save',
      onClick: () => this.saveNote(),
      value: "Write."
    }));
  }

}