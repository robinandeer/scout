# -*- coding: utf-8 -*-
from github3 import GitHub


class IssueTracker(GitHub):
  """docstring for GitHub"""
  def __init__(self, username=None, password=None, remote=None, repo=None):
    if username and password:
      self.setup(username, password)

    self.remote = remote
    self.repo = repo

  def init_app(self, app):
    # Authenticate
    username = app.config.get('GITHUB_USERNAME')
    password = app.config.get('GITHUB_PASSWORD')
    self.setup(username, password)

    self.remote = app.config.get('GITHUB_REMOTE')
    self.repo = app.config.get('GITHUB_REPO')
    self.id = self.user().id

    return self

  def setup(self, username, password):
    super(IssueTracker, self).__init__(username, password)

  def create(self, title, body):
    return self.create_issue(self.remote, self.repo, title, body)

  def find(self, num=None):
    if num:
      return self.issue(self.remote, self.repo, num)

    else:
      # Fetch all remote issues (issued by "clinican")
      return [issue for issue in self.iter_repo_issues(self.remote, self.repo)]
