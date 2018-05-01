package com.tencent.weili.service;

import java.util.*;

public interface UserActivityService {

    //解析存储的活动字符串数组
    //每个人存储的字符串格式为YYYYMMDD hh:mm:ss - YYYYMMDD hh:mm:ss，不同区段用;分隔
    public HashMap<String, Integer> AnalysisTimeSequenceArray(String[] timeSequenceArray);

    public ArrayList<Map.Entry<String, Integer>> SortByHashValue(HashMap<String, Integer> mp);
}
