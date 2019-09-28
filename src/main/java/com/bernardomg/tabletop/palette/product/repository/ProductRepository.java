/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2019 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.bernardomg.tabletop.palette.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bernardomg.tabletop.palette.product.model.ProductOption;
import com.bernardomg.tabletop.palette.product.model.persistence.Product;

/**
 * Spring-JPA repository for {@link Product}.
 *
 * @author Bernardo Mart&iacute;nez Garrido
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT new com.bernardomg.tabletop.palette.product.model.ProductOption(p.code, p.name, b.name, c.name) FROM Product p"
            + " LEFT JOIN BrandProduct bp ON p.id = bp.product"
            + " LEFT JOIN Brand b ON b.id = bp.brand"
            + " LEFT JOIN CompanyBrand cb ON cb.brand = bp.brand"
            + " LEFT JOIN Company c ON c.id = cb.company"
            + " ORDER BY p.name ASC")
    public List<ProductOption> findAllOptions();

}
