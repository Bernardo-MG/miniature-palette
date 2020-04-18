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
import com.bernardomg.tabletop.painting.palette.model.data.PaintData;
import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.bernardomg.tabletop.painting.palette.model.data.SchemeData;
import com.bernardomg.tabletop.painting.palette.model.form.PaintCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeCreationForm;
import com.bernardomg.tabletop.painting.palette.service.SchemeService;
import com.google.common.collect.Iterables;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
@Sql({ "/db/scheme_simple.sql" })
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
    public void testsaveScheme() {
        final SchemeCreationForm scheme;
        final SchemeData result;

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");

        result = service.saveScheme(scheme);

        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals("scheme", result.getName());
    }

    @Test
    public void testsaveScheme_Empty() {
        final SchemeCreationForm scheme;
        final SchemeData result;

        scheme = new SchemeCreationForm();

        result = service.saveScheme(scheme);

        Assertions.assertNull(result);
    }

    @Test
    public void testsaveScheme_Paints() {
        final SchemeCreationForm scheme;
        final SchemeData result;
        final Collection<PaintCreationForm> paints;
        final PaintCreationForm paint;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;
        final PaletteData resultPalette;
        final PaintData resultPaint;

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

        result = service.saveScheme(scheme);

        Assertions.assertEquals("scheme", result.getName());
        Assertions.assertEquals(1, Iterables.size(result.getPalettes()));

        resultPalette = result.getPalettes().iterator().next();
        Assertions.assertNotNull(resultPalette.getId());
        Assertions.assertEquals("palette", resultPalette.getName());

        resultPaint = resultPalette.getPaints().iterator().next();
        Assertions.assertNotNull(resultPaint.getId());
        Assertions.assertEquals("paint", resultPaint.getName());
    }

    @Test
    public void testsaveScheme_Palettes() {
        final SchemeCreationForm scheme;
        final SchemeData result;
        final PaletteData resultPalette;
        final PaletteCreationForm palette;
        final Collection<PaletteCreationForm> palettes;

        palette = new PaletteCreationForm();
        palette.setName("palette");

        palettes = new ArrayList<>();
        palettes.add(palette);

        scheme = new SchemeCreationForm();
        scheme.setName("scheme");
        scheme.setPalettes(palettes);

        result = service.saveScheme(scheme);

        Assertions.assertEquals("scheme", result.getName());
        Assertions.assertEquals(1, Iterables.size(result.getPalettes()));

        resultPalette = result.getPalettes().iterator().next();
        Assertions.assertNotNull(resultPalette.getId());
        Assertions.assertEquals("palette", resultPalette.getName());
    }

}
