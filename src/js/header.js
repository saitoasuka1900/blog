export default function() {
    var isHidden = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    var visibilityChangeEvent = isHidden.replace(/hidden/i, 'visibilitychange')
    var onVisibilityChange = function(){
        if (!document[isHidden]) {
            document.title = 'Saito Asuka!!! ੭ ᐕ)੭*⁾⁾'
        }else{
            document.title = '快回来(｀⌒´メ)超凶'
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange)
}