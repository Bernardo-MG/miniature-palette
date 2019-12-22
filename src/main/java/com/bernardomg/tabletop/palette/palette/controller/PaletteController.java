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

package com.bernardomg.tabletop.palette.palette.controller;

import static com.google.common.base.Preconditions.checkNotNull;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.tabletop.palette.palette.model.data.PaletteData;
import com.bernardomg.tabletop.palette.palette.model.form.PaletteCreationForm;
import com.bernardomg.tabletop.palette.palette.model.form.PaletteUpdateForm;
import com.bernardomg.tabletop.palette.palette.service.PaletteService;
import com.bernardomg.tabletop.palette.response.DefaultResponse;
import com.bernardomg.tabletop.palette.response.Response;

/**
 * Rest controller for palettes.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RestController
@RequestMapping("/rest/palette")
public class PaletteController {

    /**
     * Palette service.
     */
    private final PaletteService paletteService;

    /**
     * Constructs a controller.
     * 
     * @param service
     *            example entity service
     */
    @Autowired
    public PaletteController(final PaletteService service) {
        super();

        paletteService = checkNotNull(service, "The service is required");
    }

    /**
     * Returns all the palettes stored.
     * 
     * @return all the palettes
     */
    @GetMapping
    public Response<Iterable<PaletteData>> read() {
        final Iterable<PaletteData> read;

        read = paletteService.getAllPalettes();

        return new DefaultResponse<>(read);
    }

    /**
     * Saves the received palette.
     * 
     * @param palette
     *            palette to save
     * @return the new palette
     */
    @PostMapping
    public Response<PaletteData>
            save(@RequestBody @Valid final PaletteCreationForm palette) {
        final PaletteData result;

        result = paletteService.savePalette(palette);

        return new DefaultResponse<>(result);
    }

    /**
     * Updates the received palette.
     * 
     * @param palette
     *            palette to update
     * @return the updated palette
     */
    @PutMapping
    public Response<PaletteData>
            update(@RequestBody @Valid final PaletteUpdateForm palette) {
        final PaletteData result;

        result = paletteService.updatePalette(palette);

        return new DefaultResponse<>(result);
    }

}
