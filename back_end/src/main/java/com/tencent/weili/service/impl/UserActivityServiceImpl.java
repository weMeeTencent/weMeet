package com.tencent.weili.service.impl;

import com.tencent.weili.service.UserActivityService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


public class UserActivityServiceImpl implements UserActivityService {

    @Override
    public HashMap<String, Integer> AnalysisTimeSequenceArray(String[] timeSequenceArray) {
        HashMap mp = new HashMap<String, Integer>();
        for (int i = 0; i < timeSequenceArray.length; ++i) {
            String timeSequence = timeSequenceArray[i].trim();
            String[] timeArray = timeSequence.split(";");
            for (int j = 0; j < timeArray.length; ++j) {
                String time = timeArray[j].trim();
                String startTime = time.split("-")[0].trim();
                String endTime = time.split("-")[1].trim();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
                Date dateStartTime = null;
                Date dateEndTime = null;
                try {
                    dateStartTime = sdf.parse(startTime);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                try {
                    dateEndTime = sdf.parse(endTime);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                Calendar start = Calendar.getInstance();
                start.setTime(dateStartTime);
                Long lStartTime = start.getTimeInMillis();
                Calendar end = Calendar.getInstance();
                end.setTime(dateEndTime);
                Long lEndTime = end.getTimeInMillis();
                Long oneHour = 1000 * 60 * 60l;
                Long tmp = lStartTime;
                while (tmp <= lEndTime) {
                    String key = sdf.format(new Date(tmp));
                    if (mp.containsKey(key)) mp.put(key, (Integer) mp.get(key) + new Integer(1));
                    else mp.put(key, new Integer(1));
                    tmp += oneHour;
                }
            }
        }
        return mp;
    }

    @Override
    public ArrayList<Map.Entry<String, Integer>> SortByHashValue(HashMap<String, Integer> mp) {

        ArrayList<Map.Entry<String, Integer>> res = new ArrayList<Map.Entry<String, Integer>>(mp.entrySet());
        ;
        //通过比较器来排序
        Collections.sort(res, new Comparator<Map.Entry<String, Integer>>() {
            //升序排序
            public int compare(Map.Entry<String, Integer> o1,
                               Map.Entry<String, Integer> o2) {
                return o2.getValue().compareTo(o1.getValue());
            }

        });
        return res;
    }
}
