
package com.bernardomg.tabletop.palette.response;

public class DefaultFieldStatus implements FieldStatus {

    private String field;

    private Object value;

    public DefaultFieldStatus() {
        super();
    }

    @Override
    public String getField() {
        return field;
    }

    @Override
    public Object getValue() {
        return value;
    }

    @Override
    public void setField(final String field) {
        this.field = field;
    }

    @Override
    public void setValue(final Object value) {
        this.value = value;
    }

}
