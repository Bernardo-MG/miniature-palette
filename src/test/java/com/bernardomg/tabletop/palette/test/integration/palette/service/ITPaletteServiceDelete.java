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

package com.bernardomg.tabletop.palette.test.integration.palette.service;

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

import com.bernardomg.tabletop.palette.palette.repository.PaintRepository;
import com.bernardomg.tabletop.palette.palette.repository.PaletteRepository;
import com.bernardomg.tabletop.palette.palette.service.PaletteService;

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
public class ITPaletteServiceDelete {

    @Autowired
    private PaintRepository   paintRepository;

    @Autowired
    private PaletteRepository paletteRepository;

    /**
     * Service being tested.
     */
    @Autowired
    private PaletteService    service;

    /**
     * Default constructor.
     */
    public ITPaletteServiceDelete() {
        super();
    }

    @Test
    public void testDeletePalette_Empty() {
        service.deletePalette(1l);

        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    @Sql({ "/db/palette_simple.sql" })
    public void testDeletePalette_ExistingPalette() {
        service.deletePalette(1l);

        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    @Sql({ "/db/palette_simple.sql", "/db/paint_simple.sql" })
    public void testDeletePalette_ExistingPalette_ExistingPaints() {
        service.deletePalette(1l);

        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

}
