1. 用户登录接口

a. 在wx.login中发送res.code到 https://www.chengfpl.com/weili/user/login (GET 方法)

会收到用户的openId与session_key的json文件，需要客户端保存openId

b. wx.getUserInfo中获取了用户nickname和avatar后发送

{
openId ：---,
nickname : ---,
avatar : ---,
}

到https://www.chengfpl.com/weili/user/add (POST 方法)

返回的信息为User类

在用户实现登录以后, 应该要存储用户openId信息


2. 用户创建活动说明

创建活动时发送到https://www.chengfpl.com/weili/user/create/activity (POST 方法)

数据格式如下

{
openId : ---,
name : ---, //这是活动名
description : ---, 
location : ---, 
timeType : ---,
startTime : ---,
endTime : ---,
deadline : ---,  // 时间格式为"yyyy-MM-dd HH:mm:ss"形式的字符串
}

返回的数据是activityId, 也是要客户端保存的

以后的请求都要带上activityId和openId用来标识用户参加某一活动


3. 用户选好时间后

a. 发送时间段到 https://www.chengfpl.com/weili/user/create/participation表示参加活动 (POST方式)

数据格式如下

{
openId : ---,
activityId : ---,
time : ---,  //time格式为2018-05-02 07:00:00_2018-05-02 10:00:00;2018-05-02 09:00:00_2018-05-02 12:00:00这样的类型
}

返回的数据为Result<Integer>

b. 选择按天展示的话，发送请求到https://www.chengfpl.com/weili/user/participation/day   (GET方式)

返回数据为Result<Map<String, List<User>>>对象

c. 按上下午这样展示，发送请求到https://www.chengfpl.com/weili/user/participation/partofday (GET方式)

返回数据为Result<Map<String, List<User>>>对象

d. 按小时展示的话，发送请求到https://www.chengfpl.com/weili/user/participation/hour (GET方式)


4. 用户参加的所有活动展示

发送到https://www.chengfpl.com/weili/user/activity (GET方式)

发送 
{
openId : ---,
}

返回

Result<List<Activity>>


https://www.chengfpl.com/weili/user/temporary/participation/day?activityId=1
这个接口临时返回按天处理的时间，数据都是写死的，activityId就定为1吧

https://www.chengfpl.com/weili/user/select/activity?activityId=9
这个接口传activityId返回活动详情
