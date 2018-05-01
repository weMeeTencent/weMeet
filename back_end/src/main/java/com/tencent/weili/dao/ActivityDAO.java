package com.tencent.weili.dao;

import com.tencent.weili.entity.Activity;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface ActivityDAO {

    int insertActivity(Activity activity);

    int deleteActivity(Integer id);

    Activity selectActivityById(Integer id);

    int updateActivityCount(@Param("id") Integer id, @Param("count") Integer count);

    List<Activity> selectAllActivitiesByUserId(String userId);

}
