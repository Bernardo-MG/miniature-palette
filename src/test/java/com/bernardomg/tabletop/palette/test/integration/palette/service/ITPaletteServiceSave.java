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
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.palette.palette.model.PaintForm;
import com.bernardomg.tabletop.palette.palette.model.PaletteCreationForm;
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
public class ITPaletteServiceSave {

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
    public ITPaletteServiceSave() {
        super();
    }

    @Test
    public void testSavePalette_Empty() {
        final PaletteCreationForm palette;

        palette = new PaletteCreationForm();

        service.savePalette(palette);

        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSavePalette_EmptyName() {
        final PaletteCreationForm palette;

        palette = new PaletteCreationForm();
        palette.setName("");

        service.savePalette(palette);

        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSavePalette_NoPaints() {
        final PaletteCreationForm palette;

        palette = new PaletteCreationForm();
        palette.setName("palette");

        service.savePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSavePalette_Paints() {
        final PaletteCreationForm palette;
        final Collection<PaintForm> paints;
        final PaintForm paint;

        paint = new PaintForm();
        paint.setName("paint");

        paints = new ArrayList<>();
        paints.add(paint);

        palette = new PaletteCreationForm();
        palette.setName("palette");
        palette.setPaints(paints);

        service.savePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(1, paintRepository.count());
    }

    @Test
    public void testSavePalette_Paints_NoPaintName() {
        final PaletteCreationForm palette;
        final Collection<PaintForm> paints;
        final PaintForm paint;

        paint = new PaintForm();
        paint.setName("");

        paints = new ArrayList<>();
        paints.add(paint);

        palette = new PaletteCreationForm();
        palette.setName("palette");
        palette.setPaints(paints);

        service.savePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSavePalette_Paints_NoPaletteName() {
        final PaletteCreationForm palette;
        final Collection<PaintForm> paints;
        final PaintForm paint;

        paint = new PaintForm();
        paint.setName("paint");

        paints = new ArrayList<>();
        paints.add(paint);

        palette = new PaletteCreationForm();
        palette.setName("");
        palette.setPaints(paints);

        service.savePalette(palette);

        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSavePalette_RepeatPaletteName() {
        final PaletteCreationForm palette;

        palette = new PaletteCreationForm();
        palette.setName("palette");

        service.savePalette(palette);
        service.savePalette(palette);

        Assertions.assertEquals(2, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSavePalette_RepeatPaintName() {
        final PaletteCreationForm palette;
        final Collection<PaintForm> paints;
        final PaintForm paintA;
        final PaintForm paintB;

        paintA = new PaintForm();
        paintA.setName("paint");

        paintB = new PaintForm();
        paintB.setName("paint");

        paints = new ArrayList<>();
        paints.add(paintA);
        paints.add(paintB);

        palette = new PaletteCreationForm();
        palette.setName("palette");
        palette.setPaints(paints);

        service.savePalette(palette);

        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(2, paintRepository.count());
    }

}
