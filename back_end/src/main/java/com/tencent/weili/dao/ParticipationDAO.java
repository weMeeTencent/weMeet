package com.tencent.weili.dao;

import com.tencent.weili.entity.Participation;

import java.util.List;

public interface ParticipationDAO {

    /*
     * 根据活动id去user_activity表查询所有参与情况
     */

    List<Participation> selectAllParticipationByActivityId(int activityId);

    /*

     */
    int deleteByCreatorId(String creatorId);

    /*
     *
     */
    int insertParticipation(Participation participation);

}
