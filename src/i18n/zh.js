import pluginType from "packages/data/pluginType";
import plugins from "packages/data/plugins";

export default {
    header: {
        plugins: plugins.data,
        pluginType: pluginType.data,
        InformationPublishingDesigner: "h5ve设计器",
        menuList: [{
            name: "导出",
            icon: "el-icon-download",
            type: "exportVisible"
        }, {
            name: "预览",
            icon: "el-icon-view",
            method: "preview"
        }, {
            name: "保存",
            icon: "el-icon-folder",
            method: "save",
        }, {
            name: "全屏",
            icon: "el-icon-full-screen",
            method: "fullScreen"
        }, {
            name: "退出",
            icon: "el-icon-close",
            method: "close"
        }]
    },
    program: {
        name: "名称："
    },
    setting: {
        controlRulerList: [{
            name: "刻度尺",
            type: "ruler"
        }, {
            name: "辅助线",
            type: "referLine"
        }],
        controlList: [{
            name: "画布",
            type: "screen"
        }, {
            name: "属性",
            type: "attribute"
        }, {
            name: "图层",
            type: "layer"
        }]
    },
    plugin: {
        name: "名称",
        size: "尺寸（px）",
        duration: "时长（秒）",
        transparency: "透明度",
        backgroundColor: "背景颜色",
        backgroundImage: "背景图片",
        chooseImage: "选择图片",
        position: "位置（px）",
        revolve: "旋转",
        roundedCorners: "圆角",
        textContent: "文本内容",
        color: "颜色",
        font: "字体",
        background: "背景",
        fontSize: "字号",
        howManyLines: "多少行后显示省略号",
        normal: "默认",
        italic: "斜体",
        oblique: "倾斜",
        lighter: "极细",
        bold: "粗体",
        yes: "是",
        no: "否",
        layout: "布局",
        left: "靠左",
        center: "居中",
        right: "靠右",
        justify: "两端",
        static: "静止",
        toLeft: "向左运动",
        toRight: "向右运动",
        toTop: "向上运动",
        toBottom: "向下运动",
        cycle: "周期（s）",
        readAloud: "是否朗读",
        buttonPlaceholder: "请输入按钮名称",
        jump: "跳转",
        page: "页面",
        webPage: "网页",
        pagePlaceholder: "请选择页面",
        webPlaceholder: "请输入网址",
        fontSizePlaceholder: "请输入字体大小",
        fontWeight: "字重",
        path: "地址",
        audioPlaceholder: "请输入音频地址",
        choose: "选择",
        config: "配置",
        icon: "图标",
        defaultAudio: "默认播放器",
        autoplay: "自动播放",
        controls: "显示控制器",
        loopPlay: "循环播放",
        chooseVideo: "选择视频",
        mute: "静音",
        volume: "音量",
        list: "列表",
        add: "添加",
        swiper: "轮播",
        second: "秒",
        pathPlaceholder: "请输入地址",
        supportedFormats: "支持格式",
        selectCity: "选择城市",
        weatherCycle: "天气周期",
        everyDay: "每天",
        hour: "小时",
        textTop: "文本上",
        textBottom: "文本下",
        baseline: "文本基线",
        middle: "居中",
        iconAlign: "图标对齐方式",
        iconSize: "图标大小",
        iconPlaceholder: "请选择图标对齐方式",
        format: "日期格式",
        showFormatPlaceholder: "请选择显示格式",
        deadline: "截止时间",
        chooseDate: "选择日期",
        mask: "是否遮罩",
        selectDocument: "选择文档",
        documentCycle: "文档切换周期（秒）",
        animation: "动画",
        auto: "自动",
        loop: "循环",
        carouselDirection: "轮播方向",
        default: "默认",
        card: "卡片模式",
        vertical: "竖向",
        indicatorPosition: "指示器的位置",
        outside: "容器外",
        none: "隐藏",
        templatePlaceholder: "请输入模板名称",
        createTime: "创建时间",
        search: "搜索",
        rest: "重置",
        visibleRange: "可见范围",
        rangePlaceholder: "请选择可见范围",
        private: "私有",
        public: "共享",
        selectTemplate: "选择模板",
        selectFootage: "选择素材",
        app: "第三方应用",
        appPlaceholder: "请输入包名"
    },
    tips: {
        canvas: "提示：按住空格键可拖动画布",
        video: "您的浏览器不支持 video 标签",
        cancel: "取 消",
        confirm: "确 认",
        copy: "复制",
        delete: "删除",
        full: "全屏",
        download: "下载",
        import: "导入",
        export: "导出",
        file: "文件",
        data: "数据",
        upload: "将JSON文件拖到此处，或 ",
        clickUpload: "点击上传"
    }
}
