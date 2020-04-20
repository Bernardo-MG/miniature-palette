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

import java.io.OutputStream;

import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.bernardomg.tabletop.painting.palette.model.form.PaletteUpdateForm;

/**
 * Service for palettes.
 *
 * @author Bernardo Mart&iacute;nez Garrido
 */
public interface PaletteService {

    public Boolean deletePalette(final Long id);

    public void getReport(final Long id, final OutputStream output);

    public PaletteData updatePalette(final PaletteUpdateForm palette);

}
