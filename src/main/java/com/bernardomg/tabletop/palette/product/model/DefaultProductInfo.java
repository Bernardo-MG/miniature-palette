/**
 * Copyright 2019 the original author or authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package com.bernardomg.tabletop.palette.product.model;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.Serializable;
import java.util.Objects;

import com.google.common.base.MoreObjects;

public class DefaultProductInfo implements Serializable, ProductInfo {

    private static final long serialVersionUID = -7040753038901687866L;

    private String            brand            = "";

    private String            code             = "";

    private String            company          = "";

    private String            name             = "";

    public DefaultProductInfo() {
        super();
    }

    public DefaultProductInfo(final String code, final String name,
            final String brand, final String company) {
        super();

        this.code = checkNotNull(code, "Received a null pointer as code");
        this.name = checkNotNull(name, "Received a null pointer as name");
        this.brand = brand;
        this.company = company;
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

        final DefaultProductInfo other = (DefaultProductInfo) obj;
        return Objects.equals(name, other.name);
    }

    @Override
    public String getBrand() {
        return brand;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getCompany() {
        return company;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public final int hashCode() {
        return Objects.hash(name, code);
    }

    @Override
    public void setBrand(final String value) {
        brand = checkNotNull(value, "Received a null pointer as brand");
    }

    @Override
    public void setCode(final String value) {
        code = checkNotNull(value, "Received a null pointer as code");
    }

    @Override
    public void setCompany(final String value) {
        company = checkNotNull(value, "Received a null pointer as company");
    }

    @Override
    public void setName(final String value) {
        name = checkNotNull(value, "Received a null pointer as name");
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name)
                .add("code", code).add("company", company).add("brand", brand)
                .toString();
    }

}
