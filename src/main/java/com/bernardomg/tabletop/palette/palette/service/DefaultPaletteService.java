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

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.palette.model.data.PaintData;
import com.bernardomg.tabletop.palette.palette.model.data.PaletteData;
import com.bernardomg.tabletop.palette.palette.model.form.PaintCreationForm;
import com.bernardomg.tabletop.palette.palette.model.form.PaintUpdateForm;
import com.bernardomg.tabletop.palette.palette.model.form.PaletteCreationForm;
import com.bernardomg.tabletop.palette.palette.model.form.PaletteUpdateForm;
import com.bernardomg.tabletop.palette.palette.model.persistence.Paint;
import com.bernardomg.tabletop.palette.palette.model.persistence.Palette;
import com.bernardomg.tabletop.palette.palette.repository.PaintRepository;
import com.bernardomg.tabletop.palette.palette.repository.PaletteRepository;

@Service
public final class DefaultPaletteService implements PaletteService {

    private static final Logger     LOGGER = LoggerFactory
            .getLogger(DefaultPaletteService.class);

    private final PaintRepository   paintRepository;

    private final PaletteRepository paletteRepository;

    @Autowired
    public DefaultPaletteService(final PaintRepository paintRepo,
            final PaletteRepository paletteRepo) {
        super();

        paintRepository = checkNotNull(paintRepo, "The repository is required");
        paletteRepository = checkNotNull(paletteRepo,
                "The repository is required");
    }

    @Override
    public final Boolean deletePalette(final Long id) {
        Boolean result;

        try {
            paintRepository.deleteByPaletteId(id);
            paletteRepository.deleteById(id);
            result = true;
        } catch (final EmptyResultDataAccessException e) {
            result = false;
        }

        return result;
    }

    @Override
    public final Iterable<PaletteData> getAllPalettes() {
        final List<Palette> allPalettes;
        final Collection<Long> paletteIds;
        final Collection<Paint> allPaints;
        final Map<Long, List<PaintData>> palettePaintOptions;

        allPalettes = paletteRepository.findAll();
        paletteIds = allPalettes.stream().map(Palette::getId)
                .collect(Collectors.toList());

        allPaints = paintRepository.findAllByPaletteIdIn(paletteIds);

        palettePaintOptions = getPaintData(allPaints);

        return toPaletteDatas(allPalettes, palettePaintOptions);
    }

    @Override
    public final PaletteData savePalette(final PaletteCreationForm palette) {
        final Palette entity;
        final Palette saved;
        final Collection<Paint> paintEntities;
        final Collection<Paint> savedPaints;
        final PaletteData result;
        final Iterable<PaintData> palettePaintOptions;

        if ((palette.getName() != null) && (!palette.getName().isEmpty())) {
            entity = new Palette();
            entity.setName(palette.getName());

            saved = paletteRepository.save(entity);

            // Paints are mapped to entities
            paintEntities = StreamSupport
                    .stream(palette.getPaints().spliterator(), false)
                    .filter((p) -> StringUtils.isNotBlank(p.getName()))
                    .map(this::toPaint).collect(Collectors.toList());
            // The palette id is set
            paintEntities.stream()
                    .forEach((p) -> p.setPaletteId(saved.getId()));

            savedPaints = paintRepository.saveAll(paintEntities);

            palettePaintOptions = savedPaints.stream().map(this::toPaintData)
                    .collect(Collectors.toList());
            result = toPaletteData(saved, palettePaintOptions);
        } else {
            result = null;
        }

        return result;
    }

    @Override
    public final PaletteData updatePalette(final PaletteUpdateForm palette) {
        final Palette entity;
        final Palette saved;
        final Collection<Paint> paintEntities;
        final Collection<Paint> savedPaints;
        final PaletteData result;
        final Iterable<PaintData> palettePaintOptions;

        // TODO: Split palette update from paint update

        if ((palette.getName() != null) && (!palette.getName().isEmpty())
                && (palette.getId() != null)) {
            entity = new Palette();
            entity.setId(palette.getId());
            entity.setName(palette.getName());

            saved = paletteRepository.save(entity);

            // TODO: Save paint ids

            // Paints are mapped to entities
            paintEntities = StreamSupport
                    .stream(palette.getPaints().spliterator(), false)
                    .filter((p) -> StringUtils.isNotBlank(p.getName()))
                    .map(this::toPaint).collect(Collectors.toList());
            // The palette id is set
            paintEntities.stream()
                    .forEach((p) -> p.setPaletteId(saved.getId()));

            savedPaints = paintRepository.saveAll(paintEntities);

            palettePaintOptions = savedPaints.stream().map(this::toPaintData)
                    .collect(Collectors.toList());
            result = toPaletteData(saved, palettePaintOptions);
        } else {
            result = null;
        }

        return result;
    }

    private final Map<Long, List<PaintData>>
            getPaintData(final Collection<Paint> paints) {
        final Map<Long, List<Paint>> palettePaints;

        palettePaints = paints.stream()
                .collect(Collectors.groupingBy(Paint::getPaletteId));
        return palettePaints.entrySet().stream().collect(Collectors
                .toMap(Map.Entry::getKey, e -> toPaintDatas(e.getValue())));
    }

    private final Paint toPaint(final PaintCreationForm paint) {
        final Paint entity;

        entity = new Paint();
        entity.setName(paint.getName());

        return entity;
    }

    private final Paint toPaint(final PaintUpdateForm paint) {
        final Paint entity;

        entity = new Paint();
        entity.setId(paint.getId());
        entity.setName(paint.getName());

        return entity;
    }

    private final PaintData toPaintData(final Paint paint) {
        final PaintData option;

        option = new PaintData();
        option.setId(paint.getId());
        option.setName(paint.getName());

        return option;
    }

    private final List<PaintData> toPaintDatas(final List<Paint> paints) {
        return paints.stream().map(this::toPaintData)
                .collect(Collectors.toList());
    }

    private final PaletteData toPaletteData(final Palette palette,
            final Iterable<PaintData> paintOptions) {
        final PaletteData option;

        option = new PaletteData();
        option.setId(palette.getId());
        option.setName(palette.getName());
        option.setPaints(paintOptions);

        return option;
    }

    private final List<PaletteData> toPaletteDatas(final List<Palette> palettes,
            final Map<Long, List<PaintData>> palettePaintOptions) {
        return palettes.stream()
                .map((p) -> toPaletteData(p,
                        palettePaintOptions.getOrDefault(p.getId(),
                                Collections.emptyList())))
                .collect(Collectors.toList());
    }

}
