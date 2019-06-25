function Card(id, name) {
    var self = this;
    
    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('card-template', { description: this.name }, 'li', this.id);
    this.element.querySelector('.card').addEventListener('click', function (event) {
        event.stopPropagation();
        
        if (event.target.classList.contains('btn-delete') || event.target.classList.contains('fa-times')) {
            self.removeCard();
        }
        if (event.target.classList.contains('btn-change') || event.target.classList.contains('fa-pen')) {
            var cardName = prompt("Enter new name of the card");
            if(cardName) {   

                fetch(prefix + baseUrl + '/card/' + self.id, {
                     method: 'PUT',
                     headers: myHeaders,
                     body: JSON.stringify({ 
                        name: cardName,
                        bootcamp_column_id: self.element.parentNode.id
                     }),
                })
                .then(function(resp) {
                    self.name = cardName;
                    self.element.querySelector('.card-description').innerText = self.name
                });  

            }
        }
    });
}

Card.prototype = {
    removeCard: function() {
        var self = this;

     fetch(prefix + baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
        .then(function(resp) {
        return resp.json();
        })
        .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
        })
    }
}
