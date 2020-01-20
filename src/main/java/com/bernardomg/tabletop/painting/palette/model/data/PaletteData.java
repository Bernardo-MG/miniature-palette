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

package com.bernardomg.tabletop.painting.palette.model.data;

import java.util.ArrayList;
import java.util.Objects;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.google.common.base.MoreObjects;

public class PaletteData {

    private Long                id     = -1l;

    @NotNull
    @Size(min = 1, max = 50)
    private String              name;

    @Valid
    private Iterable<PaintData> paints = new ArrayList<>();

    public PaletteData() {
        super();
    }

    @Override
    public final boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }

        if (obj == null) {
            return false;
        }

        if (getClass() != obj.getClass()) {
            return false;
        }

        final PaletteData other = (PaletteData) obj;
        return Objects.equals(name, other.name);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Iterable<PaintData> getPaints() {
        return paints;
    }

    @Override
    public final int hashCode() {
        return Objects.hash(name);
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setPaints(final Iterable<PaintData> paints) {
        this.paints = paints;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name)
                .add("paints", paints).toString();
    }

}
