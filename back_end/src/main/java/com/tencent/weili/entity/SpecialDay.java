package com.tencent.weili.entity;

import java.util.Date;

public class SpecialDay {

    private Date date;

    private String event;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    @Override
    public String toString() {
        return "SpecialDay{" +
                "date=" + date +
                ", event='" + event + '\'' +
                '}';
    }

}
