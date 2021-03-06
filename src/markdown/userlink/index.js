import syntax from 'markdown/userlink/micromark-userlink';
import { fromMarkdown } from 'markdown/userlink/mdast-userlink';
import { add } from 'markdown/utils';
import visit from 'unist-util-visit';

function userlink(options = {}) {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);

  function visitor(node) {
    options.callback(node.value);
  }

  if (typeof options.callback === 'function') {
    return (tree) => visit(tree, 'userlink', visitor);
  }
  return false;
}

export default userlink;
