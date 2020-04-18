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
import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.bernardomg.tabletop.painting.palette.model.form.PaintUpdateForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteUpdateForm;
import com.bernardomg.tabletop.painting.palette.service.PaletteService;

@SpringJUnitConfig
@Transactional
@Rollback
@SpringBootTest(classes = Application.class)
public class ITPaletteServiceUpdateNoDataReturn {

    /**
     * Service being tested.
     */
    @Autowired
    private PaletteService service;

    /**
     * Default constructor.
     */
    public ITPaletteServiceUpdateNoDataReturn() {
        super();
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
        palette.setId(10l);
        palette.setName("palette");
        palette.setPaints(paints);

        result = service.updatePalette(palette);

        Assertions.assertNull(result);
    }

    @Test
    public void testUpdatePalette_ValidName() {
        final PaletteUpdateForm palette;
        final PaletteData result;

        palette = new PaletteUpdateForm();
        palette.setId(10l);
        palette.setName("palette");

        result = service.updatePalette(palette);

        Assertions.assertNull(result);
    }

}
