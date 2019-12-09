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

package com.bernardomg.tabletop.palette.product.model.persistence;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.google.common.base.MoreObjects;

/**
 * Persistent entity for the example application.
 * <p>
 * This makes use of JPA annotations for the persistence configuration.
 *
 * @author Bernardo Mart&iacute;nez Garrido
 */
@Entity(name = "BrandProduct")
@Table(name = "brand_products")
public class BrandProduct implements Serializable {

    /**
     * Serialization ID.
     */
    @Transient
    private static final long serialVersionUID = -9102550009091675104L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand", nullable = false, unique = true)
    private Integer           brand            = -1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product", nullable = false, unique = true)
    private Integer           product          = -1;

    /**
     * Constructs an example entity.
     */
    public BrandProduct() {
        super();
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

        final BrandProduct other = (BrandProduct) obj;
        return Objects.equals(product, other.product)
                && Objects.equals(brand, other.brand);
    }

    public Integer getBrand() {
        return brand;
    }

    public Integer getProduct() {
        return product;
    }

    @Override
    public final int hashCode() {
        return Objects.hash(product, brand);
    }

    public void setBrand(final Integer brand) {
        this.brand = brand;
    }

    public void setProduct(final Integer product) {
        this.product = product;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("product", product)
                .add("brand", brand).toString();
    }

}
