export default class Timer extends React.Component { 
    render () {
        const date = new Date()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        second = prependZero(second)
        minute = prependZero(minute)
        hour = prependZero(hour)
        return (
            <div className='timer'>
                <h2>
                    {hour}:{minute}:{second}
                </h2>
            </div>
        )
    }
}

function prependZero(time)
{
    return time < 10 ? '0' + time : time
}