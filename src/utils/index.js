import PIN_YIN from "@/utils/pinyin";

/**
 *
 * @param str 判断中英文
 * @returns {boolean} 中文返回true，其他返回false
 */
function isChinese(str) {
    const cnChar = str.match(/[^\x00-\x80]/g) || false;
    return (cnChar && cnChar.length > 0);
}

/**
 *
 * @param str 获取拼音的字符串
 * @param split 拼音分隔符
 * @param uppercase 是否转为大写
 * @returns {string} 结果
 */
function getPinYin(str, split, uppercase) {
    split = split || " ";
    uppercase = uppercase || false;
    const l2 = str.length;
    let result = "";
    let reg = new RegExp('[a-zA-Z0-9\- ]');
    let val;
    let name;
    for (let i = 0; i < l2; i++) {
        val = str.substr(i, 1);
        if (isChinese(val)) {
            name = arraySearch(val);
            if (reg.test(val)) {
                result += split + val;
            } else if (name !== false) {
                result += split + name;
            }
        } else {
            result += val;
        }
    }
    if (uppercase) result = result.toUpperCase();
    result = result.replace(split, "");
    return result.trim();
}

/**
 *
 * @param str 字
 * @returns {*} 结果
 */
function arraySearch(str) {
    for (let name in PIN_YIN) {
        if (PIN_YIN[name].indexOf(str) !== -1) {
            return name;
        }
    }
    return false;
}

/**
 *
 * @param str 获取拼音的字符串
 * @param split 拼音分隔符
 * @param uppercase 是否转为大写
 * @returns {string} 结果
 */
function getPinYinFirstCharacter(str, split, uppercase) {
    split = split || " ";
    uppercase = uppercase || false;
    let len = str.length;
    let result = "";
    let reg = new RegExp('[a-zA-Z0-9\- ]');
    let val;
    let name;
    for (let i = 0; i < len; i++) {
        val = str.substr(i, 1);
        if (isChinese(val)) {
            name = arraySearch(val);
            if (reg.test(val)) {
                result += split + val;
            } else if (name !== false) {
                result += split + name.substring(0, 1);
            }
        } else {
            result += val;
        }
    }
    if (uppercase) result = result.toUpperCase();
    result = result.replace(split, "");
    return result.trim();
}

export default {
    isChinese,
    getPinYin,
    getPinYinFirstCharacter
}
