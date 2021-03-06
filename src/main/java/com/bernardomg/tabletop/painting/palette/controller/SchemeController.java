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

package com.bernardomg.tabletop.painting.palette.controller;

import static com.google.common.base.Preconditions.checkNotNull;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.tabletop.painting.palette.model.data.SchemeData;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeUpdateForm;
import com.bernardomg.tabletop.painting.palette.service.SchemeService;
import com.bernardomg.tabletop.painting.response.DefaultResponse;
import com.bernardomg.tabletop.painting.response.Response;

/**
 * Rest controller for palettes.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RestController
@RequestMapping("/rest/scheme")
public class SchemeController {

    /**
     * Palette service.
     */
    private final SchemeService paletteService;

    /**
     * Constructs a controller.
     * 
     * @param service
     *            example entity service
     */
    @Autowired
    public SchemeController(final SchemeService service) {
        super();

        paletteService = checkNotNull(service, "The service is required");
    }

    /**
     * Saves the received palette.
     * 
     * @param palette
     *            palette to save
     * @return the new palette
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<SchemeData>
            create(@RequestBody @Valid final SchemeCreationForm palette) {
        final SchemeData result;

        result = paletteService.saveScheme(palette);

        return new DefaultResponse<>(result);
    }

    /**
     * Deletes the received palette.
     * 
     * @param id
     *            id of the palette to delete
     * @return {@code true} if the palette was deleted, {@code false} otherwise
     */
    @DeleteMapping(path = "/{id:\\d*}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<Boolean> delete(@PathVariable final Long id) {
        final Boolean result;

        result = paletteService.deleteScheme(id);

        return new DefaultResponse<>(result);
    }

    /**
     * Returns all the palettes stored.
     * 
     * @return all the palettes
     */
    @GetMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<Iterable<SchemeData>> read() {
        final Iterable<SchemeData> read;

        read = paletteService.getAllSchemes();

        return new DefaultResponse<>(read);
    }

    /**
     * Updates the received palette.
     * 
     * @param id
     *            palette's id
     * @param palette
     *            palette to update
     * @return the updated palette
     */
    @PutMapping(path = "/{id:\\d*}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<SchemeData> update(@PathVariable final Long id,
            @RequestBody @Valid final SchemeUpdateForm palette) {
        final SchemeData result;

        // Forces id coherence
        palette.setId(id);

        result = paletteService.updateScheme(palette);

        return new DefaultResponse<>(result);
    }

}
