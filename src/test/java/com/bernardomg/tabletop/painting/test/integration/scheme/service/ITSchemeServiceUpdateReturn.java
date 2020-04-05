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

package com.bernardomg.tabletop.painting.test.integration.scheme.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.palette.model.data.SchemeData;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeUpdateForm;
import com.bernardomg.tabletop.painting.palette.service.SchemeService;

/**
 * Integration tests for the {@link ExampleEntityService}.
 * <p>
 * As this service doesn't contain any actual business logic, and it just wraps
 * the example entities repository, these tests are for verifying everything is
 * set up correctly and working.
 */
@SpringJUnitConfig
@Transactional
@Rollback
@ContextConfiguration(
        locations = { "classpath:context/application-context.xml" })
@Sql({ "/db/scheme_simple.sql" })
public class ITSchemeServiceUpdateReturn {

    /**
     * Service being tested.
     */
    @Autowired
    private SchemeService service;

    /**
     * Default constructor.
     */
    public ITSchemeServiceUpdateReturn() {
        super();
    }

    @Test
    public void testUpdateScheme() {
        final SchemeUpdateForm palette;
        final SchemeData result;

        palette = new SchemeUpdateForm();
        palette.setId(1l);
        palette.setName("palette");

        result = service.updateScheme(palette);

        Assertions.assertEquals(1l, result.getId());
        Assertions.assertEquals("palette", result.getName());
    }

    @Test
    public void testUpdateScheme_ChangeName() {
        final SchemeUpdateForm palette;
        final SchemeData result;

        palette = new SchemeUpdateForm();
        palette.setId(1l);
        palette.setName("abc");

        result = service.updateScheme(palette);

        Assertions.assertEquals("abc", result.getName());
    }

    @Test
    public void testUpdateScheme_Empty() {
        final SchemeUpdateForm palette;
        final SchemeData result;

        palette = new SchemeUpdateForm();

        result = service.updateScheme(palette);

        Assertions.assertNull(result);
    }

}
