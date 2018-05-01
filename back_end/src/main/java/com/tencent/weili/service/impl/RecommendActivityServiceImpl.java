package com.tencent.weili.service.impl;

import java.util.HashMap;

import static java.lang.Integer.parseInt;

public class RecommendActivityServiceImpl {
    //时间传输 yyyyMMdd HH:MM:ss 暂时先对时间求余  之后修改
    public Integer GetIdByTime(String time) {
        String yyyyMMdd = time.split(" ")[0];
        return parseInt(yyyyMMdd) % 10 + 1;
    }
}
