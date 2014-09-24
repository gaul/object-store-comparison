function setup_column_toggle() {
  // get column headings, add to filter button
  $.each($("#objectstores thead tr th"), function(i, elem) {
    $("#filter-dropdown ul").append(
      $('<li>', {class: "active"}).append(
        $('<a>', {href: "javascript:;"})
          .text($(elem).text())
          .click(function(e) {
            toggle_column(i);
            $(this).parent().toggleClass("active");
            $(this).blur(); // prevent focus style from sticking in Firefox
            e.stopPropagation(); // keep dropdown menu open
          })
      )
    );
  });
}

function toggle_column(col_index) {
  var table = $('#objectstores').dataTable();
  var is_visible = table.fnSettings().aoColumns[col_index].bVisible;
  table.fnSetColumnVis(col_index, is_visible ? false : true);
}

$(document).ready(function() {
    setup_column_toggle();
    $('#objectstores').dataTable( {
      "aoColumns": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { "asSorting": [ "desc", "asc" ] },
        { "asSorting": [ "desc", "asc" ] },
        { "asSorting": [ "desc", "asc" ] },
        null,
        null,
        null,
      ],
      "bPaginate": false,
      "bInfo": false,
      "columnDefs": [
        {
          "targets": 12,
          "orderable": false
        },
        {
          "targets": [ 3, 4, 5, 6, 10, 11, 12 ],
          "visible": false
        }
      ],
      "initComplete": function() {
          var table = $('#objectstores').dataTable();
          $.each($("#filter-dropdown ul li a"), function(col_index) {
            var is_visible = table.fnSettings().aoColumns[col_index].bVisible;
            if (!is_visible) {
                $(this).parent().toggleClass("active");
            }
          });
      }
    } );
} );
