
package com.bernardomg.tabletop.palette.palette.model;

import java.util.ArrayList;
import java.util.Objects;

import com.google.common.base.MoreObjects;

public class PaletteOption {

    private String                name;

    private Iterable<PaintOption> paints = new ArrayList<>();

    public PaletteOption() {
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

        final PaletteOption other = (PaletteOption) obj;
        return Objects.equals(name, other.name);
    }

    public String getName() {
        return name;
    }

    public Iterable<PaintOption> getPaints() {
        return paints;
    }

    @Override
    public final int hashCode() {
        return Objects.hash(name);
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setPaints(final Iterable<PaintOption> paints) {
        this.paints = paints;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name)
                .add("paints", paints).toString();
    }

}
