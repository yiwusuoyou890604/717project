//同源策略 1.协议相同 2.域名相同 3.端口相同
//基于fetch封装的请求方法,支持get和post
//post请求服务端
let domin
if (process.env == "development") {
	domin = "http://localhost:8081"
}
if (process.env == "production") {
	domin = "http://www.lb717.com"
}
console.log(domin)
let $http = {
	get(url, data) {
		if (Object.prototype.toString.call(data) != "[object Object]") {
			return {
				then(callback) {
					callback('GET请求入参格式不正确,需要传OBJECT');
					return {
						catch(err) {
							err(new Error('入参格式不正确'))
						}
					}
				}
			}
		}
		let queryString = "?";
		for (let i in data) {
			queryString += (i + "=" + data[i] + "&")
		}
		url = encodeURI(url + queryString.slice(0, -1))

		return fetch(domin + url, {
			headers: {
				"Content-Type": "application/json;charset=utf-8"//支持的格式数据
			}
		}).then(res => res.json())
	},
	post(url, data) {
		
		if (Object.prototype.toString.call(data) != "[object Object]") {
			return {
				then(callback) {
					callback('GET请求入参格式不正确,需要传OBJECT');
					return {
						catch(err) {
							err(new Error('入参格式不正确'))
						}
					}
				}
			}
		}

		return fetch(domin + url, {
			body: JSON.stringify(data),//字符串
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			method: "POST"
		}).then(res => res.json('1'))

	},
	jsonp(url,callbackname) {
		return new Promise((resolve, reject) => {
			window[callbackname]=function(data){
				resolve(data)
			}
			let script = document.createElement('script')
			let body = document.body
			script.src = url
			body.appendChild(script)
		})
	}
}
export default $http
