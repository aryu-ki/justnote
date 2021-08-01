export default class TextField extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <textarea onChange={(e)=>this.props.onChange(e)} style={{resize: 'none'}} readonly={this.props.readonly? true : false }></textarea>
                </div>
        )
    }
}