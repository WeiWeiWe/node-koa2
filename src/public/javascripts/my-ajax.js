/**
 * @description 基於 jQuery 封裝 Ajax
 */

(function(window, $) {
    // 方法將暴露到 window.ajax 下
    if (window.ajax != null) {
        console.error('window.ajax 被占用')
        return
    }
    window.ajax = {}

    // get 請求
    window.ajax.get = function (url, callback) {
        ajaxFn('get', url, null, callback)
    }
    // post 請求
    window.ajax.post = function (url, params, callback) {
        if (typeof params === 'function') {
            callback = params
            params = {}
        }
        ajaxFn('post', url, params, callback)
    }
    // patch 請求
    window.ajax.patch = function (url, params, callback) {
        if (typeof params === 'function') {
            callback = params
            params = {}
        }
        ajaxFn('patch', url, params, callback)
    }
    // delete 請求
    window.ajax.delete = function (url, params, callback) {
        if (typeof params === 'function') {
            callback = params
            params = {}
        }
        ajaxFn('delete', url, params, callback)
    }
    // 上傳文件
    window.ajax.upload = function (url, file, callback) {
        var formData = new FormData()
        formData.append('file', file)
        $.ajax({
            type: 'POST',
            url,
            contentType: false,
            processData: false,
            data: formData,
            success: function(res) {
                if (res.errno !== 0) {
                    callback(res.message)
                    return
                }
                callback(null, res.data)
            },
            error: function(error) {
                callback(error.message)
            }
        })
    }

    // 統一的處理
    function ajaxFn(method, url, params, callback) {
        $.ajax({
            type: method.toUpperCase(),
            url,
            contentType: 'application/json;charset=UTF-8',
            data: params ? JSON.stringify(params) : '',
            success: function(res) {
                if (res.errno !== 0) {
                    callback(res.message)
                    return
                }
                callback(null, res.data)
            },
            error: function(error) {
                callback(error.message)
            }
        })
    }
})(window, jQuery)
