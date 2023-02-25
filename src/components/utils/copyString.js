function select(element) {
    let selectedText
    if (element.nodeName === 'SELECT') {
        element.focus()
        selectedText = element.value
    } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        const isReadOnly = element.hasAttribute('readonly')
        if (!isReadOnly) {
            element.setAttribute('readonly', '')
        }
        element.select()
        element.setSelectionRange(0, element.value.length)
        if (!isReadOnly) {
            element.removeAttribute('readonly')
        }
        selectedText = element.value
    } else {
        if (element.hasAttribute('contenteditable')) {
            element.focus()
        }
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
        selectedText = selection.toString()
    }
    return selectedText
}

export default function ({text}) {
    return new Promise((resolve, reject) => {
        const container = document.body
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl'
        const fakeElem = document.createElement('textarea')
        fakeElem.style.fontSize = '12pt'
        fakeElem.style.border = '0'
        fakeElem.style.padding = '0'
        fakeElem.style.margin = '0'
        fakeElem.style.position = 'absolute'
        fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'
        const yPosition = window.pageYOffset || document.documentElement.scrollTop
        fakeElem.style.top = `${yPosition}px`
        fakeElem.setAttribute('readonly', '')
        fakeElem.value = text
        container.appendChild(fakeElem)
        select(fakeElem)
        try {
            document.execCommand('copy')
            resolve()
        } catch (err) {
            reject()
        }
    })
}
