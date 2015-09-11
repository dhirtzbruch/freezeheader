/**
 *
 * Class: freezeHeader
 *
 * Use: freeze header row in html table
 *
 * Example 1:  $('#tableid').freezeHeader();
 * Example 2:  $('#tableid').freezeHeader({ height: 300 });
 * Example 3:  $('table').freezeHeader();
 * Example 4:  $('.table2').freezeHeader();
 * Example 5:  $('#tableid').freezeHeader({ offset : 50 });
 *
 * Author(s):
 * * Laerte Mercier Junior
 * * Larry A. Hendrix
 * * Daniel Hirtzbruch
 *
 * Version: 1.0.8
 *
 **/

(function ($) {
    var TABLE_ID = 0;
    $.fn.freezeHeader = function (params) {

        var defaultParameters = {
            offset: 0,
            scrollOffset: 0,
            height: null,
            scrollListenerElement: null,
            headerClass: 'freezeHeader-head',
            bodyClass: 'freezeHeader-body',
            headerZIndex: 1050
        };

        // merge given parameters with defaults
        params = $.extend({}, defaultParameters, params);

        var copiedHeader = false;

        // remove 'px' for backwards compatibility
        $.each(params, function (index, item) {
            if(params[item] === null || typeof params[item] !== 'string')
            {
                return true;
            }
            params[item] = parseInt(params[item].replace('px', ''));
        });

        function freezeHeader(elem) {
            var objectId = elem.attr('id') || ('tbl-' + (++TABLE_ID));
            if (elem.length > 0 && elem[0].tagName.toLowerCase() == 'table') {

                var object = {
                    id: objectId,
                    grid: elem,
                    container: null,
                    header: null,
                    divScroll: null,
                    scroller: null
                };

                if (params.height !== null) {
                    object.divScroll = $('<div/>')
                        .attr('id', 'hdScroll' + object.id)
                        .css({
                            height: params.height + 'px',
                            overflowY: 'scroll'
                        })
                        .addClass(params.bodyClass);
                }

                object.header = object.grid.find('thead');

                if (params.height !== null) {
                    if ($('#hdScroll' + object.id).length == 0) {
                        object.grid.wrapAll(object.divScroll);
                    }
                }

                object.scroller = params.height !== null
                    ? $('#hdScroll' + object.id)
                    : $(window);

                if (params.scrollListenerElement !== null) {
                    object.scroller = params.scrollListenerElement;
                }
                object.scroller.on('scroll', function () {
                    var id = 'hd' + object.id;
                    if ($('#' + id).length == 0) {
                        object.grid.before(
                            $('<div/>')
                                .attr('id', id)
                                .addClass(params.headerClass)
                        );
                    }

                    object.container = $('#' + id);

                    if (object.header.offset() != null) {
                        if (limitReached(object, params)) {
                            if (!copiedHeader) {
                                cloneHeaderRow(object);
                                copiedHeader = true;
                            }
                        }
                        else {

                            if (($(document).scrollTop() > object.header.offset().top - params.scrollOffset)) {
                                object.container.css({
                                    position: 'absolute',
                                    top: (object.grid.find('tr:last').offset().top - object.header.height()) + 'px',
                                    zIndex: params.headerZIndex
                                });
                            }
                            else {
                                object.container.css({
                                    visibility: 'hidden',
                                    top: 0,
                                    zIndex: params.headerZIndex
                                });
                                object.container.width(0);
                            }
                            copiedHeader = false;
                        }
                    }

                });
            }
        }

        function limitReached(object, params) {
            if (params.height !== null || params.scrollListenerElement !== null) {
                return (object.header.offset().top <= object.scroller.offset().top);
            }
            else {
                return ($(document).scrollTop() > object.header.offset().top - params.scrollOffset && $(document).scrollTop() < (object.grid.height() - object.header.height() - object.grid.find('tr:last').height()) + object.header.offset().top);
            }
        }

        function cloneHeaderRow(object) {
            object.container.html('');
            object.container.val('');
            var table = $('<table/>')
                .css({
                    margin: 0
                });
            var attributes = object.grid.prop('attributes');

            $.each(attributes, function () {
                if (this.name != 'id') {
                    table.attr(this.name, this.value);
                }
            });

            table.append('<thead>' + object.header.html() + '</thead>');

            object.container.append(table);
            object.container.width(object.header.width());
            object.container.height(object.header.height);
            object.container.find('th').each(function (index) {
                var cell = object.grid.find('th').eq(index);
                $(this).css('width', cell.width());
            });

            object.container.css('visibility', 'visible');

            if (params.height !== null) {

                if (params.offset !== null) {
                    object.container.css('top', params.offset + 'px');
                }

                object.container.css('position', 'absolute');

            } else if (params.scrollListenerElement !== null) {
                object.container.css({
                    top: object.scroller.find('thead > tr').innerHeight() + 'px',
                    position: 'absolute',
                    zIndex: 2
                });
            } else {
                object.container.css({
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
