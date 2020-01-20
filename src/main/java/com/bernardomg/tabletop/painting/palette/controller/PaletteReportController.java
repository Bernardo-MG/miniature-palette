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

package com.bernardomg.tabletop.painting.palette.controller;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.tabletop.painting.palette.service.PaletteService;

/**
 * Rest controller for palettes.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RestController
@RequestMapping("/report/palette")
public class PaletteReportController {

    /**
     * Default report file name.
     */
    private static final String  FILENAME = "Report";

    /**
     * Palette service.
     */
    private final PaletteService paletteService;

    /**
     * Constructs a controller.
     * 
     * @param service
     *            example entity service
     */
    @Autowired
    public PaletteReportController(final PaletteService service) {
        super();

        paletteService = checkNotNull(service, "The service is required");
    }

    @GetMapping(path = "/{id:\\d*}")
    public void getReport(final HttpServletRequest request,
            final HttpServletResponse response, @PathVariable final Long id)
            throws IOException {
        final OutputStream output;

        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        response.setHeader("Content-disposition",
                String.format("inline; filename=%s.pdf", FILENAME));

        output = response.getOutputStream();

        paletteService.getReport(id, output);
    }

}
