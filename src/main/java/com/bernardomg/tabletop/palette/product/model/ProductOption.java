
package com.bernardomg.tabletop.palette.product.model;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.Serializable;
import java.util.Objects;

import com.google.common.base.MoreObjects;

public class ProductOption implements Serializable {

    private static final long serialVersionUID = -7040753038901687866L;

    private String            brand            = "";

    private String            code             = "";

    private String            company          = "";

    private String            name             = "";

    public ProductOption() {
        super();
    }

    public ProductOption(final String cd, final String nm, final String br,
            final String cp) {
        super();

        code = checkNotNull(cd, "Received a null pointer as code");
        name = checkNotNull(nm, "Received a null pointer as name");
        brand = br;
        company = cp;
    }

    @Override
    public final boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }

        if (obj == null) {
            return false;
        }

        if (getClass() != obj.getClass()) {
            return false;
        }

        final ProductOption other = (ProductOption) obj;
        return Objects.equals(name, other.name);
    }

    public String getBrand() {
        return brand;
    }

    public String getCode() {
        return code;
    }

    public String getCompany() {
        return company;
    }

    public String getName() {
        return name;
    }

    @Override
    public final int hashCode() {
        return Objects.hash(name);
    }

    public void setBrand(final String brand) {
        this.brand = brand;
    }

    public void setCode(final String value) {
        code = checkNotNull(value, "Received a null pointer as code");
    }

    public void setCompany(final String company) {
        this.company = company;
    }

    public void setName(final String value) {
        name = checkNotNull(value, "Received a null pointer as name");
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name).toString();
    }

}
