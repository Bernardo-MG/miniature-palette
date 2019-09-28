
package com.bernardomg.tabletop.palette.product.service;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.product.model.ProductOption;
import com.bernardomg.tabletop.palette.product.model.persistence.Product;
import com.bernardomg.tabletop.palette.product.repository.ProductRepository;

@Service
public final class DefaultProductService implements ProductService {

    private final ProductRepository paintRepository;

    @Autowired
    public DefaultProductService(final ProductRepository repository) {
        super();

        paintRepository = checkNotNull(repository,
                "The paint repository is required");
    }

    @Override
    public final Iterable<ProductOption> getAll() {
        final Iterable<Product> paints;
        final Iterable<ProductOption> options;

        paints = paintRepository.findAll();

        options = StreamSupport.stream(paints.spliterator(), false)
                .map(this::toPaintOption).collect(Collectors.toList());

        return options;
    }

    private final ProductOption toPaintOption(final Product paint) {
        final ProductOption option;

        option = new ProductOption();
        option.setName(paint.getName());
        option.setCode(paint.getCode());

        return option;
    }

}
