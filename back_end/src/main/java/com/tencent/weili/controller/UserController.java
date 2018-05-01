package com.tencent.weili.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tencent.weili.entity.URLInfo;
import com.tencent.weili.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class UserController {

    @Autowired
    private URLInfo urlInfo;

    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    @ResponseBody
    public String login(@RequestParam(required = true, value = "code") String code) {
        urlInfo.setJsCode(code);
        String url = urlInfo.toString();
        //TODO return a jsessionId to client as user identity
        return Util.getUserWXInfo(url);
    }

    @RequestMapping(value = "/user/add", method = RequestMethod.POST)
    public void add(@RequestParam(required = true,value = "encryptedData")String encryptedData,
                    @RequestParam(required = true,defaultValue = "iv")String iv,
                    @RequestParam(required = true,defaultValue = "sessionId")String sessionId) {

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String userInfo = Util.decode(encryptedData, sessionId, iv);
            System.out.println(userInfo);
            //User user = objectMapper.readValue(userInfo, User.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //TODO add user into mysql
    }

}
