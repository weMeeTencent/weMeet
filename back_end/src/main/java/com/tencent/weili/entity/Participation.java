package com.tencent.weili.entity;

import java.util.List;

public class Participation {

    private String userId;

    private String creatorId;

    private String activityId;

    private boolean flag;

    private String time;

    private Integer type;

    private Activity activity;

    private User user;

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getActivityId() {
        return activityId;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public boolean getFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Participation{" +
                "userId='" + userId + '\'' +
                ", creatorId='" + creatorId + '\'' +
                ", activityId='" + activityId + '\'' +
                ", flag=" + flag +
                ", time='" + time + '\'' +
                ", type=" + type +
                '}';
    }
}
