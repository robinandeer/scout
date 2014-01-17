# Bootstrap distribute unless already installed
from distribute_setup import use_setuptools
use_setuptools()

import os
import sys

from setuptools import setup, find_packages
import NAME

# Shortcut for publishing to Pypi
# Source: https://github.com/kennethreitz/tablib/blob/develop/setup.py
if sys.argv[-1] == "publish":
  os.system("python setup.py sdist upload")
  sys.exit()

setup(
  name = "projectname",
  version = NAME.__version__,
  packages = find_packages(exclude=["tests"]),
  scripts = [],

  # Project dependencies
  install_requires = [
    'github3',
    'flask',
    'flask_login',
    'flask_sqlalchemy',
    'flask_oauth',
    'requests',
    'arrow',
  ],

  # <optional-feature>: [<dependencies>]
  extras_require = {

  },

  # Packages required for testing
  tests_require = [
    "nose"
  ],

  # 'include_package_dat = True' or
  package_data = {
    # If any package contains *.txt or *.rst files, include them:
    "": ["*.txt", "*.rst"],
    # And include any *.msg files found in the 'hello' package, too:
    "hello": ["*.msg"]
  },

  # The project can be safely installed and run from a zip file
  zip_safe = False,

  # Metadate for upload to Pypi
  author = "<name>",
  author_email = "<email>",
  description = "<project-name>",
  long_description = (open('README.rst').read()),
  license = "MIT",
  keywords = "hello world example",
  url = "<project-url>",  # Project homepage or GitHub
  download_url = "<download-url>",
  classifiers = (
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Developers",
    "Natural Language :: English",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python"
  )
)
