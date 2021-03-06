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
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.Application;
import com.bernardomg.tabletop.painting.palette.model.data.PaintData;
import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.bernardomg.tabletop.painting.palette.model.form.PaintCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteCreationForm;
import com.bernardomg.tabletop.painting.palette.service.PaletteService;
import com.google.common.collect.Iterables;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
public class ITPaletteServiceSaveReturn {

    /**
     * Service being tested.
     */
    @Autowired
    private PaletteService service;

    /**
     * Default constructor.
     */
    public ITPaletteServiceSaveReturn() {
        super();
    }

    @Test
    public void testSavePalette_Empty() {
        final PaletteCreationForm palette;
        final PaletteData result;

        palette = new PaletteCreationForm();

        result = service.savePalette(palette);

        Assertions.assertNull(result);
    }

    @Test
    public void testSavePalette_Paints() {
        final PaletteCreationForm palette;
        final Collection<PaintCreationForm> paints;
        final PaintCreationForm paint;
        final PaletteData result;
        final PaintData resultPaint;

        paint = new PaintCreationForm();
        paint.setName("paint");

        paints = new ArrayList<>();
        paints.add(paint);

        palette = new PaletteCreationForm();
        palette.setName("palette");
        palette.setPaints(paints);

        result = service.savePalette(palette);

        Assertions.assertEquals("palette", result.getName());

        Assertions.assertEquals(1, Iterables.size(result.getPaints()));

        resultPaint = result.getPaints().iterator().next();
        Assertions.assertNotNull(resultPaint.getId());
        Assertions.assertEquals("paint", resultPaint.getName());
    }

    @Test
    public void testSavePalette_ValidName_NoPaints() {
        final PaletteCreationForm palette;
        final PaletteData result;

        palette = new PaletteCreationForm();
        palette.setName("palette");

        result = service.savePalette(palette);

        Assertions.assertNotNull(result.getId());
        Assertions.assertEquals("palette", result.getName());
    }

}
