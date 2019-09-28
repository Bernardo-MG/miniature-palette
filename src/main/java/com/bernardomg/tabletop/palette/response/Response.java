
package com.bernardomg.tabletop.palette.response;

public interface Response<T> {

    public T getContent();

    public Boolean getSuccessful();

}
