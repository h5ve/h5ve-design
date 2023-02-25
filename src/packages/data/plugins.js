export default {
  name: "plugins",
  type: "Array",
  data: [[{
    id: 0,
    classify: "common",
    type: "text",
    icon: "el-icon-collection-tag",
    name: "文本",
    disabled: false,
    attribute: {
      type: "text",
      name: "文本",
      plugin: "textPlugin",
      config: "textConfig",
      style: {
        left: 0,
        top: 0,
        width: 200,
        fontSize: 32,
        fontWeight: "normal",
        fontStyle: "normal",
        overflow: "hidden",
        height: 50,
        lineClamp: 3,
        color: "#2b2b2b",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        readAloud: false,
        text: "文本",
        animation: {
          animationName: "",
          animationDuration: 5
        }
      },
      methods: {}
    }
  }, {
    id: 1,
    classify: "common",
    type: "button",
    icon: "el-icon-mouse",
    name: "按钮",
    disabled: false,
    attribute: {
      type: "button",
      name: "按钮",
      plugin: "buttonPlugin",
      config: "buttonConfig",
      style: {
        left: 110,
        top: 110,
        width: 150,
        height: 50,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#ffffff",
        backgroundColor: "#4092ff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        name: "按钮",
        entrance: "",
        type: "page",
        path: "",
        app: ""
      },
      methods: {}
    }
  }], [{
    id: 2,
    classify: "media",
    icon: "el-icon-service",
    name: "音频",
    type: "audio",
    disabled: false,
    attribute: {
      type: "audio",
      name: "音频",
      plugin: "audioPlugin",
      config: "audioConfig",
      style: {
        left: 110,
        top: 110,
        width: 50,
        height: 50,
        color: "#4092ff",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        autoplay: false,
        controls: false,
        loop: false,
        default: false,
        src: ""
      },
      methods: {}
    }
  }, {
    id: 3,
    classify: "media",
    type: "image",
    icon: "el-icon-picture-outline",
    name: "图片",
    attribute: {
      type: "image",
      name: "Image",
      plugin: "picturePlugin",
      config: "pictureConfig",
      style: {
        left: 10,
        top: 10,
        width: 500,
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        list: [],
        loop: true
      },
      methods: {}
    }
    // attribute: {
    //     type: "image",
    //     name: "图片",
    //     plugin: "picturePlugin",
    //     config: "pictureConfig",
    //     style: {
    //         left: 10,
    //         top: 10,
    //         width: 200,
    //         height: 100,
    //         backgroundColor: "#ffffff",
    //         borderRadius: 0,
    //         opacity: 100,
    //         rotateZ: 0,
    //         transformOrigin: "center"
    //     },
    //     attr: {
    //         id: "",
    //         src: ""
    //     },
    //     methods: {}
    // }
  }, {
    id: 4,
    classify: "media",
    icon: "el-icon-monitor",
    name: "视频",
    type: "video",
    disabled: false,
    attribute: {
      type: "video",
      name: "视频",
      plugin: "videoPlugin",
      config: "videoConfig",
      style: {
        left: 10,
        top: 10,
        width: 500,
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        mute: false,
        volume: 100,
        autoplay: true,
        controls: false,
        loop: true,
        name: "",
        duration: "",
        resolution: "",
        id: "",
        src: ""
      },
      methods: {}
    }
  }], [{
    id: 6,
    classify: "senior",
    icon: "el-icon-alarm-clock",
    name: "日期",
    disabled: false,
    attribute: {
      type: "date",
      name: "日期",
      plugin: "datePlugin",
      config: "dateConfig",
      style: {
        left: 10,
        top: 10,
        width: 200,
        height: 100,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#2b2b2b",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        format: "",
        date: new Date().getTime()
      },
      methods: {}
    }
  }, {
    id: 7,
    classify: "senior",
    icon: "el-icon-timer",
    name: "倒计时",
    disabled: false,
    attribute: {
      type: "date",
      name: "倒计时",
      plugin: "countdownPlugin",
      config: "countdownConfig",
      style: {
        left: 10,
        top: 10,
        width: 200,
        height: 100,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#2b2b2b",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        format: "",
        date: new Date().getTime()
      },
      methods: {}
    }
  }, {
    id: 9,
    classify: "senior",
    icon: "el-icon-tickets",
    name: "网页",
    disabled: false,
    attribute: {
      type: "date",
      name: "网页",
      plugin: "iframePlugin",
      config: "iframeConfig",
      style: {
        pointerEvents: "none",
        left: 10,
        top: 10,
        width: 200,
        height: 100,
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        src: "http://",
      },
      methods: {}
    }
  }]],
  en: [[{
    id: 0,
    classify: "common",
    type: "text",
    icon: "el-icon-collection-tag",
    name: "Text",
    disabled: false,
    attribute: {
      type: "text",
      name: "Text",
      plugin: "textPlugin",
      config: "textConfig",
      style: {
        left: 0,
        top: 0,
        width: 200,
        fontSize: 32,
        fontWeight: "normal",
        fontStyle: "normal",
        overflow: "hidden",
        height: 50,
        lineClamp: 3,
        color: "#2b2b2b",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        readAloud: false,
        text: "文本",
        animation: {
          animationName: "",
          animationDuration: 5
        }
      },
      methods: {}
    }
  }, {
    id: 1,
    classify: "common",
    type: "button",
    icon: "el-icon-mouse",
    name: "Button",
    disabled: false,
    attribute: {
      type: "button",
      name: "Button",
      plugin: "buttonPlugin",
      config: "buttonConfig",
      style: {
        left: 110,
        top: 110,
        width: 150,
        height: 50,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#ffffff",
        backgroundColor: "#4092ff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        name: "按钮",
        entrance: "",
        type: "page",
        path: ""
      },
      methods: {}
    }
  }], [{
    id: 2,
    classify: "media",
    icon: "el-icon-service",
    name: "Audio",
    type: "audio",
    disabled: false,
    attribute: {
      type: "audio",
      name: "Audio",
      plugin: "audioPlugin",
      config: "audioConfig",
      style: {
        left: 110,
        top: 110,
        width: 50,
        height: 50,
        color: "#4092ff",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        autoplay: false,
        controls: false,
        loop: false,
        default: false,
        src: ""
      },
      methods: {}
    }
  }, {
    id: 3,
    classify: "media",
    type: "image",
    icon: "el-icon-picture-outline",
    name: "Image",
    attribute: {
      type: "image",
      name: "Image",
      plugin: "picturePlugin",
      config: "pictureConfig",
      style: {
        left: 10,
        top: 10,
        width: 300,
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        list: [{
          id: 1,
          type: "image",
          src: "",
          duration: 10,
          name: "",
          mute: false
        }],
        loop: true
      },
      methods: {}
    }
    // attribute: {
    //     type: "image",
    //     name: "Image",
    //     plugin: "picturePlugin",
    //     config: "pictureConfig",
    //     style: {
    //         left: 10,
    //         top: 10,
    //         width: 200,
    //         height: 100,
    //         backgroundColor: "#ffffff",
    //         borderRadius: 0,
    //         opacity: 100,
    //         rotateZ: 0,
    //         transformOrigin: "center"
    //     },
    //     attr: {
    //         id: "",
    //         src: ""
    //     },
    //     methods: {}
    // }
  }, {
    id: 4,
    classify: "media",
    icon: "el-icon-monitor",
    name: "Video",
    type: "video",
    disabled: false,
    attribute: {
      type: "video",
      name: "Video",
      plugin: "videoPlugin",
      config: "videoConfig",
      style: {
        left: 10,
        top: 10,
        width: 300,
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        mute: false,
        volume: 100,
        autoplay: true,
        controls: false,
        loop: true,
        name: "",
        duration: "",
        resolution: "",
        id: "",
        src: ""
      },
      methods: {}
    }
  }], [{
    id: 6,
    classify: "senior",
    icon: "el-icon-alarm-clock",
    name: "Date",
    disabled: false,
    attribute: {
      type: "date",
      name: "Date",
      plugin: "datePlugin",
      config: "dateConfig",
      style: {
        left: 10,
        top: 10,
        width: 200,
        height: 100,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#2b2b2b",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        format: "",
        date: new Date().getTime()
      },
      methods: {}
    }
  }, {
    id: 7,
    classify: "senior",
    icon: "el-icon-timer",
    name: "Countdown",
    disabled: false,
    attribute: {
      type: "date",
      name: "Countdown",
      plugin: "countdownPlugin",
      config: "countdownConfig",
      style: {
        left: 10,
        top: 10,
        width: 200,
        height: 100,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#2b2b2b",
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        format: "",
        date: new Date().getTime()
      },
      methods: {}
    }
  }, {
    id: 9,
    classify: "senior",
    icon: "el-icon-tickets",
    name: "Iframe",
    disabled: false,
    attribute: {
      type: "date",
      name: "Iframe",
      plugin: "iframePlugin",
      config: "iframeConfig",
      style: {
        pointerEvents: "none",
        left: 10,
        top: 10,
        width: 200,
        height: 100,
        backgroundColor: "#ffffff",
        borderRadius: 0,
        opacity: 100,
        rotateZ: 0,
        transformOrigin: "center"
      },
      attr: {
        src: "http://",
      },
      methods: {}
    }
  }]]
}
