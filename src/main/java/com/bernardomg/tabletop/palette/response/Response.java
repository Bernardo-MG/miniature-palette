
package com.bernardomg.tabletop.palette.response;

public interface Response<T> {

    public Boolean getSuccessful();

    public T getContent();

}
