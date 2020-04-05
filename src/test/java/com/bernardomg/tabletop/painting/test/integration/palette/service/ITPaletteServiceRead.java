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

package com.bernardomg.tabletop.painting.test.integration.palette.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.Application;
import com.bernardomg.tabletop.painting.palette.model.data.PaintData;
import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.bernardomg.tabletop.painting.palette.service.PaletteService;
import com.google.common.collect.Iterables;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
@ContextConfiguration(
        locations = { "classpath:context/application-context.xml" })
public class ITPaletteServiceRead {

    /**
     * Service being tested.
     */
    @Autowired
    private PaletteService service;

    /**
     * Default constructor.
     */
    public ITPaletteServiceRead() {
        super();
    }

    @Test
    public void testRead_Empty() {
        final Iterable<PaletteData> read;

        read = service.getAllPalettes();

        Assertions.assertEquals(0, Iterables.size(read));
    }

    @Test
    @Sql({ "/db/palette_simple.sql", "/db/paint_simple.sql" })
    public void testRead_Full_Simple() {
        final Iterable<PaletteData> read;
        final PaletteData palette;
        final PaintData paint;

        read = service.getAllPalettes();

        Assertions.assertEquals(1, Iterables.size(read));

        palette = read.iterator().next();
        Assertions.assertEquals("Palette1", palette.getName());
        Assertions.assertEquals(1, Iterables.size(palette.getPaints()));

        paint = palette.getPaints().iterator().next();
        Assertions.assertEquals("Paint1", paint.getName());
    }

    @Test
    @Sql({ "/db/palette_simple.sql" })
    public void testRead_NoPaints_Simple() {
        final Iterable<PaletteData> read;
        final PaletteData palette;

        read = service.getAllPalettes();

        Assertions.assertEquals(1, Iterables.size(read));

        palette = read.iterator().next();
        Assertions.assertEquals("Palette1", palette.getName());
        Assertions.assertEquals(0, Iterables.size(palette.getPaints()));
    }

}
