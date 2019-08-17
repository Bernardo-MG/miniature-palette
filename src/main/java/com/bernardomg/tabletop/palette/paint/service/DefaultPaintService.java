
package com.bernardomg.tabletop.palette.paint.service;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.paint.model.PaintOption;
import com.bernardomg.tabletop.palette.paint.model.persistence.Paint;
import com.bernardomg.tabletop.palette.paint.repository.PaintRepository;

@Service
public final class DefaultPaintService implements PaintService {

    private final PaintRepository paintRepository;

    @Autowired
    public DefaultPaintService(final PaintRepository repository) {
        super();

        paintRepository = checkNotNull(repository,
                "The paint repository is required");
    }

    @Override
    public final Iterable<PaintOption> findByCode(final String code) {
        final Iterable<Paint> paints;
        final Iterable<PaintOption> options;

        paints = paintRepository.findByCodeContaining(code);

        options = StreamSupport.stream(paints.spliterator(), false)
                .map((p) -> new PaintOption()).collect(Collectors.toList());

        return options;
    }

}
