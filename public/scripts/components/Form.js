export default class Form extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.props.className
    }, /*#__PURE__*/React.createElement("form", {
      className: this.props.formClass + ' cnw',
      action: "/",
      method: "POST"
    }, this.props.elems, /*#__PURE__*/React.createElement("input", {
      type: "submit",
      name: this.props.className + '-' + this.props.action,
      value: this.props.action
    })));
  }

}