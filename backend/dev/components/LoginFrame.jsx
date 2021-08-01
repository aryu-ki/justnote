import Button from './Button.js'
import Form from './Form.js'

export default class LoginFrame extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            formAddClass: 'rollin hidden',
            untouched: false
        }
    } 
    generateFormElements(elems) {
        return elems.map((val) => {
            return <input type={val.type} name={val.name} className={this.props.className + '-' + val.name} required />
        })
    }
    createInput(type, name) {
        return {
            type: type,
            name: name
        }
    }
    toggleFormFold () {
        const hidden = this.state.formAddClass.indexOf('rollin') != -1
        this.setState({
            formAddClass: hidden ? 'rollout' : 'rollin'
        })/* 
        if(!hidden) setTimeout(()=>{
            if (this.state.formAddClass == 'rollin')
            this.setState({
                formAddClass: 'rollin hidden'
            })
        }, 1000) */
    }    
    render () {
        let elems = []
        const usernameInput = this.createInput('text', 'username')
        const passwordInput = this.createInput('password', 'password')
        elems.push(usernameInput, passwordInput)
        elems = this.generateFormElements(elems)
        return (
            <div className={this.props.className}>
                <Button className={this.props.className + '-button'} onClick={()=>{this.toggleFormFold()}}value={this.props.buttonTitle}/>
                <Form className={this.props.className + '-form'} elems={elems} action="login" formClass={this.state.formAddClass}/>
            </div>
        )
    }
}