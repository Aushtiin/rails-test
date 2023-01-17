# README

## Assignment Details

There are 2 tasks to this assignment:

1. Fix the priority picker on the front end that updates the backend in real time.  It currently updates in the front end but does not persist in the backend.  (This is the little circle beside each Key Activity)
Video demo: https://drive.google.com/file/d/1v4vqNCs-_obXxv635fz9dT4szDW9WQEH/view?usp=sharing

Please refer to:
```
For the home components: app/javascript/domains//home/*
For individual components related to key activities: /app/javascript/components/domains/key-activities/*
```


2. Add a new sort in the current sort dropdown to allow for a sort that is based on "due date first and then priority"
Video demo: https://drive.google.com/file/d/1AEHufgA0RyASgQv64jE4oklU-7eoFd3Z/view?usp=sharing

Please refer to:
```
Front end components:
For components: /app/javascript/components/domains/key-activities/*

Backend portion: 
app/services/key_activity_resort_service.rb
spec/services/key_activity_resort_service_spec.rb
```

BONUS: point out and put in some good code cleanup.

## Submission

When your code is ready please make please make a private gist and include any of the key file changes for us that you've done.  This will be multiple files given the nature of the questions.

## Setup

This project uses a rails backend and a react / mobx-state-tree front end.
For details on rails:

- https://guides.rubyonrails.org/
  For details on mobx-state-tree:
- https://mobx-state-tree.js.org/intro/welcome
- https://github.com/mobxjs/mobx-state-tree

If you need to set up ruby:

- To run this you will need to ensure you have the right version of ruby installed (2.6.5), it may be useful to install rbenv to manage your ruby version (https://github.com/rbenv/rbenv)
- Once it has been installed you can run 'gem install bundler' to ensure you can download all the gems for the project.

If you need to set up node:

- To run this you will want node 12.x or higher. It may be useful to install n to manage your node version. (https://github.com/tj/n)
- Once installed you can run 'yarn' to install the packages required.

If you are on a windows environment you may want to use a virtual machine:

- https://gorails.com/guides/using-vagrant-for-rails-development

The sample project uses sql lite which should not require other dependencies. You will need the following steps to set up the project in terminal:

```
bundle install
yarn
bundle exec rails db:create db:migrate
bundle exec raild db:seed
```

Once that is complete, you can run the app by startng the rails app:

```
bundle exec rails s
```

For hot reloading, it would be best to run webpacker in a separate window:

```
bin/webpack-dev-server
```

Now if you go to localhost:3000 you should be off to the races.



