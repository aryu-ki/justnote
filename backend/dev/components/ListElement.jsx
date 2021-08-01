export default class ListElement extends React.Component {
    render() {
        return <li className={this.props.className}>{this.props.value}</li>
    }
}