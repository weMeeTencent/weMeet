package com.tencent.weili;

import com.tencent.weili.service.impl.UserActivityServiceImpl;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Map;

@SpringBootApplication
@MapperScan("com.tencent.weili.dao")
public class WeiliApplication {

    public static void main(String[] args) {
        String[] testStr = {
                "20180429 8:00:00 - 20180429 18:00:00;20180430 8:00:00 - 20180430 18:00:00",
                "20180429 14:00:00 - 20180429 18:00:00;20180430 14:00:00 - 20180430 18:00:00",
                "20180429 8:00:00 - 20180429 13:00:00;20180430 14:00:00 - 20180430 18:00:00",
                "20180429 14:00:00 - 20180429 17:00:00"
        };
        UserActivityServiceImpl userActivityService = new UserActivityServiceImpl();
        ArrayList<Map.Entry<String, Integer>> tmp = userActivityService.SortByHashValue(userActivityService.AnalysisTimeSequenceArray(testStr));
        System.out.println(tmp.get(0).getKey());
        SpringApplication.run(WeiliApplication.class, args);
    }
}
