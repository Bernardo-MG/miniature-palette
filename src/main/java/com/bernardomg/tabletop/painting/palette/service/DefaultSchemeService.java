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

package com.bernardomg.tabletop.painting.palette.service;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.palette.model.data.SchemeData;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeUpdateForm;
import com.bernardomg.tabletop.painting.palette.model.persistence.SchemeEntity;
import com.bernardomg.tabletop.painting.palette.repository.SchemeRepository;

@Service
public final class DefaultSchemeService implements SchemeService {

    private final SchemeRepository schemeRepository;

    @Autowired
    public DefaultSchemeService(final SchemeRepository schemeRepo) {
        super();

        schemeRepository = checkNotNull(schemeRepo,
                "The repository is required");
    }

    @Transactional
    @Override
    public final Boolean deleteScheme(final Long id) {
        Boolean result;

        try {
            schemeRepository.deleteById(id);
            result = true;
        } catch (final EmptyResultDataAccessException e) {
            result = false;
        }

        return result;
    }

    @Transactional(readOnly = true)
    @Override
    public final Iterable<SchemeData> getAllSchemes() {
        final List<SchemeEntity> allSchemes;

        allSchemes = schemeRepository.findAll();

        return toSchemeDatas(allSchemes);
    }

    @Transactional
    @Override
    public final SchemeData saveScheme(final SchemeCreationForm palette) {
        final SchemeEntity entity;
        final SchemeEntity saved;
        final SchemeData result;

        if ((palette.getName() != null) && (!palette.getName().isEmpty())) {
            entity = new SchemeEntity();
            entity.setName(palette.getName());

            saved = schemeRepository.save(entity);

            result = toSchemeDataSimple(saved);
        } else {
            result = null;
        }

        return result;
    }

    @Transactional
    @Override
    public final SchemeData updateScheme(final SchemeUpdateForm palette) {
        final SchemeEntity entity;
        final SchemeEntity saved;
        final SchemeData result;

        // TODO: Split palette update from paint update

        if ((palette.getName() != null) && (!palette.getName().isEmpty())
                && (palette.getId() != null)) {
            entity = new SchemeEntity();
            entity.setId(palette.getId());
            entity.setName(palette.getName());

            saved = schemeRepository.save(entity);

            result = toSchemeData(saved);
        } else {
            result = null;
        }

        return result;
    }

    private final SchemeData toSchemeData(final SchemeEntity palette) {
        final SchemeData option;

        option = new SchemeData();
        option.setId(palette.getId());
        option.setName(palette.getName());

        return option;
    }

    private final List<SchemeData>
            toSchemeDatas(final List<SchemeEntity> palettes) {
        return palettes.stream().map(this::toSchemeData)
                .collect(Collectors.toList());
    }

    private final SchemeData toSchemeDataSimple(final SchemeEntity palette) {
        final SchemeData option;

        option = new SchemeData();
        option.setId(palette.getId());
        option.setName(palette.getName());

        return option;
    }

}
