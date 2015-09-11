/* ------------------------------------------------------------------------
 Class: freezeHeader
 Use:freeze header row in html table
 Example 1:  $('#tableid').freezeHeader();
 Example 2:  $('#tableid').freezeHeader({ height: 300 });
 Example 3:  $('table').freezeHeader();
 Example 4:  $('.table2').freezeHeader();
 Example 5:  $('#tableid').freezeHeader({ offset : 50 });
 Author(s): Laerte Mercier Junior, Larry A. Hendrix, D. Hirtzbruch
 Version: 1.0.8
 -------------------------------------------------------------------------*/
(function ($) {
    var TABLE_ID = 0;
    $.fn.freezeHeader = function (params) {

        var copiedHeader = false;
        var defaultParameters = {
            offset: 0,
            scrollOffset: 10,
            height: null,
            scrollListenerEl: null,
            headerClass: 'freezeHeader-head',
            bodyClass: 'freezeHeader-body',
            headerZIndex: 1050
        };

        params = $.extend({}, defaultParameters, params);

        console.debug(params);

        function freezeHeader(elem) {
            var idObj = elem.attr('id') || ('tbl-' + (++TABLE_ID));
            if (elem.length > 0 && elem[0].tagName.toLowerCase() == 'table') {

                var obj = {
                    id: idObj,
                    grid: elem,
                    container: null,
                    header: null,
                    divScroll: null,
                    scroller: null
                };

                if (params && params.height !== null) {
                    obj.divScroll = $('<div/>')
                        .attr('id', 'hdScroll' + obj.id)
                        .css({
                            height: params.height + 'px',
                            overflowY: 'scroll'
                        })
                        .addClass(params.bodyClass);
                }

                obj.header = obj.grid.find('thead');

                if (params && params.height !== null) {
                    if ($('#hdScroll' + obj.id).length == 0) {
                        obj.grid.wrapAll(obj.divScroll);
                    }
                }

                obj.scroller = params && params.height !== null
                    ? $('#hdScroll' + obj.id)
                    : $(window);

                if (params && params.scrollListenerEl !== null) {
                    obj.scroller = params.scrollListenerEl;
                }
                obj.scroller.on('scroll', function () {
                    var id = 'hd' + obj.id;
                    if ($('#' + id).length == 0) {
                        obj.grid.before(
                            $('<div/>')
                                .attr('id', id)
                                .addClass(params.headerClass)
                        );
                    }

                    obj.container = $('#' + id);

                    if (obj.header.offset() != null) {
                        if (limitReached(obj, params)) {
                            if (!copiedHeader) {
                                cloneHeaderRow(obj);
                                copiedHeader = true;
                            }
                        }
                        else {

                            if (($(document).scrollTop() > obj.header.offset().top)) {
                                obj.container.css({
                                    position: 'absolute',
                                    top: (obj.grid.find('tr:last').offset().top - obj.header.height()) + 'px',
                                    zIndex: params.headerZIndex
                                });
                            }
                            else {
                                obj.container.css({
                                    visibility: 'hidden',
                                    top: 0,
                                    zIndex: params.headerZIndex
                                });
                                obj.container.width(0);
                            }
                            copiedHeader = false;
                        }
                    }

                });
            }
        }

        function limitReached(obj, params) {
            if (params && (params.height !== null || params.scrollListenerEl !== null)) {
                return (obj.header.offset().top <= obj.scroller.offset().top);
            }
            else {
                return ($(document).scrollTop() > obj.header.offset().top && $(document).scrollTop() < (obj.grid.height() - obj.header.height() - obj.grid.find('tr:last').height()) + obj.header.offset().top);
            }
        }

        function cloneHeaderRow(obj) {
            obj.container.html('');
            obj.container.val('');
            var tabela = $('<table style="margin: 0 0;"></table>');
            var atributos = obj.grid.prop('attributes');

            $.each(atributos, function () {
                if (this.name != 'id') {
                    tabela.attr(this.name, this.value);
                }
            });

            tabela.append('<thead>' + obj.header.html() + '</thead>');

            obj.container.append(tabela);
            obj.container.width(obj.header.width());
            obj.container.height(obj.header.height);
            obj.container.find('th').each(function (index) {
                var cell = obj.grid.find('th').eq(index);
                $(this).css('width', cell.width());
            });

            obj.container.css('visibility', 'visible');

            if (params && params.height !== null) {

                if (params.offset !== null) {
                    obj.container.css('top', obj.scroller.offset().top + (params.offset * 1) + 'px');
                }
                else {
                    obj.container.css('top', obj.scroller.offset().top + 'px');
                }

                obj.container.css('position', 'absolute');

            } else if (params && params.scrollListenerEl !== null) {
                obj.container.css({
                    top: obj.scroller.find('thead > tr').innerHeight() + 'px',
                    position: 'absolute',
                    zIndex: 2
                });
            } else {
                obj.container.css({
                    top: params.offset + 'px',
                    position: 'fixed',
                });
            }
        }

        return this.each(function (i, e) {
            freezeHeader($(e));
        });
    };
})(jQuery);
