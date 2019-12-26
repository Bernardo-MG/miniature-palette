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

package com.bernardomg.tabletop.palette.palette.service;

import static com.google.common.base.Preconditions.checkNotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.palette.model.data.PaletteGroupData;
import com.bernardomg.tabletop.palette.palette.model.form.PaletteGroupCreationForm;
import com.bernardomg.tabletop.palette.palette.model.persistence.PaletteGroup;
import com.bernardomg.tabletop.palette.palette.repository.PaletteGroupRepository;

@Service
public final class DefaultPaletteGroupService implements PaletteGroupService {

    private static final Logger          LOGGER = LoggerFactory
            .getLogger(DefaultPaletteGroupService.class);

    private final PaletteGroupRepository paletteGroupRepository;

    @Autowired
    public DefaultPaletteGroupService(
            final PaletteGroupRepository groupRepository) {
        super();

        paletteGroupRepository = checkNotNull(groupRepository,
                "The repository is required");
    }

    @Override
    public final PaletteGroupData
            saveGroup(final PaletteGroupCreationForm group) {
        final PaletteGroup entity;
        final PaletteGroup saved;
        final PaletteGroupData result;

        if ((group.getName() != null) && (!group.getName().isEmpty())) {
            entity = new PaletteGroup();
            entity.setName(group.getName());

            saved = paletteGroupRepository.save(entity);

            result = new PaletteGroupData();
            result.setName(saved.getName());
        } else {
            result = null;
        }

        return result;
    }

}
