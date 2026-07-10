# DND Website

## Running Locally
If using VS Code open the docker container using the Dev Containers extension F1 -> Rebuild and Reopen in Container.

To run the server locally use `bundle exec jekyll serve`, if there are missing bundles use `bundle install` then try again. The server should automatically restart when a file is changed, but doesn't always so it is safer to stop and rerun the command manually.

## Adding articles
Any .md file is automatically converted into a .html version by jekyll, `test.md` (output at localhost:[PORT]/test.html) contains examples for supported formatting.

The top of a md file must define the layout it uses, these are found in `/_layouts`. The layouts use the yml files in `/data` to populate the navigation links at the top.

Add images to `/assets` folder if needed.

If new css is needed add it as a separate file in `/assets/css` and include it in your layout.