
package com.bernardomg.tabletop.palette.response;

public class DefaultResponse implements Response {

    private Boolean successful = true;

    public DefaultResponse() {
        super();
    }

    @Override
    public Boolean getSuccessful() {
        return successful;
    }

    public void setSuccessful(final Boolean successful) {
        this.successful = successful;
    }

}
