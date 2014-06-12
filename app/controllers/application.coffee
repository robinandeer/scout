module.exports = App.ApplicationController = Ember.ObjectController.extend
  # Objective: handle a single user object
  actions:
    toggleMenu: ->
      @toggleProperty('menuIsShowing')

      return no

    goToSettings: ->
      @transitionToRoute('settings')

    logout: ->
      window.location.replace '/logout'

  menuIsShowing: no
