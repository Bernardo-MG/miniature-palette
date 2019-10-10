/**
 * Copyright 2018 the original author or authors
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

import com.bernardomg.tabletop.palette.palette.model.PaintOption;
import com.bernardomg.tabletop.palette.palette.model.PaletteGroupOption;
import com.bernardomg.tabletop.palette.palette.model.PaletteOption;
import com.bernardomg.tabletop.palette.palette.model.persistence.Paint;
import com.bernardomg.tabletop.palette.palette.model.persistence.Palette;
import com.bernardomg.tabletop.palette.palette.model.persistence.PaletteGroup;
import com.bernardomg.tabletop.palette.palette.repository.PaintRepository;
import com.bernardomg.tabletop.palette.palette.repository.PaletteGroupRepository;
import com.bernardomg.tabletop.palette.palette.repository.PaletteRepository;

@Service
public final class DefaultPaletteService implements PaletteService {

    private static final Logger          LOGGER = LoggerFactory
            .getLogger(DefaultPaletteService.class);

    private final PaintRepository        paintRepository;

    private final PaletteGroupRepository paletteGroupRepository;

    private final PaletteRepository      paletteRepository;

    @Autowired
    public DefaultPaletteService(final PaintRepository paintRepo,
            final PaletteRepository paletteRepo,
            final PaletteGroupRepository paletteGroupRepo) {
        super();

        paintRepository = checkNotNull(paintRepo, "The repository is required");
        paletteRepository = checkNotNull(paletteRepo,
                "The repository is required");
        paletteGroupRepository = checkNotNull(paletteGroupRepo,
                "The repository is required");
    }

    @Override
    public final Iterable<PaletteGroupOption> getAll() {
        final Collection<PaletteGroup> groups;
        final Collection<Integer> groupIds;
        final Collection<Palette> allPalettes;
        final Map<Integer, List<Palette>> groupPalettes;
        final Map<Integer, List<PaletteOption>> groupPaletteOptions;
        final Collection<Integer> paletteIds;
        final Collection<Paint> allPaints;
        final Map<Integer, List<Paint>> palettePaints;
        final Map<Integer, List<PaintOption>> palettePaintOptions;
        final Collection<PaletteGroupOption> result;

        groups = paletteGroupRepository.findAll();
        groupIds = groups.stream().map(PaletteGroup::getId)
                .collect(Collectors.toList());

        allPalettes = paletteRepository.findAllByGroupId(groupIds);
        paletteIds = allPalettes.stream().map(Palette::getId)
                .collect(Collectors.toList());

        allPaints = paintRepository.findAllByPaletteId(paletteIds);

        palettePaints = allPaints.stream()
                .collect(Collectors.groupingBy(Paint::getPaletteId));
        palettePaintOptions = palettePaints.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey,
                        e -> toPaintOptions(e.getValue())));

        groupPalettes = allPalettes.stream()
                .collect(Collectors.groupingBy(Palette::getGroupId));
        groupPaletteOptions = groupPalettes.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey,
                        e -> toPaletteOptions(e.getValue(),
                                palettePaintOptions)));

        result = groups.stream()
                .map((g) -> toPaletteGroupOption(g,
                        groupPaletteOptions.getOrDefault(g.getId(),
                                Collections.emptyList())))
                .collect(Collectors.toList());

        return result;
    }

    @Override
    public final void save(final PaletteGroupOption paletteGroup) {
        final PaletteGroup group;
        final PaletteGroup saved;

        checkNotNull(paletteGroup, "No palettes received");

        if (StringUtils.isNotBlank(paletteGroup.getName())) {
            group = new PaletteGroup();
            group.setName(paletteGroup.getName());

            saved = paletteGroupRepository.save(group);

            StreamSupport
                    .stream(paletteGroup.getPalettes().spliterator(), false)
                    .filter((p) -> StringUtils.isNotBlank(p.getName()))
                    .forEach((p) -> save(p, saved.getId()));
        } else {
            LOGGER.debug("Empty name. The Palette group is not saved");
        }
    }

    private final void save(final PaletteOption palette,
            final Integer groupId) {
        final Palette entity;
        final Palette saved;
        final Collection<Paint> paintEntities;

        entity = toEntity(palette);
        entity.setGroupId(groupId);

        saved = paletteRepository.save(entity);

        // Paints are mapped to entities
        paintEntities = StreamSupport
                .stream(palette.getPaints().spliterator(), false)
                .filter((p) -> StringUtils.isNotBlank(p.getName()))
                .map(this::toEntity).collect(Collectors.toList());
        // The palette id is set
        paintEntities.stream().forEach((p) -> p.setPaletteId(saved.getId()));

        paintRepository.saveAll(paintEntities);
    }

    private final Paint toEntity(final PaintOption paint) {
        final Paint entity;

        entity = new Paint();
        entity.setName(paint.getName());

        return entity;
    }

    private final Palette toEntity(final PaletteOption palette) {
        final Palette entity;

        entity = new Palette();
        entity.setName(palette.getName());

        return entity;
    }

    private final PaintOption toPaintOption(final Paint paint) {
        final PaintOption option;

        option = new PaintOption();
        option.setName(paint.getName());

        return option;
    }

    private final List<PaintOption> toPaintOptions(final List<Paint> paints) {
        return paints.stream().map(this::toPaintOption)
                .collect(Collectors.toList());
    }

    private final PaletteGroupOption toPaletteGroupOption(
            final PaletteGroup group,
            final Collection<PaletteOption> palettes) {
        final PaletteGroupOption option;

        option = new PaletteGroupOption();
        option.setName(group.getName());
        option.setPalettes(palettes);

        return option;
    }

    private final PaletteOption toPaletteOption(final Palette palette,
            final List<PaintOption> paintOptions) {
        final PaletteOption option;

        option = new PaletteOption();
        option.setName(palette.getName());
        option.setPaints(paintOptions);

        return option;
    }

    private final List<PaletteOption> toPaletteOptions(
            final List<Palette> palettes,
            final Map<Integer, List<PaintOption>> palettePaintOptions) {
        return palettes.stream()
                .map((p) -> toPaletteOption(p,
                        palettePaintOptions.getOrDefault(p.getId(),
                                Collections.emptyList())))
                .collect(Collectors.toList());
    }

}
