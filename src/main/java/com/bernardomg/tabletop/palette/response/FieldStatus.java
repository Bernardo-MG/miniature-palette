
package com.bernardomg.tabletop.palette.response;

public interface FieldStatus {

    public String getField();

    public String getMessage();

    public String getSource();

    public Object getValue();

    public void setField(final String field);

    public void setMessage(String message);

    public void setSource(final String source);

    public void setValue(final Object value);

}
