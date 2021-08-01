export default class Form extends React.Component {
    render() {
        return (<div className={this.props.className}>
                    <form className={this.props.formClass} action="/" method="POST" >
                        {this.props.elems}
                        <input type="submit" name={this.props.className + '-' + this.props.action} value={this.props.action} />
                    </form>
                </div>)
    }
}