
package com.bernardomg.tabletop.palette.palette.model;

import java.util.ArrayList;
import java.util.Objects;

import com.google.common.base.MoreObjects;

public class PaletteGroupOption {

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
