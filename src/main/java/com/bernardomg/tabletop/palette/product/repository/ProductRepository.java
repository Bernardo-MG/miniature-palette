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

package com.bernardomg.tabletop.palette.product.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bernardomg.tabletop.palette.product.model.DefaultProductInfo;
import com.bernardomg.tabletop.palette.product.model.persistence.Product;

/**
 * Spring-JPA repository for {@link Product}.
 *
 * @author Bernardo Mart&iacute;nez Garrido
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT new com.bernardomg.tabletop.palette.product.model.DefaultProductInfo(p.id, p.code, p.name, b.name, c.name) FROM Product p"
            + " LEFT JOIN BrandProduct bp ON p.id = bp.product"
            + " LEFT JOIN Brand b ON b.id = bp.brand"
            + " LEFT JOIN CompanyBrand cb ON cb.brand = bp.brand"
            + " LEFT JOIN Company c ON c.id = cb.company"
            + " ORDER BY p.name ASC")
    public Collection<DefaultProductInfo> findAllOptions();

}
