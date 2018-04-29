/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : weili

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-04-29 16:43:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `activity_table`
-- ----------------------------
DROP TABLE IF EXISTS `activity_table`;
CREATE TABLE `activity_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `count` int(10) unsigned zerofill NOT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_type` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `deadline` datetime NOT NULL,
  `reserve1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reserve2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of activity_table
-- ----------------------------

-- ----------------------------
-- Table structure for `recommend_activity_table`
-- ----------------------------
DROP TABLE IF EXISTS `recommend_activity_table`;
CREATE TABLE `recommend_activity_table` (
  `    id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '推荐的活动集合',
  `kind` int(11) DEFAULT NULL,
  `detail_text` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reserve1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reserve2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`    id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of recommend_activity_table
-- ----------------------------

-- ----------------------------
-- Table structure for `recommend_detail_table`
-- ----------------------------
DROP TABLE IF EXISTS `recommend_detail_table`;
CREATE TABLE `recommend_detail_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kind` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `detail` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `number` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '活动推荐人数',
  `location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reserve1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reserve2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of recommend_detail_table
-- ----------------------------

-- ----------------------------
-- Table structure for `special_day_table`
-- ----------------------------
DROP TABLE IF EXISTS `special_day_table`;
CREATE TABLE `special_day_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `event` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `reserve1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of special_day_table
-- ----------------------------

-- ----------------------------
-- Table structure for `user_activity_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_activity_table`;
CREATE TABLE `user_activity_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_creator` int(10) unsigned zerofill NOT NULL,
  `time` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `flag` int(11) DEFAULT NULL COMMENT '表示用户是否还参加活动',
  `reserve1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reserve2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_activity_table
-- ----------------------------

-- ----------------------------
-- Table structure for `user_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `reserve1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reserve2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_table
-- ----------------------------
