
package com.bernardomg.tabletop.palette.palette.service;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Collection;
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

    private final PaletteRepository      paletteRepository;

    private final PaletteGroupRepository paletteGroupRepository;

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

}
