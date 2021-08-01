export default class List extends React.Component {
    render(){
        return <ul className={this.props.className}>{this.props.value}</ul>
    }
}