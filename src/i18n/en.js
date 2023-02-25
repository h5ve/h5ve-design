import pluginType from "packages/data/pluginType";
import plugins from "packages/data/plugins";
export default {
    header: {
        plugins: plugins.en,
        pluginType: pluginType.en,
        InformationPublishingDesigner: "IPD",
        menuList: [{
            name: "Export",
            icon: "el-icon-download",
            type: "exportVisible"
        }, {
            name: "Preview",
            icon: "el-icon-view",
            method: "preview"
        }, {
            name: "Save",
            icon: "el-icon-folder",
            method: "save",
        }, {
            name: "FullScreen",
            icon: "el-icon-full-screen",
            method: "fullScreen"
        }, {
            name: "Close",
            icon: "el-icon-close",
            method: "close"
        }]
    },
    program: {
        name: "Name："
    },
    setting: {
        controlRulerList: [{
            name: "Scale ruler",
            type: "ruler"
        }, {
            name: "Guides",
            type: "referLine"
        }],
        controlList: [{
            name: "Screen",
            type: "screen"
        }, {
            name: "Attribute",
            type: "attribute"
        }, {
            name: "Layer",
            type: "layer"
        }]
    },
    plugin: {
        name: "Name",
        size: "Size（px）",
        duration: "Duration（s）",
        transparency: "Transparency",
        backgroundColor: "Background Color",
        backgroundImage: "Background Image",
        chooseImage: "Choose Image",
        position: "Position（px）",
        revolve: "Revolve",
        roundedCorners: "Rounded Corners",
        textContent: "Text Content",
        color: "Color",
        font: "Font",
        background: "Background",
        fontSize: "Font Size",
        howManyLines: "The ellipsis is displayed after how many lines",
        normal: "Normal",
        italic: "Italic",
        oblique: "Oblique",
        lighter: "Lighter",
        bold: "Bold",
        yes: "Yes",
        no: "No",
        layout: "Layout",
        left: "Left",
        center: "Center",
        right: "Right",
        justify: "Justify",
        static: "Static",
        toLeft: "To Left",
        toRight: "To Right",
        toTop: "To Top",
        toBottom: "To Bottom",
        cycle: "Cycle（s）",
        readAloud: "Read Aloud",
        buttonPlaceholder: "Please enter a button name",
        jump: "Jump",
        page: "Page",
        webPage: "Web page",
        pagePlaceholder: "Please select a page",
        webPlaceholder: "Please enter the URL",
        fontSizePlaceholder: "Please enter a font size",
        fontWeight: "Font weight",
        path: "Path",
        audioPlaceholder: "Please enter an audio address",
        choose: "Choose",
        config: "Config",
        icon: "Icon",
        defaultAudio: "Default player",
        autoplay: "Autoplay",
        controls: "Display controllers",
        loopPlay: "Loop playback",
        chooseVideo: "Choose video",
        mute: "Mute",
        volume: "Volume",
        list: "List",
        add: "Add",
        swiper: "Swiper",
        second: "Second",
        pathPlaceholder: "Please enter an address",
        supportedFormats: "Supported formats",
        selectCity: "Select a city",
        weatherCycle: "Weather cycles",
        everyDay: "Every day",
        hour: "Hour",
        textTop: "Text top",
        textBottom: "Text bottom",
        baseline: "baseline",
        middle: "middle",
        iconAlign: "Icon align",
        iconSize: "Icon size",
        iconPlaceholder: "Please select the icon alignment",
        format: "Date format",
        showFormatPlaceholder: "Please select a display format",
        deadline: "Deadline",
        chooseDate: "Select a date",
        mask: "Whether to mask",
        selectDocument: "Select the document",
        documentCycle: "Document Switching Cycle (seconds)",
        animation: "Animation",
        auto: "Auto",
        loop: "Loop",
        carouselDirection: "Carousel direction",
        default: "Default",
        card: "Card mode",
        vertical: "Vertical",
        indicatorPosition: "Indicator position",
        outside: "outside",
        none: "none",
        templatePlaceholder: "Please enter a template name",
        createTime: "Create Time",
        search: "Search",
        rest: "Rest",
        visibleRange: "Visible range",
        rangePlaceholder: "Please select a visible range",
        private: "Private",
        public: "Public",
        selectTemplate: "Select a template",
        selectFootage: "Select the footage",
        app: "Third-party apps",
        appPlaceholder: "Please enter a package name"
    },
    tips: {
        canvas: "Tip: Press and hold the space to drag the canvas",
        video: "Your browser does not support the video tag",
        cancel: "Cancel",
        confirm: "Confirm",
        copy: "Copy",
        delete: "Delete",
        full: "Full",
        download: "Download",
        import: "Import",
        export: "Export",
        file: "File",
        data: "Data",
        upload: "Drag the JSON file here, or",
        clickUpload: "Click Upload"
    }
}
