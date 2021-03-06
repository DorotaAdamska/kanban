function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });
    initSortable(this.element.querySelector('ul') , 'card');
    this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete') || event.target.classList.contains('fa-times')) {
            self.removeColumn();
        }
        if (event.target.classList.contains('add-card') || event.target.classList.contains('fa-plus-square')) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();

            var data = new FormData();
            data.append('name', cardName);
            data.append('bootcamp_kanban_column_id', self.id);

            fetch(prefix + baseUrl + '/card', {
                method: 'POST',
                headers: myHeaders,
                body: data,
              })
              .then(function(res) {
                return res.json();
              })
              .then(function(resp) {
                var card = new Card(resp.id, cardName);
                self.addCard(card);
              });  

        }
        if (event.target.classList.contains('btn-change') || event.target.classList.contains('fa-pen')) {
            var columnName = prompt("Enter new name of the column");
            if(columnName) {   

                fetch(prefix + baseUrl + '/column/' + self.id, {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify({ name: columnName }),
                })
                .then(function(resp) {
                    self.name = columnName;
                    self.element.querySelector('.column-title').innerText = self.name
                });  

            }
        }
    });
}

Column.prototype = {
    addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
    },
    
    removeColumn: function() {
        var self = this;
        fetch(prefix + baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
          .then(function(resp) {
            return resp.json();
          })
          .then(function(resp) {
            self.element.parentNode.removeChild(self.element);
          });
    },
}