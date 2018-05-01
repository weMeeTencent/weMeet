package com.tencent.weili.dao;

import com.tencent.weili.entity.Activity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityDAOTest {

    @Autowired
    private ActivityDAO activityDAO;

    /*
    * OK
     */
    @Test
    public void deleteActivity() throws Exception {
        int result = activityDAO.deleteActivity(2);
        assertEquals(1, result);
    }

    /*
     * OK
     */
    @Test
    public void selectAllActivitiesByUserId() throws Exception {
        List<Activity> list = activityDAO.selectAllActivitiesByUserId("001");
        for (Activity activity : list) {
            System.out.println(activity);
            System.out.println(activity.getUserList());
        }
    }

    /*
     * OK
     */
    @Test
    public void updateActivityCount() throws Exception {
        int result = activityDAO.updateActivityCount(3, 1);
        assertEquals(1, result);
    }

    /*
     * OK
     */
    @Test
    public void selectActivityById() throws Exception {
        Activity activity = activityDAO.selectActivityById(3);
        System.out.println(activity);
    }

    /*
     * OK
     */
    @Test
    public void insertActivity() throws Exception {
        Activity activity = new Activity();
        activity.setCount(0);
        activity.setCreator("001");
        activity.setName("保龄球");
        activity.setStartTime(new Date());
        activity.setEndTime(new Date());
        activity.setDeadline(new Date());
        activity.setLocation("房山");
        activity.setDescription("天湖会议中心保龄球");
        activity.setTimeType(1);
        int result = activityDAO.insertActivity(activity);
        assertEquals(1, result);
    }

}