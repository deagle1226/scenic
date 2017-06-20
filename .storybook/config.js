import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

function loadStories() {
  require('../src/stories');
}

setOptions({
  name: 'Scenic',
  url: 'https://scenic-deagle1226.c9users.io',
})

configure(loadStories, module);
