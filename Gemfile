source "https://rubygems.org"

ruby ">= 3.1"

gem "jekyll", "~> 4.4"
gem "jekyll-paginate", "~> 1.1"
gem "webrick", "~> 1.8"

# GitHub Actions currently resolves json 2.19.x, which breaks native gem
# builds on the Pages workflow with `NameError: uninitialized constant JSON::Fragment`.
gem "json", "< 2.10"
