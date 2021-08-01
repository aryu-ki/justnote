import Editor from './Editor.js'
import Timer from './Timer.js'
import List from './List.js'
import ListElement from './ListElement.js'
import Message from './Message.js'
import LoginFrame from './LoginFrame.js'

export default class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            messages: [],
        }
    }

    showMessage(text) {
        let key = new Date().getTime()
        const message = <ListElement key={key} className={this.props.className} value={<Message value={text} />} />
        this.setState({
            messages: [message].concat(this.state.messages)
        })
        setTimeout(()=>{
            this.setState({
                messages: this.state.messages.filter((val) => {
                    console.log(key)
                    console.log(val.key)
                    if(val.key == key) 
                    {
                        return false
                    }
                    return true
                })
            })
        }, 3250)
    }

    componentDidMount() {
        this.timer = setInterval(()=>{
            const date = new Date()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let second = date.getSeconds()
            second = second < 10 ? '0' + second: second
            minute = minute < 10 ? '0' + minute: minute
            hour = hour < 10 ? '0' + hour: hour
            this.setState({
                second: second, minute: minute, hour: hour
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className="wrapper">
                <div className="aside-left">
                    <List className="aside-messagebox" value={this.state.messages} />
                </div>
                <div className="container">
                    <header>
                        <h1>Just Write A Note.</h1>
                    </header>
                    <Editor className="editor" showMessage={(text) => this.showMessage(text)} />
                </div>
                <div className="aside-right">
                    <Timer />
                    <LoginFrame className="auth"/>
                </div>
            </div>
        )
    }
}