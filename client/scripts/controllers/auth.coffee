App.AuthController = Ember.Controller.extend
  user_id: null

  user: (->
    if @get('user_id')
      return App.User.find @get('user_id')
    else
      return null
  ).property 'user_id'
