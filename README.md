# mp-sdk

比官方SDK更好用的微信小程序服务器端SDK。

> 已经疯狂得不能用代码行数（总计`89`行，包含空行和debug）来衡量该项目了，代码仅有 `1,310`字节（净化后）。

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/mp-sdk.svg)](https://npmjs.org/package/mp-sdk) [![npm](https://img.shields.io/npm/dm/mp-sdk.svg)](https://npmjs.org/package/mp-sdk) [![npm](https://img.shields.io/npm/dt/mp-sdk.svg)](https://npmjs.org/package/mp-sdk) [![codebeat badge](https://codebeat.co/badges/dcda6ad6-46a4-4178-900a-aaf9ea056321)](https://codebeat.co/projects/github-com-willin-mp-sdk-master)

Minimum, Flexible, Scalable.

支持Lazy Require。

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [安装使用](#%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8)
  - [基本使用示例](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)
  - [二维码处理示例](#%E4%BA%8C%E7%BB%B4%E7%A0%81%E5%A4%84%E7%90%86%E7%A4%BA%E4%BE%8B)
  - [解密示例](#%E8%A7%A3%E5%AF%86%E7%A4%BA%E4%BE%8B)
- [参考文档](#%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3)
- [相关项目推荐](#%E7%9B%B8%E5%85%B3%E9%A1%B9%E7%9B%AE%E6%8E%A8%E8%8D%90)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装使用

```bash
yarn add mp-sdk
# 或
npm i --save mp-sdk
```

### 基本使用示例

```js
const sdk = require('mp-sdk');

const cloud = sdk('appid', 'secret');

// appid、secret、access_token、grant_type 4个字段可以忽略不写
cloud.auth.code2Session({
  js_code: 'js_code'
}).then(result => {
  // code here
});
```

### 二维码处理示例

```js
const sdk = require('mp-sdk');
const fs = require('fs');

const cloud = sdk('appid', 'secret');

cloud.wxacode.getUnlimited({
  scene: 'test',
  path: 'page/index?foo=bar'
}).then((d) => {
  fs.writeFileSync('1.png', d);
});
```

### 解密示例

本SDK中加入解密方法 `.crypto.decryptData`。

传入一个对象，包含以下三个参数：

- sessionKey： 登录会话的凭证
- encryptedData： 密文数据
- iv：初始化向量

以上三个字段均为必须，在微信开发者文档中也有具体的说明。

```js
const sdk = require('mp-sdk');
const cloud = sdk('appid', 'secret');

// 注意： 该方法并不放回 Promise 而是直接返回解密结果。
const result = cloud.crypto.decryptData({
  sessionKey: 'xxx',
  encryptedData: 'xxx',
  iv: 'xxx'
});

console.log(result);
// 可能结果如下： watermark 对象用作校验，具体请参考文档
// {
//   phoneNumber: 'xxxx',
//   purePhoneNumber: 'xxx',
//   countryCode: 'xxxx',
//   watermark: { timestamp: 1560502778, appid: 'wxc0783c8b8bfef8d3' }
// }
```

## 参考文档

- 接口文档： https://developers.weixin.qq.com/miniprogram/dev/api-backend/
- 登录（sessionKey获取）： https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
- 数据加密解密： https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html
- 小程序端授权： https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html

## 相关项目推荐

- 阿里云SDK： https://github.com/willin/waliyun
- 腾讯云SDK： https://github.com/willin/wqcloud
- 网易云音乐SDK： https://github.com/willin/wnm
- Rescuetime SDK： https://github.com/willin/wrescuetime

## License

Apache 2.0

<img width="483" alt="donate" src="https://user-images.githubusercontent.com/1890238/59274374-cd594300-8c8c-11e9-8ee8-fe9be4b49cdb.png">
