var prefix = "https://cors-anywhere.herokuapp.com/";
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': 'X-Client-Id',
  'X-Auth-Token': 'X-Auth-Token'
}; 

fetch(prefix + baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });
    
  function setupColumns(columns) {
    columns.forEach(function (column) {
          var col = new Column(column.id, column.name);
      board.addColumn(col);
      setupCards(col, column.cards);
    });
  }

  function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}

    
    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
        if (name == 'column-template'){
            element.classList.add('col-parent');
        }
    
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
        return element;
    }
    

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');
    
    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    
    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');
    
    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    
    
    
    