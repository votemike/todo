# Tah-Do

## About Tah-Do
Tah-Do is a todo list with a difference. Tah-Do helps you prioritise your items with impact vs effort.

### How to use
* Type your item in to the box provided. When adding each item, also specify the effort each item will take to complete along with the impact each item will have. (Do not store sensitive information)
* Click "Add".
* Keep adding all your items. When you are ready to prioritise the list, click "Prioritise".
* Start working through your items, starting at the top of the list.
* To remove an item, click the red "X" to the right of it.
* Keep adding and removing items to your heart's content. After the first time you've loaded the page, it even works offline.

#### Importing public GitHub issues
* Click "Import public GitHub issues"
* In the field, enter the username and repo of the issues you'd like to import e.g. "votemike/todo" (this _must_ be public)
* One by one, each item will be entered in to the app, choose the effort and impact, then the next item will appear

#### Importing from Jira
* When viewing your list of issues in Jira, export them as a CSV. Be sure to include the "Issue Key" and "Summary" fields
* Click "Import from Jira CSV"
* Click "Choose file" and choose your file
* One by one, each item will be entered in to the app, choose the effort and impact, then the next item will appear

### Troubleshooting
* **The "Prioritise" button isn't showing**: The "Prioritise" button only shows when your list is not in priority order.
* **When exporting the graph, there are no labels**: Click "Show Settings", then "Show Labels", then "Save". Then try exporting again.
* For any other issues, [tweet me](https://twitter.com/OfficialGwynne) or [open a GitHub issue](https://github.com/votemike/todo/issues/new)

### Tips
* If you would like to link to Tah-Do but would like to use different words for Impact or Effort, you can append modifiers to the URL of the link you share (e.g. https://tahdo.app/?negative=Cost&positive=Benefit or https://tahdo.app/?negative=Risk&positive=Reward).

## Running locally
* Clone the repo
* cd in to the directory
* Run `yarn install`
* Run `yarn start`

The server should start and the app should now be running at [http://localhost:3000](http://localhost:3000)
