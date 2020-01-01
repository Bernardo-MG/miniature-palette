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

import java.util.ArrayList;
import java.util.Collection;

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

import com.bernardomg.tabletop.palette.palette.model.form.PaintUpdateForm;
import com.bernardomg.tabletop.palette.palette.model.form.PaletteUpdateForm;
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
@Sql({ "/db/palette_simple.sql", "/db/paint_simple.sql" })
public class ITPaletteServiceUpdate {

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
    public ITPaletteServiceUpdate() {
        super();
    }

    @Test
    public void testUpdatePalette_AddPaint() {
        final PaletteUpdateForm palette;
        final Collection<PaintUpdateForm> paints;
        final PaintUpdateForm paintA;
        final PaintUpdateForm paintB;

        paintA = new PaintUpdateForm();
        paintA.setId(1l);
        paintA.setName("paint");

        paintB = new PaintUpdateForm();
        paintB.setId(2l);
        paintB.setName("paint2");

        paints = new ArrayList<>();
        paints.add(paintA);
        paints.add(paintB);

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("palette");
        palette.setPaints(paints);

        service.updatePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(2, paintRepository.count());
    }

    @Test
    public void testUpdatePalette_AddRepeatedPaintName() {
        final PaletteUpdateForm palette;
        final Collection<PaintUpdateForm> paints;
        final PaintUpdateForm paintA;
        final PaintUpdateForm paintB;

        paintA = new PaintUpdateForm();
        paintA.setId(1l);
        paintA.setName("paint");

        paintB = new PaintUpdateForm();
        paintB.setId(2l);
        paintB.setName("paint");

        paints = new ArrayList<>();
        paints.add(paintA);
        paints.add(paintB);

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("palette");
        palette.setPaints(paints);

        service.updatePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(2, paintRepository.count());
    }

    @Test
    public void testUpdatePalette_ChangeName_NoPaints() {
        final PaletteUpdateForm palette;

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("abc");

        service.updatePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testUpdatePalette_EditPaint() {
        final PaletteUpdateForm palette;
        final Collection<PaintUpdateForm> paints;
        final PaintUpdateForm paint;

        paint = new PaintUpdateForm();
        paint.setId(1l);
        paint.setName("abc");

        paints = new ArrayList<>();
        paints.add(paint);

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("palette");
        palette.setPaints(paints);

        service.updatePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(1, paintRepository.count());
    }

    @Test
    public void testUpdatePalette_NotExisting() {
        final PaletteUpdateForm palette;

        palette = new PaletteUpdateForm();
        palette.setId(2l);
        palette.setName("palette2");

        service.updatePalette(palette);

        Assertions.assertEquals(2, paletteRepository.count());
        Assertions.assertEquals(1, paintRepository.count());
    }

    @Test
    public void testUpdatePalette_RemovePaint() {
        final PaletteUpdateForm palette;

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("palette");

        service.updatePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

}
