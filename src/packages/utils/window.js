export default {
    // 退出全屏
    exitFull() {
        const {exitFullscreen, mozCancelFullScreen, webkitExitFullscreen} = document;
        const exitMethod = exitFullscreen || mozCancelFullScreen || webkitExitFullscreen;
        if (exitMethod) {
            exitMethod.call(document).then(err => err);
        } else if (typeof window.ActiveXObject !== "undefined") {
            const wScript = new ActiveXObject("WScript.Shell");
            if (wScript !== null) {
                wScript.SendKeys("{F11}");
            }
        }
    },

    // 打开全屏
    fullScreen(element = document.documentElement) {
        const {requestFullScreen, webkitRequestFullScreen, mozRequestFullScreen, msRequestFullScreen} = element;
        const requestMethod = requestFullScreen || webkitRequestFullScreen || mozRequestFullScreen || msRequestFullScreen;
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            const wScript = new ActiveXObject("WScript.Shell");
            if (wScript !== null) {
                wScript.SendKeys("{F11}");
            }
        }
    },

    // 缓存Vuex
    cacheVuex(_this) {
        // 在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            _this.$store.replaceState(Object.assign(
                {},
                _this.$store.state,
                JSON.parse(sessionStorage.getItem('store'))
            ))
        }
        // 在页面刷新时将vuex里的信息保存到sessionStorage
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(_this.$store.state));
        })
    },

    // 禁止页面缩放
    forbidZoom() {
        document.addEventListener('keydown', function (event) {
            const keyCodes = [61, 107, 173, 109, 187, 189];
            const {ctrlKey, metaKey, keyCode} = event;
            if ((ctrlKey || metaKey) && keyCodes.includes(keyCode)) {
                event.preventDefault();
            }
        }, false)
        document.addEventListener('mousewheel', function (e) {
            e = e || window.event;
            if ((e.wheelDelta && event.ctrlKey) || e.detail) {
                event.preventDefault();
            }
        }, {
            capture: false,
            passive: false
        })
    }
}