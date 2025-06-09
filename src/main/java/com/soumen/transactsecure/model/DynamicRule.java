package com.soumen.transactsecure.model;

import java.util.List;

public class DynamicRule {
    public List<Condition> conditions;
    public String logic; // AND/OR
    public String action;
    public String tag;

    public static class Condition {
        public String field;
        public String operator;
        public Object value;
    }
}
