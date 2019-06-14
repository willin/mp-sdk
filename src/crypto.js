const crypto = require('crypto');

module.exports = appId => ({
  sessionKey = '',
  encryptedData = '',
  iv = ''
}) => {
  let decoded = {};
  try {
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(sessionKey, 'base64'), Buffer.from(iv, 'base64'));
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    decoded = decipher.update(Buffer.from(encryptedData, 'base64'), 'binary', 'utf8');
    decoded += decipher.final('utf8');

    decoded = JSON.parse(decoded);
  } catch (err) {
    throw new Error('Illegal Buffer');
  }

  if (decoded.watermark.appid !== appId) {
    throw new Error('Illegal Buffer');
  }

  return decoded;
};
