
package com.bernardomg.tabletop.palette.response;

import static com.google.common.base.Preconditions.checkNotNull;

public class DefaultResponse<T> implements Response<T> {

    private T       content;

    private Boolean successful = true;

    public DefaultResponse() {
        super();
    }

    public DefaultResponse(final T cont) {
        super();

        content = checkNotNull(cont, "Missing content");
    }

    @Override
    public T getContent() {
        return content;
    }

    @Override
    public Boolean getSuccessful() {
        return successful;
    }

    public void setContent(final T content) {
        this.content = content;
    }

    public void setSuccessful(final Boolean successful) {
        this.successful = successful;
    }

}
