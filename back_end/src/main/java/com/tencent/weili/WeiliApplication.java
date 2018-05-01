package com.tencent.weili;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@MapperScan("com.tencent.weili.dao")
public class WeiliApplication {

	public static void main(String[] args) {

		SpringApplication.run(WeiliApplication.class, args);
	}
}
