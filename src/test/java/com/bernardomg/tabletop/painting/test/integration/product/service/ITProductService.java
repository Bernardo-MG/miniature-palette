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

package com.bernardomg.tabletop.painting.test.integration.product.service;

import java.util.Iterator;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.Application;
import com.bernardomg.tabletop.painting.product.model.ProductInfo;
import com.bernardomg.tabletop.painting.product.service.ProductService;
import com.google.common.collect.Iterables;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
public class ITProductService {

    /**
     * Service being tested.
     */
    @Autowired
    private ProductService service;

    /**
     * Default constructor.
     */
    public ITProductService() {
        super();
    }

    @Test
    @Sql({ "/db/products.sql", "/db/brands.sql", "/db/companies.sql",
            "/db/relationships.sql" })
    public void testRead_FullData() {
        final ProductInfo product;

        product = service.getAll().iterator().next();

        Assertions.assertEquals("Foundation White", product.getName());
        Assertions.assertEquals("70.919", product.getCode());
        Assertions.assertEquals("Model Color", product.getBrand());
        Assertions.assertEquals("Acrylicos Vallejo", product.getCompany());
    }

    @Test
    @Sql({ "/db/products.sql" })
    public void testRead_OnlyProducts() {
        final Iterable<? extends ProductInfo> products;

        products = service.getAll();

        Assertions.assertEquals(5, Iterables.size(products));
    }

    @Test
    @Sql({ "/db/products.sql" })
    public void testRead_OnlyProducts_NoJoinedData() {
        final Iterable<? extends ProductInfo> products;

        products = service.getAll();

        for (final ProductInfo product : products) {
            Assertions.assertNull(product.getCompany());
            Assertions.assertNull(product.getBrand());
        }
    }

    @Test
    @Sql({ "/db/products.sql" })
    public void testRead_Order() {
        final Iterator<? extends ProductInfo> products;

        products = service.getAll().iterator();

        Assertions.assertEquals("Foundation White", products.next().getName());
        Assertions.assertEquals("Gloss White", products.next().getName());
        Assertions.assertEquals("Ivory", products.next().getName());
        Assertions.assertEquals("Offwhite", products.next().getName());
        Assertions.assertEquals("White", products.next().getName());
    }

}
