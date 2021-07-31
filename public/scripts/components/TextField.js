export default class TextField extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.props.className
    }, /*#__PURE__*/React.createElement("textarea", {
      onChange: e => this.props.onChange(e),
      style: {
        resize: 'none'
      },
      readonly: this.props.readonly ? true : false
    }));
  }

}