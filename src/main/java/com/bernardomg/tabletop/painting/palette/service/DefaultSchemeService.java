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

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.painting.palette.model.data.PaintData;
import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.bernardomg.tabletop.painting.palette.model.data.SchemeData;
import com.bernardomg.tabletop.painting.palette.model.form.PaintCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.SchemeUpdateForm;
import com.bernardomg.tabletop.painting.palette.model.persistence.PaintEntity;
import com.bernardomg.tabletop.painting.palette.model.persistence.PaletteEntity;
import com.bernardomg.tabletop.painting.palette.model.persistence.SchemeEntity;
import com.bernardomg.tabletop.painting.palette.repository.PaintRepository;
import com.bernardomg.tabletop.painting.palette.repository.PaletteRepository;
import com.bernardomg.tabletop.painting.palette.repository.SchemeRepository;

@Service
public final class DefaultSchemeService implements SchemeService {

    private final PaintRepository   paintRepository;

    private final PaletteRepository paletteRepository;

    private final SchemeRepository  schemeRepository;

    @Autowired
    public DefaultSchemeService(final SchemeRepository schemeRepo,
            final PaletteRepository paletteRepo,
            final PaintRepository paintRepo) {
        super();

        schemeRepository = checkNotNull(schemeRepo,
                "The repository is required");
        paletteRepository = checkNotNull(paletteRepo,
                "The repository is required");
        paintRepository = checkNotNull(paintRepo, "The repository is required");
    }

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

    @Override
    public final Iterable<SchemeData> getAllSchemes() {
        final List<SchemeEntity> allSchemes;

        allSchemes = schemeRepository.findAll();

        return toSchemeDatas(allSchemes);
    }

    @Override
    public final SchemeData saveScheme(final SchemeCreationForm form) {
        final SchemeEntity entity;
        final SchemeEntity saved;
        final SchemeData result;
        final Collection<PaletteData> savedPalettes;
        PaletteData savePalette;

        if ((form.getName() != null) && (!form.getName().isEmpty())) {
            entity = new SchemeEntity();
            entity.setName(form.getName());

            saved = schemeRepository.save(entity);

            savedPalettes = new ArrayList<>();

            // TODO: Save all at once
            for (final PaletteCreationForm palette : form.getPalettes()) {
                palette.setScheme(saved.getId());
                savePalette = savePalette(saved, palette);
                savedPalettes.add(savePalette);
            }

            result = toSchemeDataSimple(saved);
            result.setPalettes(savedPalettes);
        } else {
            result = null;
        }

        return result;
    }

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

    private final PaletteData savePalette(final SchemeEntity scheme,
            final PaletteCreationForm palette) {
        final PaletteEntity entity;
        final PaletteEntity saved;
        final Collection<PaintEntity> paintEntities;
        final Collection<PaintEntity> savedPaints;
        final PaletteData result;

        if ((palette.getName() != null) && (!palette.getName().isEmpty())) {
            entity = new PaletteEntity();
            entity.setScheme(scheme);
            entity.setName(palette.getName());

            saved = paletteRepository.save(entity);

            // Paints are mapped to entities
            paintEntities = StreamSupport
                    .stream(palette.getPaints().spliterator(), false)
                    .filter((p) -> StringUtils.isNotBlank(p.getName()))
                    .map(this::toPaint).collect(Collectors.toList());
            // The palette id is set
            paintEntities.stream().forEach((p) -> p.setPalette(saved));

            savedPaints = paintRepository.saveAll(paintEntities);

            result = toPaletteDataSimple(saved, savedPaints);
        } else {
            result = null;
        }

        return result;
    }

    private final PaintEntity toPaint(final PaintCreationForm paint) {
        final PaintEntity entity;

        entity = new PaintEntity();
        entity.setName(paint.getName());

        return entity;
    }

    private final PaintData toPaintData(final PaintEntity paint) {
        final PaintData option;

        option = new PaintData();
        option.setId(paint.getId());
        option.setName(paint.getName());

        return option;
    }

    private final PaletteData toPaletteDataSimple(final PaletteEntity palette) {
        final PaletteData option;
        final Iterable<PaintData> paintOptions;

        paintOptions = palette.getPaints().stream().map(this::toPaintData)
                .collect(Collectors.toList());

        option = new PaletteData();
        option.setId(palette.getId());
        option.setName(palette.getName());
        option.setPaints(paintOptions);

        return option;
    }

    private final PaletteData toPaletteDataSimple(final PaletteEntity palette,
            final Collection<PaintEntity> paints) {
        final PaletteData option;
        final Iterable<PaintData> paintOptions;

        paintOptions = paints.stream().map(this::toPaintData)
                .collect(Collectors.toList());

        option = new PaletteData();
        option.setId(palette.getId());
        option.setName(palette.getName());
        option.setPaints(paintOptions);

        return option;
    }

    private final SchemeData toSchemeData(final SchemeEntity scheme) {
        final SchemeData option;
        final Iterable<PaletteData> palettes;

        option = new SchemeData();
        option.setId(scheme.getId());
        option.setName(scheme.getName());

        palettes = scheme.getPalettes().stream().map(this::toPaletteDataSimple)
                .collect(Collectors.toList());

        option.setPalettes(palettes);

        return option;
    }

    private final List<SchemeData>
            toSchemeDatas(final List<SchemeEntity> schemes) {
        return schemes.stream().map(this::toSchemeData)
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
