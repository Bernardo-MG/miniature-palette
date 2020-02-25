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

import java.io.OutputStream;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.painting.palette.model.data.PaintData;
import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.bernardomg.tabletop.painting.palette.model.form.PaintCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaintUpdateForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteCreationForm;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteUpdateForm;
import com.bernardomg.tabletop.painting.palette.model.persistence.PaintEntity;
import com.bernardomg.tabletop.painting.palette.model.persistence.PaletteEntity;
import com.bernardomg.tabletop.painting.palette.report.PaletteReportPrinter;
import com.bernardomg.tabletop.painting.palette.report.ReportPrinter;
import com.bernardomg.tabletop.painting.palette.repository.PaintRepository;
import com.bernardomg.tabletop.painting.palette.repository.PaletteRepository;

@Service
public final class DefaultPaletteService implements PaletteService {

    private static final Logger              LOGGER               = LoggerFactory
            .getLogger(DefaultPaletteService.class);

    private final PaintRepository            paintRepository;

    private final ReportPrinter<PaletteData> paletteReportPrinter = new PaletteReportPrinter();

    private final PaletteRepository          paletteRepository;

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
        final List<PaletteEntity> allPalettes;
        final Collection<Long> paletteIds;
        final Collection<PaintEntity> allPaints;
        final Map<Long, List<PaintData>> palettePaintOptions;

        allPalettes = paletteRepository.findAll();
        paletteIds = allPalettes.stream().map(PaletteEntity::getId)
                .collect(Collectors.toList());

        allPaints = paintRepository.findAllByPaletteIdIn(paletteIds);

        palettePaintOptions = getPaintData(allPaints);

        return toPaletteDatas(allPalettes, palettePaintOptions);
    }

    @Override
    public final void getReport(final Long id, final OutputStream output) {
        final PaletteEntity palette;
        final PaletteData data;
        final Collection<PaintEntity> paints;

        palette = paletteRepository.getOne(id);
        paints = paintRepository.findAllByPaletteId(id);

        data = toPaletteDataSimple(palette, paints);
        paletteReportPrinter.saveReport(data, output);
    }

    @Override
    public final PaletteData savePalette(final PaletteCreationForm palette) {
        final PaletteEntity entity;
        final PaletteEntity saved;
        final Collection<PaintEntity> paintEntities;
        final Collection<PaintEntity> savedPaints;
        final PaletteData result;

        if ((palette.getName() != null) && (!palette.getName().isEmpty())) {
            entity = new PaletteEntity();
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

            result = toPaletteDataSimple(saved, savedPaints);
        } else {
            result = null;
        }

        return result;
    }

    @Override
    public final PaletteData updatePalette(final PaletteUpdateForm palette) {
        final PaletteEntity entity;
        final PaletteEntity saved;
        final Collection<PaintEntity> deletedPaints;
        final Collection<PaintEntity> paintEntities;
        final Collection<PaintEntity> savedPaints;
        final PaletteData result;
        final Iterable<PaintData> palettePaintOptions;

        // TODO: Split palette update from paint update

        if ((palette.getName() != null) && (!palette.getName().isEmpty())
                && (palette.getId() != null)) {
            entity = new PaletteEntity();
            entity.setId(palette.getId());
            entity.setName(palette.getName());

            saved = paletteRepository.save(entity);

            deletedPaints = deletedPaints(palette);
            paintRepository.deleteAll(deletedPaints);

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

    private final Collection<PaintEntity>
            deletedPaints(final PaletteUpdateForm palette) {
        final Collection<PaintEntity> existingPaints;
        final Collection<Long> paintIds;

        paintIds = StreamSupport
                .stream(palette.getPaints().spliterator(), false)
                .map(PaintUpdateForm::getId).collect(Collectors.toList());

        existingPaints = paintRepository.findAllByPaletteId(palette.getId());
        return existingPaints.stream()
                .filter((p) -> !paintIds.contains(p.getId()))
                .collect(Collectors.toList());
    }

    private final Map<Long, List<PaintData>>
            getPaintData(final Collection<PaintEntity> paints) {
        final Map<Long, List<PaintEntity>> palettePaints;

        palettePaints = paints.stream()
                .collect(Collectors.groupingBy(PaintEntity::getPaletteId));
        return palettePaints.entrySet().stream().collect(Collectors
                .toMap(Map.Entry::getKey, e -> toPaintDatas(e.getValue())));
    }

    private final PaintEntity toPaint(final PaintCreationForm paint) {
        final PaintEntity entity;

        entity = new PaintEntity();
        entity.setName(paint.getName());

        return entity;
    }

    private final PaintEntity toPaint(final PaintUpdateForm paint) {
        final PaintEntity entity;

        entity = new PaintEntity();
        entity.setId(paint.getId());
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

    private final List<PaintData> toPaintDatas(final List<PaintEntity> paints) {
        return paints.stream().map(this::toPaintData)
                .collect(Collectors.toList());
    }

    private final PaletteData toPaletteData(final PaletteEntity palette,
            final Iterable<PaintData> paintOptions) {
        final PaletteData option;

        option = new PaletteData();
        option.setId(palette.getId());
        option.setName(palette.getName());
        option.setPaints(paintOptions);

        return option;
    }

    private final List<PaletteData> toPaletteDatas(
            final List<PaletteEntity> palettes,
            final Map<Long, List<PaintData>> palettePaintOptions) {
        return palettes.stream()
                .map((p) -> toPaletteData(p,
                        palettePaintOptions.getOrDefault(p.getId(),
                                Collections.emptyList())))
                .collect(Collectors.toList());
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

}
