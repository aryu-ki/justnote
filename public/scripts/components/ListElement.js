export default class ListElement extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("li", {
      className: this.props.className
    }, this.props.value);
  }

}