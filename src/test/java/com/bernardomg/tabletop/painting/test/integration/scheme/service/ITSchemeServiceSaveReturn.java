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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.Application;
import com.bernardomg.tabletop.painting.palette.model.data.SchemeData;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeCreationForm;
import com.bernardomg.tabletop.painting.palette.service.SchemeService;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
@ContextConfiguration(
        locations = { "classpath:context/application-context.xml" })
public class ITSchemeServiceSaveReturn {

    /**
     * Service being tested.
     */
    @Autowired
    private SchemeService service;

    /**
     * Default constructor.
     */
    public ITSchemeServiceSaveReturn() {
        super();
    }

    @Test
    public void testSaveScheme_Empty() {
        final SchemeCreationForm palette;
        final SchemeData result;

        palette = new SchemeCreationForm();

        result = service.saveScheme(palette);

        Assertions.assertNull(result);
    }

    @Test
    public void testSaveScheme_ValidName_NoPaints() {
        final SchemeCreationForm palette;
        final SchemeData result;

        palette = new SchemeCreationForm();
        palette.setName("scheme");

        result = service.saveScheme(palette);

        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals("scheme", result.getName());
    }

}
