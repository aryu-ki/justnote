export default class Timer extends React.Component {
  render() {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    second = prependZero(second);
    minute = prependZero(minute);
    hour = prependZero(hour);
    return /*#__PURE__*/React.createElement("div", {
      className: "timer"
    }, /*#__PURE__*/React.createElement("h2", null, hour, ":", minute, ":", second));
  }

}

function prependZero(time) {
  return time < 10 ? '0' + time : time;
}