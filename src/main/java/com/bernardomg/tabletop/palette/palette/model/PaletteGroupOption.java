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

package com.bernardomg.tabletop.palette.palette.model;

import java.util.ArrayList;
import java.util.Objects;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.google.common.base.MoreObjects;

public class PaletteGroupOption {

    @NotNull
    @Min(1)
    @Max(50)
    private String                  name;

    private Iterable<PaletteOption> palettes = new ArrayList<>();

    public PaletteGroupOption() {
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

        final PaletteGroupOption other = (PaletteGroupOption) obj;
        return Objects.equals(name, other.name);
    }

    public String getName() {
        return name;
    }

    public Iterable<PaletteOption> getPalettes() {
        return palettes;
    }

    @Override
    public final int hashCode() {
        return Objects.hash(name);
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setPalettes(final Iterable<PaletteOption> palettes) {
        this.palettes = palettes;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name)
                .add("palettes", palettes).toString();
    }

}
