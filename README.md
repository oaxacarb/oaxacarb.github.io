# Oaxaca Ruby User Group Website

## General information

This website is powered by [Middleman](http://middlemanapp.com).

## How to build the website?

- Clone the repository
- Change to **source** branch

```bash
git checkout source
```

- Install all the dependencies

```bash
bundle install
```

- Run the server and visit http://localhost:4567

```bash
gem install foreman
foreman start -f Procfile.dev
```

- To deploy the site:

```bash
middleman deploy
```
