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
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.palette.model.PaintForm;
import com.bernardomg.tabletop.palette.palette.model.PaintOption;
import com.bernardomg.tabletop.palette.palette.model.PaletteCreationForm;
import com.bernardomg.tabletop.palette.palette.model.PaletteOption;
import com.bernardomg.tabletop.palette.palette.model.PaletteUpdateForm;
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
    public final Iterable<PaletteOption> getAllPalettes() {
        final List<Palette> allPalettes;
        final Collection<Long> paletteIds;
        final Collection<Paint> allPaints;
        final Map<Long, List<PaintOption>> palettePaintOptions;

        allPalettes = paletteRepository.findAll();
        paletteIds = allPalettes.stream().map(Palette::getId)
                .collect(Collectors.toList());

        allPaints = paintRepository.findAllByPaletteIdIn(paletteIds);

        palettePaintOptions = getPaintOptions(allPaints);

        // TODO Auto-generated method stub
        return toPaletteOptions(allPalettes, palettePaintOptions);
    }

    @Override
    public final void savePalette(final PaletteCreationForm palette) {
        final Palette entity;
        final Palette saved;
        final Collection<Paint> paintEntities;

        if ((palette.getName() != null) && (!palette.getName().isEmpty())) {
            entity = new Palette();
            entity.setName(palette.getName());

            saved = paletteRepository.save(entity);

            // Paints are mapped to entities
            paintEntities = StreamSupport
                    .stream(palette.getPaints().spliterator(), false)
                    .filter((p) -> StringUtils.isNotBlank(p.getName()))
                    .map(this::toEntity).collect(Collectors.toList());
            // The palette id is set
            paintEntities.stream()
                    .forEach((p) -> p.setPaletteId(saved.getId()));

            paintRepository.saveAll(paintEntities);
        }
    }

    @Override
    public final void updatePalette(final PaletteUpdateForm palette) {
        final Palette entity;
        final Palette saved;
        final Collection<Paint> paintEntities;

        entity = new Palette();
        entity.setId(palette.getId());
        entity.setName(palette.getName());

        saved = paletteRepository.save(entity);

        // TODO: Save paint ids

        // Paints are mapped to entities
        paintEntities = StreamSupport
                .stream(palette.getPaints().spliterator(), false)
                .filter((p) -> StringUtils.isNotBlank(p.getName()))
                .map(this::toEntity).collect(Collectors.toList());
        // The palette id is set
        paintEntities.stream().forEach((p) -> p.setPaletteId(saved.getId()));

        paintRepository.saveAll(paintEntities);
    }

    private final Map<Long, List<PaintOption>>
            getPaintOptions(final Collection<Paint> paints) {
        final Map<Long, List<Paint>> palettePaints;

        palettePaints = paints.stream()
                .collect(Collectors.groupingBy(Paint::getPaletteId));
        return palettePaints.entrySet().stream().collect(Collectors
                .toMap(Map.Entry::getKey, e -> toPaintOptions(e.getValue())));
    }

    private final Paint toEntity(final PaintForm paint) {
        final Paint entity;

        entity = new Paint();
        entity.setName(paint.getName());

        return entity;
    }

    private final PaintOption toPaintOption(final Paint paint) {
        final PaintOption option;

        option = new PaintOption();
        option.setId(paint.getId());
        option.setName(paint.getName());

        return option;
    }

    private final List<PaintOption> toPaintOptions(final List<Paint> paints) {
        return paints.stream().map(this::toPaintOption)
                .collect(Collectors.toList());
    }

    private final PaletteOption toPaletteOption(final Palette palette,
            final List<PaintOption> paintOptions) {
        final PaletteOption option;

        option = new PaletteOption();
        option.setId(palette.getId());
        option.setName(palette.getName());
        option.setPaints(paintOptions);

        return option;
    }

    private final List<PaletteOption> toPaletteOptions(
            final List<Palette> palettes,
            final Map<Long, List<PaintOption>> palettePaintOptions) {
        return palettes.stream()
                .map((p) -> toPaletteOption(p,
                        palettePaintOptions.getOrDefault(p.getId(),
                                Collections.emptyList())))
                .collect(Collectors.toList());
    }

}
