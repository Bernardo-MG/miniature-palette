
package com.bernardomg.tabletop.palette.palette.service;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.palette.model.PaintOption;
import com.bernardomg.tabletop.palette.palette.model.PaletteGroup;
import com.bernardomg.tabletop.palette.palette.model.PaletteOption;
import com.bernardomg.tabletop.palette.palette.model.persistence.Paint;
import com.bernardomg.tabletop.palette.palette.model.persistence.Palette;
import com.bernardomg.tabletop.palette.palette.repository.PaintRepository;
import com.bernardomg.tabletop.palette.palette.repository.PaletteRepository;

@Service
public final class DefaultPaletteService implements PaletteService {

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
    public final void save(final PaletteGroup paletteGroup) {
        checkNotNull(paletteGroup, "No palettes received");

        StreamSupport.stream(paletteGroup.getPalettes().spliterator(), false)
                .forEach(this::save);
    }

    private final void save(final PaletteOption palette) {
        final Palette entity;
        final Palette saved;
        final Collection<Paint> paintEntities;

        entity = toEntity(palette);

        saved = paletteRepository.save(entity);

        paintEntities = StreamSupport
                .stream(palette.getPaints().spliterator(), false)
                .map(this::toEntity).collect(Collectors.toList());
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
