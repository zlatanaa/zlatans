// 定义移动的端适配的代码
function adapter(){
    const fontSize = document.documentElement.clientWidth / 10
    document.documentElement.style.fontSize = fontSize + 'px'
}
adapter()
window.onresize = adapter