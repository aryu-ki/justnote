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
    const response = await this.fetchAndParseJSON('/start_session');
    this.setState({
      code: response.code
    });
    console.log(json.code);
  }

  async fetchAndParseJSON(url, params) {
    let response = await fetch(url, params);
    return response.json();
  }

  generatePostParams(body) {
    return {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    };
  }

  async saveNote(auto = false) {
    try {
      const fetchParams = this.generatePostParams({
        note: this.state.note,
        code: this.state.code
      });
      const response = await this.fetchAndParseJSON('/save_note', fetchParams);
      console.log(response);

      if (auto) {
        this.props.showMessage('Autosaving..');
      } else {
        this.props.showMessage('Saved successfully!');
      }
    } catch (error) {
      if (!auto) this.props.showMessage('Connection error..');
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