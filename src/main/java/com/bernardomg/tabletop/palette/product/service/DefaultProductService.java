
package com.bernardomg.tabletop.palette.product.service;

import static com.google.common.base.Preconditions.checkNotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.product.model.ProductOption;
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
        return paintRepository.findAllOptions();
    }

}
