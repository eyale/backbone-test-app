// model - is data

var Blog = Backbone.Model.extend({
  defaults: {
    author: 'New Author',
    title: 'New Title',
    url: 'New URL'
  }
});

//collection - is Array of models

var Blogs = Backbone.Collection.extend({
});
var blogs = new Blogs();

// Backbone view for one blog

var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function() {
     this.template = _.template($('.blogs-list-template').html())
  },
  render: function() {
     this.$el.html(this.template(this.model.toJSON()));
     return this;
  }

});

// Backbone view for all blogs

var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function() {
    var that = this;
     this.model.on('add', this.render, this);
  },
  render: function() {
    var that = this;
     this.$el.html('');
     _.each(this.model.toArray(), function(blog) {
        that.$el.append((new BlogView({model: blog})).render().$el);
     });
     return this;
  }

});

var blogsView = new BlogsView();

$(document).ready(function() {
  $('.add-blog').on('click', function() {
     var blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
     });
     $('.author-input').val('');
     $('.title-input').val('');
     $('.url-input').val('');
     blogs.add(blog);
  })
});