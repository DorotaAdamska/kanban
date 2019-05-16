function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.element = generateTemplate('column-template', { name: this.name });
    initSortable(this.element.querySelector('ul') , 'card');
    this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete') || event.target.classList.contains('fa-times')) {
            self.removeColumn();
        }
        if (event.target.classList.contains('add-card')) {
            self.addCard(new Card(prompt("Enter the name of the card")));
        }
    });
}

Column.prototype = {
    addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
    },
    
    removeColumn: function() {
        this.element.parentNode.removeChild(this.element);
    }
};