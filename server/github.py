from github3 import GitHub

class IssueTracker(GitHub):
  """docstring for GitHub"""
  def __init__(self, username, password, remote="robinandeer", repo="scout"):

    super(IssueTracker, self).__init__(username, password)

    self.remote = remote
    self.repo = repo
    self.id = self.user().id

  def create(self, title, body):
    return self.create_issue(self.remote, self.repo, title, body)

  def find(self, num=None):
    if num:
      return self.issue(self.remote, self.repo, num)

    else:
      # Fetch all remote issues (issued by "clinican")
      return [issue for issue in self.iter_repo_issues(self.remote, self.repo)]
