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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.tabletop.palette.palette.model.data.PaletteGroupData;
import com.bernardomg.tabletop.palette.palette.model.form.PaletteGroupCreationForm;
import com.bernardomg.tabletop.palette.palette.service.PaletteGroupService;
import com.bernardomg.tabletop.palette.response.DefaultResponse;
import com.bernardomg.tabletop.palette.response.Response;

/**
 * Rest controller for palettes.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RestController
@RequestMapping("/rest/palette/group")
public class PaletteGroupController {

    /**
     * Palette service.
     */
    private final PaletteGroupService paletteService;

    /**
     * Constructs a controller.
     * 
     * @param service
     *            example entity service
     */
    @Autowired
    public PaletteGroupController(final PaletteGroupService service) {
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
    @PostMapping
    public Response<PaletteGroupData>
            save(@RequestBody @Valid final PaletteGroupCreationForm palette) {
        final PaletteGroupData result;

        result = paletteService.saveGroup(palette);

        return new DefaultResponse<>(result);
    }

}
