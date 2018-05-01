package com.tencent.weili.dao;

import com.tencent.weili.entity.User;

import java.util.List;

public interface UserDAO {

    int insertUser(User user);

    User selectUserByOpenId(String openId);

    List<User> selectAllUserByActivityId(Integer activityId);

}
