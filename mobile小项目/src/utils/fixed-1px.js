// 让布局视口等比变大
        // 获取meta[name=viewport]'
        const viewport = document.querySelector('meta[name=viewport]')
        // console.log(viewport);
        // 计算要修改的initial-scale的值
        // 2 -> 0.5, 3 -> 0.333
        const scale = 1 / window.devicePixelRatio
        // 修改viewport中initial-scale的值
        viewport.content ='width=device-width, initial-scale='+scale

        // 注意: 当修改完布局视口的宽度之后,盒子整体看起来会变小.最终还要实现跟设计稿相同的效果,就需要让盒子整体变大.方法: 让根标签字体 * 像素比
        let fontSize = document.documentElement.style.fontSize
        fontSize = parseFloat(fontSize)
        fontSize = fontSize * window.devicePixelRatio
        // console.log(fontSize);
        document.documentElement.style.fontSize = fontSize + 'px'