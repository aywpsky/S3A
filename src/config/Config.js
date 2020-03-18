const config = {
    site_url:'https://s3a.web2.ph/',
    base_url: 'https://s3a.web2.ph/api/index.php/',

    isProduction : function(){
        return true;// set false for development
    },

    AlertConfig : {
        autoReset:true,
        basic:false,
        closable:true,
        closableByDimmer:true,
        frameless:false,
        maintainFocus:true, // <== global default not per instance, applies to all dialogs
        maximizable:true,
        modal:true,
        movable:true,
        moveBounded:false,
        overflow:true,
        padding: true,
        pinnable:true,
        pinned:true,
        preventBodyShift:false, // <== global default not per instance, applies to all dialogs
        resizable:true,
        startMaximized:false,
        transition:'pulse',

        // notifier defaults
        notifier:{
            delay:5,
            position:'top-right',
            closeButton: false
        },
        // language resources
        glossary:{
            title:'AlertifyJS',
            ok: 'OK',
            cancel: 'Cancel'
        },

        // theme settings
        theme:{
            input:'ajs-input',
            ok:'ajs-ok',
            cancel:'ajs-cancel'
        }
    },
}

export default config;
