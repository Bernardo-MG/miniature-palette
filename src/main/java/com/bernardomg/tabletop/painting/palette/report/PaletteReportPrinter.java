
package com.bernardomg.tabletop.painting.palette.report;

import java.io.OutputStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import com.bernardomg.tabletop.painting.palette.model.data.PaintData;
import com.bernardomg.tabletop.painting.palette.model.data.PaletteData;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public final class PaletteReportPrinter implements ReportPrinter<PaletteData> {

    /**
     * Chapter font.
     */
    private final Font chapterFont = FontFactory.getFont(FontFactory.HELVETICA,
            16, Font.BOLDITALIC);

    public PaletteReportPrinter() {
        super();
    }

    @Override
    public final void saveReport(final PaletteData data,
            final OutputStream output) {
        final Document document;
        final Paragraph header;
        final Paragraph paints;

        document = new Document();
        try {
            PdfWriter.getInstance(document, output);
        } catch (final DocumentException e) {
            throw new RuntimeException(e);
        }
        document.open();

        header = getHeader(data.getName());
        paints = getPaints(data.getPaints());

        try {
            document.add(header);
            document.add(paints);
        } catch (final DocumentException e) {
            throw new RuntimeException(e);
        }
        document.close();
    }

    /**
     * Paragraph font.
     */
    private final Font paragraphFont = FontFactory
            .getFont(FontFactory.HELVETICA, 12, Font.NORMAL);

    /**
     * Builds the affinities paragraph.
     * 
     * @param affinities
     *            sponsor affinities
     * @param additional
     *            additional affinities
     * @return the affinities paragraph
     */
    private final Paragraph getPaints(final Iterable<PaintData> paints) {
        final Paragraph paragraph;
        final PdfPTable table;

        paragraph = new Paragraph();

        paragraph.add(new Paragraph(" ", paragraphFont));

        table = new PdfPTable(1);
        paragraph.add(table);

        // Adds headers
        Stream.of("paints").forEach(columnTitle -> {
            final PdfPCell header = new PdfPCell();
            header.setBackgroundColor(BaseColor.LIGHT_GRAY);
            header.setBorderWidth(2);
            header.setPhrase(new Phrase(columnTitle));
            table.addCell(header);
        });

        StreamSupport.stream(paints.spliterator(), false).forEach((paint) -> {
            table.addCell(paint.getName());
        });

        return paragraph;
    }

    /**
     * Builds the header paragraph.
     * 
     * @return the header paragraph
     */
    private final Paragraph getHeader(final String title) {
        final Chunk chunk;

        chunk = new Chunk(title, chapterFont);

        return new Paragraph(chunk);
    }

}
