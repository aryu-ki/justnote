export default class Button extends React.Component {
    render() {
        return <div className={this.props.className}><button onClick={()=>{this.props.onClick()}}>{this.props.value}</button></div>
    }
}