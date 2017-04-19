/**
 * Created by yangliu on 2017/4/19.
 */
import AV from 'leancloud-storage'

var APP_ID = 'ttfT4FPkoQ5uSAOWVBy6BT9z-gzGzoHsz';
var APP_KEY = 'RR4cpVY1AiF5y2yXKGGbdOKd';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
})
export default AV