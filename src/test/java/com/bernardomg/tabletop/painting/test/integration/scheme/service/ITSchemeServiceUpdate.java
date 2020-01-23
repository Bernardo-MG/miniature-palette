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
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.palette.model.form.SchemeUpdateForm;
import com.bernardomg.tabletop.painting.palette.repository.SchemeRepository;
import com.bernardomg.tabletop.painting.palette.service.SchemeService;

/**
 * Integration tests for the {@link ExampleEntityService}.
 * <p>
 * As this service doesn't contain any actual business logic, and it just wraps
 * the example entities repository, these tests are for verifying everything is
 * set up correctly and working.
 */
@RunWith(JUnitPlatform.class)
@SpringJUnitConfig
@Transactional
@Rollback
@ContextConfiguration(
        locations = { "classpath:context/application-context.xml" })
@Sql({ "/db/scheme_simple.sql" })
public class ITSchemeServiceUpdate {

    @Autowired
    private SchemeRepository schemeRepository;

    /**
     * Service being tested.
     */
    @Autowired
    private SchemeService    service;

    /**
     * Default constructor.
     */
    public ITSchemeServiceUpdate() {
        super();
    }

    @Test
    public void testUpdateScheme_ChangeName_NoPaints() {
        final SchemeUpdateForm palette;

        palette = new SchemeUpdateForm();
        palette.setId(1l);
        palette.setName("abc");

        service.updateScheme(palette);

        Assertions.assertEquals(1, schemeRepository.count());
    }

    @Test
    public void testUpdateScheme_NotExisting() {
        final SchemeUpdateForm palette;

        palette = new SchemeUpdateForm();
        palette.setId(2l);
        palette.setName("palette2");

        service.updateScheme(palette);

        Assertions.assertEquals(2, schemeRepository.count());
    }

}