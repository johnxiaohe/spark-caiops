Spark项目canister管理模块

每个canister均存储一个公钥验签，manage canister私钥签名 保证管理源的权限唯一

接口  getpublickey
通用方法 sign


main canister api
```
```

child canister api
```
```

common canister api
```
get version
install code
status( cycles controller )
childs

```

// 主动拉取需要确认 源身份（签名验证）
// 主动推送需要确认 推送方在系统内

// ops canister must set controller only the owner. 