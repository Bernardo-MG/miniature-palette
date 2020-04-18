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

import java.util.ArrayList;
import java.util.Collection;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.Application;
import com.bernardomg.tabletop.painting.palette.model.form.PaintCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeCreationForm;
import com.bernardomg.tabletop.painting.palette.repository.PaintRepository;
import com.bernardomg.tabletop.painting.palette.repository.PaletteRepository;
import com.bernardomg.tabletop.painting.palette.repository.SchemeRepository;
import com.bernardomg.tabletop.painting.palette.service.SchemeService;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
public class ITSchemeServiceSave {

    @Autowired
    private PaintRepository   paintRepository;

    @Autowired
    private PaletteRepository paletteRepository;

    @Autowired
    private SchemeRepository  schemeRepository;

    /**
     * Service being tested.
     */
    @Autowired
    private SchemeService     service;

    /**
     * Default constructor.
     */
    public ITSchemeServiceSave() {
        super();
    }

    @Test
    public void testsaveScheme() {
        final SchemeCreationForm scheme;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        service.saveScheme(scheme);

        Assertions.assertEquals(1, schemeRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testsaveScheme_Empty() {
        final SchemeCreationForm scheme;

        scheme = new SchemeCreationForm();

        service.saveScheme(scheme);

        Assertions.assertEquals(0, schemeRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testsaveScheme_EmptyName() {
        final SchemeCreationForm scheme;

        scheme = new SchemeCreationForm();
        scheme.setName("");

        service.saveScheme(scheme);

        Assertions.assertEquals(0, schemeRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    @Sql({ "/db/scheme_simple.sql", "/db/palette_simple.sql" })
    public void testsaveScheme_ExistingPaletteName() {
        final SchemeCreationForm scheme;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        palette = new PaletteCreationForm();
        palette.setName("Palette1");

        palettes = new ArrayList<>();
        palettes.add(palette);

        scheme.setPalettes(palettes);

        service.saveScheme(scheme);

        Assertions.assertEquals(2, schemeRepository.count());
        Assertions.assertEquals(2, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    @Sql({ "/db/scheme_simple.sql" })
    public void testsaveScheme_ExistingSchemeName() {
        final SchemeCreationForm scheme;

        scheme = new SchemeCreationForm();
        scheme.setName("Scheme1");

        service.saveScheme(scheme);

        Assertions.assertEquals(2, schemeRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testsaveScheme_Paints() {
        final SchemeCreationForm scheme;
        final Collection<PaintCreationForm> paints;
        final PaintCreationForm paint;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        palette = new PaletteCreationForm();
        palette.setName("palette");

        palettes = new ArrayList<>();
        palettes.add(palette);

        scheme.setPalettes(palettes);

        paint = new PaintCreationForm();
        paint.setName("paint");

        paints = new ArrayList<>();
        paints.add(paint);

        palette.setPaints(paints);

        service.saveScheme(scheme);

        Assertions.assertEquals(1, schemeRepository.count());
        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(1, paintRepository.count());
    }

    @Test
    public void testsaveScheme_Paints_NoPaintName() {
        final SchemeCreationForm scheme;
        final Collection<PaintCreationForm> paints;
        final PaintCreationForm paint;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        palette = new PaletteCreationForm();
        palette.setName("palette");

        palettes = new ArrayList<>();
        palettes.add(palette);

        scheme.setPalettes(palettes);

        paint = new PaintCreationForm();
        paint.setName("");

        paints = new ArrayList<>();
        paints.add(paint);

        palette.setPaints(paints);

        service.saveScheme(scheme);

        Assertions.assertEquals(1, schemeRepository.count());
        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testsaveScheme_Paints_NoPaletteName() {
        final SchemeCreationForm scheme;
        final Collection<PaintCreationForm> paints;
        final PaintCreationForm paint;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        palette = new PaletteCreationForm();
        palette.setName("");

        palettes = new ArrayList<>();
        palettes.add(palette);

        scheme.setPalettes(palettes);

        paint = new PaintCreationForm();
        paint.setName("paint");

        paints = new ArrayList<>();
        paints.add(paint);

        palette.setPaints(paints);

        service.saveScheme(scheme);

        Assertions.assertEquals(1, schemeRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testsaveScheme_Palettes() {
        final SchemeCreationForm scheme;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        palette = new PaletteCreationForm();
        palette.setName("palette");

        palettes = new ArrayList<>();
        palettes.add(palette);

        scheme.setPalettes(palettes);

        service.saveScheme(scheme);

        Assertions.assertEquals(1, schemeRepository.count());
        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testsaveScheme_Palettes_RepeatPaletteName() {
        final SchemeCreationForm scheme;
        final PaletteCreationForm paletteA;
        final PaletteCreationForm paletteB;
        final Collection<PaletteCreationForm> palettes;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        paletteA = new PaletteCreationForm();
        paletteA.setName("paletteA");

        paletteB = new PaletteCreationForm();
        paletteB.setName("paletteB");

        palettes = new ArrayList<>();
        palettes.add(paletteA);
        palettes.add(paletteB);

        scheme.setPalettes(palettes);

        service.saveScheme(scheme);

        Assertions.assertEquals(1, schemeRepository.count());
        Assertions.assertEquals(2, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testsaveScheme_RepeatPaintName() {
        final SchemeCreationForm scheme;
        final Collection<PaintCreationForm> paints;
        final PaintCreationForm paintA;
        final PaintCreationForm paintB;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        palette = new PaletteCreationForm();
        palette.setName("palette");

        palettes = new ArrayList<>();
        palettes.add(palette);

        scheme.setPalettes(palettes);

        paintA = new PaintCreationForm();
        paintA.setName("paintA");

        paintB = new PaintCreationForm();
        paintB.setName("paintB");

        paints = new ArrayList<>();
        paints.add(paintA);
        paints.add(paintB);

        palette.setPaints(paints);

        service.saveScheme(scheme);

        Assertions.assertEquals(1, schemeRepository.count());
        Assertions.assertEquals(1, paletteRepository.count());
        Assertions.assertEquals(2, paintRepository.count());
    }

}
