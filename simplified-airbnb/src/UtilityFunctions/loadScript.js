export default (scriptUrl) => {
    return new Promise((resolve, reject) =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = scriptUrl
        script.onload = () => {
            console.log('script loaded')
            resolve()
        }
        document.getElementsByTagName('head')[0].appendChild(script)
        //could have used a script tag wanting to try something different
        console.log('Script added')
    })
}