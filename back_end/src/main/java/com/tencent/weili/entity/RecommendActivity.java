package com.tencent.weili.entity;

public class RecommendActivity {

    private String text;

    private Integer kind;

    private String detailText;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getKind() {
        return kind;
    }

    public void setKind(Integer kind) {
        this.kind = kind;
    }

    public String getDetailText() {
        return detailText;
    }

    public void setDetailText(String detailText) {
        this.detailText = detailText;
    }

    @Override
    public String toString() {
        return "RecommendActivity{" +
                "text='" + text + '\'' +
                ", kind=" + kind +
                ", detailText='" + detailText + '\'' +
                '}';
    }

}
