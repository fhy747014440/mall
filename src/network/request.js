import axios from 'axios'
export function request(config) {
    //创建axios实例
    const instance=axios.create({
         //baseURL:'http://localhost:8081',
        baseURL:'http://123.207.32.32:8000/api/v1',
        timeout:5000

    });
    //2 拦截器
    instance.interceptors.request.use(config=>{
        //1比如config中的一些信息不符合服务器的请求
        //2 比如每次发送网络请求时 都希望在界面中显示一个请求图标
        //3 某些网络请求(如登录(token)) 必须携带一些特殊信息
        //config为参数
        //console.log(config);
        return config
    },err=>{
        console.log(err);
    });
    //响应拦截 如不存在地址404等
    instance.interceptors.response.use(res=>{
        return res
    },err=>{
        console.log(err);
    });

    //3发送真正请求
    return instance(config)
}
