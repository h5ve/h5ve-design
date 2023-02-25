export default {
    formatStyle(style) {
        const pluginStyle = JSON.parse(JSON.stringify(style));
        const pStyle = ["width", "height", "top", "bottom", "left", "right", "fontSize", "borderRadius"];
        const sStyle = ["animationDuration"];
        const rStyle = ["rotateZ"];
        Object.keys(pluginStyle).forEach(key => {
            if (pStyle.includes(key)) {
                pluginStyle[key] = pluginStyle[key] + "px";
            }
            if (sStyle.includes(key)) {
                pluginStyle[key] = pluginStyle[key] + "s";
            }
            if (rStyle.includes(key)) {
                pluginStyle['transform'] =  `rotateZ(${pluginStyle[key]}deg)`;
            }
        })
        return pluginStyle;
    },
    formatDate(timeStamp, type = 'Y-M-D', auto = false) {
        let time = (timeStamp + '').length === 10 ? new Date(parseInt(timeStamp) * 1000) : new Date(parseInt(timeStamp));
        let _year = time.getFullYear();
        let _month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
        let _date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
        let _hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
        let _minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        let _seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
        let formatTime = '';
        let distinctTime = new Date().getTime() - time.getTime();

        if (auto) {
            if (distinctTime <= (60 * 1000)) {
                // console.log('一分钟以内，以秒数计算');
                let _s = Math.floor((distinctTime / 1000) % 60);
                formatTime = _s + '秒前';
            } else if (distinctTime <= (3600 * 1000)) {
                // console.log('一小时以内,以分钟计算');
                let _m = Math.floor((distinctTime / (60 * 1000)) % 60);
                formatTime = _m + '分钟前';
            } else if (distinctTime <= (24 * 3600 * 1000)) {
                // console.log('一天以内，以小时计算');
                let _h = Math.floor((distinctTime / (60 * 60 * 1000)) % 24);
                formatTime = _h + '小时前';
            } else if (distinctTime <= (30 * 24 * 3600 * 1000)) {
                let _d = Math.floor((distinctTime / (24 * 60 * 60 * 1000)) % 30);
                formatTime = _d + '天前';
                // console.log('30天以内,以天数计算');
            } else {
                // 30天以外只显示年月日
                formatTime = _year + '-' + _month + '-' + _date;
            }
        } else {
            switch (type) {
                case 'Y-M-D H:I:S':
                    formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _seconds;
                    break;
                case 'YMD':
                    formatTime = _year + '' + _month + '' + _date;
                    break;
                case 'YMD HIS':
                    formatTime = _year + '' + _month + '' + _date + '' + _hours + '' + _minutes;
                    break;
                case 'Y-M-D H:I:S zh':
                    formatTime = _year + '年' + _month + '月' + _date + '日  ' + _hours + ':' + _minutes + ':' + _seconds;
                    break;
                case 'Y-M-D H:I':
                    formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes;
                    break;
                case 'M-D H:I':
                    formatTime = _month + '.' + _date + ' ' + _hours + ':' + _minutes;
                    break;
                case 'Y-M-D H':
                    formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours;
                    break;
                case 'Y-M-D':
                    formatTime = _year + '-' + _month + '-' + _date;
                    break;
                case 'Y-M-D zh':
                    formatTime = _year + '年' + _month + '月' + _date + '日';
                    break;
                case 'Y-M':
                    formatTime = _year + '-' + _month;
                    break;
                case 'M-D':
                    formatTime = _month + '-' + _date;
                    break;
                case 'M-D zh':
                    formatTime = _month + '月' + _date + '日';
                    break;
                case 'Y':
                    formatTime = _year;
                    break;
                case 'M':
                    formatTime = _month;
                    break;
                case 'D':
                    formatTime = _date;
                    break;
                case 'H':
                    formatTime = _hours;
                    break;
                case 'I':
                    formatTime = _minutes;
                    break;
                case 'S':
                    formatTime = _seconds;
                    break;
                default:
                    formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _seconds;
                    break;
            }
        }
        // 返回格式化的日期字符串
        return formatTime;
    },

    formatCount(timeStamp, type) {
        let time = (timeStamp + '').length === 10 ? new Date(parseInt(timeStamp) * 1000) : new Date(parseInt(timeStamp));
        let distinctTime = (time.getTime() - new Date().getTime());
        let formatTime = "";
        let day = Math.floor((distinctTime / (24 * 60 * 60 * 1000)) % 30);
        let hour = Math.floor((distinctTime / (60 * 60 * 1000)) % 24);
        let minute = Math.floor((distinctTime / (60 * 1000)) % 60);
        let second = Math.floor((distinctTime / 1000) % 60);
        day = day >= 0 ? day : 0;
        hour = hour >= 0 ? hour : 0;
        minute = minute >= 0 ? minute : 0;
        second = second >= 0 ? second : 0;
        switch (type) {
            case 'D H:I:S':
                formatTime = day + '天' + hour + '时' + minute + '分' + second + '秒';
                break;
            case 'H:I:S':
                formatTime = (hour + (day * 24)) + '时' + minute + '分' + second + '秒';
                break;
            case 'D':
                formatTime = day + '天';
                break;
            case 'H':
                formatTime = (hour + (day * 24)) + '时';
                break;
            case 'I':
                formatTime = ((hour + (day * 24)) * 60) + minute + '分';
                break;
            case 'S':
                formatTime = ((((hour + (day * 24)) * 60) + minute) * 60) + second + '秒';
                break;
            default:
                formatTime = day + '天' + hour + '时' + minute + '分' + second + '秒';
                break;
        }
        return formatTime;
    },

    /**
     * @description 获取随机id
     * @param length
     * @returns {string}
     */
    uuid(length = 32) {
        const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        let str = ''
        for (let i = 0; i < length; i++) {
            str += num.charAt(Math.floor(Math.random() * num.length))
        }
        return str
    }
}
