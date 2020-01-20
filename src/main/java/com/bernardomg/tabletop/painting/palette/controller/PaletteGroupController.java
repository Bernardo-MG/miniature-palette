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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.tabletop.painting.palette.model.data.PaletteGroupData;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteGroupCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteGroupUpdateForm;
import com.bernardomg.tabletop.painting.palette.service.PaletteGroupService;
import com.bernardomg.tabletop.painting.response.DefaultResponse;
import com.bernardomg.tabletop.painting.response.Response;

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
     * Returns all the palettes stored.
     * 
     * @return all the palettes
     */
    @GetMapping
    public Response<Iterable<PaletteGroupData>> read() {
        final Iterable<PaletteGroupData> read;

        read = paletteService.getAllGroups();

        return new DefaultResponse<>(read);
    }

    /**
     * Saves the received group.
     * 
     * @param group
     *            group to save
     * @return the new group
     */
    @PostMapping
    public Response<PaletteGroupData>
            save(@RequestBody @Valid final PaletteGroupCreationForm group) {
        final PaletteGroupData result;

        result = paletteService.saveGroup(group);

        return new DefaultResponse<>(result);
    }

    /**
     * Updates the received group.
     * 
     * @param group
     *            group to update
     * @return the updated group
     */
    @PutMapping
    public Response<PaletteGroupData>
            update(@RequestBody @Valid final PaletteGroupUpdateForm group) {
        final PaletteGroupData result;

        result = paletteService.updateGroup(group);

        return new DefaultResponse<>(result);
    }

}
