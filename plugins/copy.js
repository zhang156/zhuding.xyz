var text = ['',
            '著作权归作者所有。',
            '商业转载请联系作者获得授权,非商业转载请注明出处',
            '作者：zhuding',
            '链接：' + location.href,
            '来源：zhuding.xyz'].join('\n')

document.addEventListener('copy', e => {
    if (window.getSelection()) {
        var content = window.getSelection().toString()
        e.clipboardData.setData('text/plain', content + text)
        e.preventDefault()
    }
})