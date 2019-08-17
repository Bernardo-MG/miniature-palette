
package com.bernardomg.tabletop.palette.paint.model;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.Serializable;

public class PaintOption implements Serializable {

    private static final long serialVersionUID = -7040753038901687866L;

    private String            name             = "";

    public PaintOption() {
        super();
    }

    public String getName() {
        return name;
    }

    public void setName(final String value) {
        name = checkNotNull(value, "Received a null pointer as name");
    }

}
