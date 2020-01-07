
package com.bernardomg.tabletop.palette.palette.report;

import java.io.OutputStream;

import com.bernardomg.tabletop.palette.palette.model.persistence.Palette;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public final class PaletteReportPrinter implements ReportPrinter {

    /**
     * Chapter font.
     */
    private final Font chapterFont = FontFactory.getFont(FontFactory.HELVETICA,
            16, Font.BOLDITALIC);

    public PaletteReportPrinter() {
        super();
    }

    @Override
    public final void saveReport(final Palette data,
            final OutputStream output) {
        final Document document;
        final Paragraph header;

        document = new Document();
        try {
            PdfWriter.getInstance(document, output);
        } catch (final DocumentException e) {
            throw new RuntimeException(e);
        }
        document.open();

        header = getHeader();

        try {
            document.add(header);
        } catch (final DocumentException e) {
            throw new RuntimeException(e);
        }
        document.close();
    }

    /**
     * Builds the header paragraph.
     * 
     * @return the header paragraph
     */
    private final Paragraph getHeader() {
        final Chunk chunk;

        chunk = new Chunk("title", chapterFont);

        return new Paragraph(chunk);
    }

}
