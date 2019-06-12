var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
        this.element.appendChild(column.element);
        initSortable(column.element.parentNode, 'kanban');
    },

    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
    var name = prompt('Enter a column name');
    var data = new FormData();

    data.append('name', name);

    fetch(prefix + baseUrl + '/column', {
        method: 'POST',
        headers: myHeaders,
        body: data,
        })
        .then(function(resp) {
        return resp.json();
        })
        .then(function(resp) {
        var column = new Column(resp.id, name);
        board.addColumn(column);
        });
});

function initSortable(el, groupName) {
    var sortable = Sortable.create(el, {
        group: groupName,
        sort: true,
        animation: 150,
        onAdd: function(e) {

            var cardId = parseInt(e.item.id)
            var cardName = e.item.innerText
            var columnId = parseInt(e.to.id)

            fetch(prefix + baseUrl + '/card/' + cardId, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify({ name: cardName, bootcamp_kanban_column_id: columnId }),
            })

        }
    });
}

