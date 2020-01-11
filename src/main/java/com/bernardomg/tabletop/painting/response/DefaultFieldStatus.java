
package com.bernardomg.tabletop.painting.response;

public final class DefaultFieldStatus implements FieldStatus {

    private String field;

    private String message;

    private String source;

    private Object value;

    public DefaultFieldStatus() {
        super();
    }

    @Override
    public final String getField() {
        return field;
    }

    @Override
    public final String getMessage() {
        return message;
    }

    @Override
    public final String getSource() {
        return source;
    }

    @Override
    public final Object getValue() {
        return value;
    }

    @Override
    public final void setField(final String field) {
        this.field = field;
    }

    @Override
    public final void setMessage(final String message) {
        this.message = message;
    }

    @Override
    public final void setSource(final String source) {
        this.source = source;
    }

    @Override
    public final void setValue(final Object value) {
        this.value = value;
    }

}
