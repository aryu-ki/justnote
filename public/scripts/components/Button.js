export default class Button extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.props.className
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        this.props.onClick();
      }
    }, this.props.value));
  }

}