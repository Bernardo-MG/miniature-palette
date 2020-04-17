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
import com.bernardomg.tabletop.painting.palette.model.form.PaintUpdateForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteUpdateForm;
import com.bernardomg.tabletop.painting.palette.service.PaletteService;
import com.google.common.collect.Iterables;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
@Sql({ "/db/scheme_simple.sql", "/db/palette_simple.sql",
        "/db/paint_simple.sql" })
public class ITPaletteServiceUpdateReturn {

    /**
     * Service being tested.
     */
    @Autowired
    private PaletteService service;

    /**
     * Default constructor.
     */
    public ITPaletteServiceUpdateReturn() {
        super();
    }

    @Test
    public void testUpdatePalette() {
        final PaletteUpdateForm palette;
        final PaletteData result;

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("palette");

        result = service.updatePalette(palette);

        Assertions.assertEquals(1l, result.getId());
        Assertions.assertEquals("palette", result.getName());
    }

    @Test
    public void testUpdatePalette_ChangeName() {
        final PaletteUpdateForm palette;
        final PaletteData result;

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("abc");

        result = service.updatePalette(palette);

        Assertions.assertEquals("abc", result.getName());
    }

    @Test
    public void testUpdatePalette_Empty() {
        final PaletteUpdateForm palette;
        final PaletteData result;

        palette = new PaletteUpdateForm();

        result = service.updatePalette(palette);

        Assertions.assertNull(result);
    }

    @Test
    public void testUpdatePalette_Paints_ReturnsPaintData() {
        final PaletteUpdateForm palette;
        final Collection<PaintUpdateForm> paints;
        final PaintUpdateForm paint;
        final PaletteData result;
        final PaintData resultPaint;

        paint = new PaintUpdateForm();
        paint.setId(1l);
        paint.setName("paint");

        paints = new ArrayList<>();
        paints.add(paint);

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("palette");
        palette.setPaints(paints);

        result = service.updatePalette(palette);

        Assertions.assertEquals(1, Iterables.size(result.getPaints()));

        resultPaint = result.getPaints().iterator().next();

        Assertions.assertEquals(1l, resultPaint.getId());
        Assertions.assertEquals("paint", resultPaint.getName());
    }

    @Test
    public void testUpdatePalette_Paints_ReturnsPaletteData() {
        final PaletteUpdateForm palette;
        final Collection<PaintUpdateForm> paints;
        final PaintUpdateForm paint;
        final PaletteData result;

        paint = new PaintUpdateForm();
        paint.setId(1l);
        paint.setName("paint");

        paints = new ArrayList<>();
        paints.add(paint);

        palette = new PaletteUpdateForm();
        palette.setId(1l);
        palette.setName("palette");
        palette.setPaints(paints);

        result = service.updatePalette(palette);

        Assertions.assertEquals(1l, result.getId());
        Assertions.assertEquals("palette", result.getName());
    }

}
