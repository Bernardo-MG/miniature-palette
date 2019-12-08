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

import java.util.Iterator;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.palette.palette.model.PaintOption;
import com.bernardomg.tabletop.palette.palette.model.PaletteGroupOption;
import com.bernardomg.tabletop.palette.palette.model.PaletteForm;
import com.bernardomg.tabletop.palette.palette.service.PaletteService;
import com.google.common.collect.Iterables;

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
        final Iterable<PaletteGroupOption> read;

        read = service.getAll();

        Assertions.assertEquals(0, Iterables.size(read));
    }

    @Test
    @Sql({ "/db/palette_group_big.sql" })
    @Disabled
    public void testRead_Full_Big() {
        final Iterable<PaletteGroupOption> read;
        final PaletteGroupOption group;
        final Iterator<PaletteForm> palettes;
        Iterator<PaintOption> paints;
        PaletteForm palette;
        PaintOption paint;

        read = service.getAll();

        Assertions.assertEquals(1, Iterables.size(read));

        group = read.iterator().next();
        Assertions.assertEquals("Group1", group.getName());
        Assertions.assertEquals(3, Iterables.size(group.getPalettes()));

        palettes = group.getPalettes().iterator();

        // First palette
        palette = palettes.next();
        Assertions.assertEquals("Palette1", palette.getName());
        Assertions.assertEquals(1, Iterables.size(palette.getPaints()));

        paints = palette.getPaints().iterator();
        paint = paints.next();
        Assertions.assertEquals("Paint1", paint.getName());

        // Second palette
        palette = palettes.next();
        Assertions.assertEquals("Palette2", palette.getName());
        Assertions.assertEquals(2, Iterables.size(palette.getPaints()));

        paints = palette.getPaints().iterator();
        paint = paints.next();
        Assertions.assertEquals("Paint2", paint.getName());
        paint = paints.next();
        Assertions.assertEquals("Paint3", paint.getName());

        // Third palette
        palette = palettes.next();
        Assertions.assertEquals("Palette3", palette.getName());
        Assertions.assertEquals(3, Iterables.size(palette.getPaints()));

        paints = palette.getPaints().iterator();
        paint = paints.next();
        Assertions.assertEquals("Paint4", paint.getName());
        paint = paints.next();
        Assertions.assertEquals("Paint5", paint.getName());
        paint = paints.next();
        Assertions.assertEquals("Paint6", paint.getName());
    }

    @Test
    @Sql({ "/db/palette_group_simple.sql", "/db/palette_simple.sql",
            "/db/paint_simple.sql" })
    @Disabled
    public void testRead_Full_Simple() {
        final Iterable<PaletteGroupOption> read;
        final PaletteGroupOption group;
        final PaletteForm palette;
        final PaintOption paint;

        read = service.getAll();

        Assertions.assertEquals(1, Iterables.size(read));

        group = read.iterator().next();
        Assertions.assertEquals("Group1", group.getName());
        Assertions.assertEquals(1, Iterables.size(group.getPalettes()));

        palette = group.getPalettes().iterator().next();
        Assertions.assertEquals("Palette1", palette.getName());
        Assertions.assertEquals(1, Iterables.size(palette.getPaints()));

        paint = palette.getPaints().iterator().next();
        Assertions.assertEquals("Paint1", paint.getName());
    }

    @Test
    @Sql({ "/db/palette_group_simple.sql", "/db/palette_simple.sql" })
    @Disabled
    public void testRead_Group_Palette_Simple() {
        final Iterable<PaletteGroupOption> read;
        final PaletteGroupOption group;
        final PaletteForm palette;

        read = service.getAll();

        Assertions.assertEquals(1, Iterables.size(read));

        group = read.iterator().next();
        Assertions.assertEquals("Group1", group.getName());
        Assertions.assertEquals(1, Iterables.size(group.getPalettes()));

        palette = group.getPalettes().iterator().next();
        Assertions.assertEquals("Palette1", palette.getName());
        Assertions.assertEquals(0, Iterables.size(palette.getPaints()));
    }

    @Test
    @Sql({ "/db/palette_group_simple.sql" })
    public void testRead_Group_Simple() {
        final Iterable<PaletteGroupOption> read;
        final PaletteGroupOption group;

        read = service.getAll();

        Assertions.assertEquals(1, Iterables.size(read));

        group = read.iterator().next();
        Assertions.assertEquals("Group1", group.getName());
        Assertions.assertEquals(0, Iterables.size(group.getPalettes()));
    }

}
