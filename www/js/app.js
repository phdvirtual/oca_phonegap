App = Ember.Application.create({
  appname: "Oca do Açaí"
});

App.Router.map(function() {
  // put your routes here
  this.resource("lojas", { path: 'lojas' }, function(){
    this.route('show', { path: '/:loja_id' } )
  });
  this.resource("distribuidor", { path: 'distribuidor' }, function(){
    this.route('show', { path: '/:loja_id' } )
  });
  this.resource("revendedor", { path: 'revendedor' }, function(){
    this.route('show', { path: '/:loja_id' } )
  });
});

function getList() {
 return $.getJSON('http://oca-admin.herokuapp.com/clients/index.json',
    function(data) {
      console.log(data);
      return data;
    }
  )
};
function getRevendedor(){
  return $.getJSON('http://oca-admin.herokuapp.com/categories/2.json',
    function(data) {
      console.log(data);
      return data;
    }
  )
};
function getDistribuidor(){
  return $.getJSON('http://oca-admin.herokuapp.com/categories/1.json',
    function(data) {
      console.log(data);
      return data;
    }
  )
}


App.IndexRoute = Ember.Route.extend({
  model: function() {
    return getList();
  },
  title: "Lista de lojas"
});

App.LojasRoute = Ember.Route.extend({
  model: function() {
    return getList();
  }
});

App.RevendedorRoute = Ember.Route.extend({
  model: function() {
    return getRevendedor();
  }
});

App.DistribuidorRoute = Ember.Route.extend({
  model: function() {
    return getDistribuidor();
  }
});
