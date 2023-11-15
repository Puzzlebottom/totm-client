import TrieNode from './TrieNode';

export default class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let curNode = this.root;
    word
      .toLowerCase()
      .split('')
      .forEach((w, i) => {
        const isFinalChar = i === word.length - 1;
        const hasNode = curNode.children[w];
        if (hasNode) {
          curNode = hasNode;
        } else {
          // add a new node to curNode children.
          const newNode = new TrieNode('', w);
          curNode.children[w] = newNode;
          curNode = newNode;
        }
        if (isFinalChar) {
          curNode.val = word.toLowerCase();
        }
      });
  }

  search(word: string): boolean {
    let curNode = this.root;
    const array = word.split('');
    let i = 0;
    while (i < array.length) {
      const w = array[i];
      curNode = curNode.children[w];
      if (curNode === undefined) {
        return false;
      }
      i += 1;
    }
    return curNode.val === word;
  }

  startsWith(prefix: string): boolean {
    let curNode = this.root;
    const array = prefix.split('');
    let i = 0;
    while (i < array.length) {
      const w = array[i];
      curNode = curNode.children[w];
      i += 1;
    }
    return curNode
      ? curNode.val === prefix || Object.keys(curNode.children).length > 0
      : false;
  }

  findSuggestions(prefix: string): string[] {
    let node = this.root;
    const suggestions: string[] = [];
    for (let i = 0; i < prefix.length; i += 1) {
      const char = prefix[i];
      const nextNode = node.children[char];
      if (nextNode) {
        node = nextNode;
      } else {
        return suggestions;
      }
    }
    this.findAllWords(node, suggestions);
    return suggestions.sort(
      (a, b) => a.length - b.length || a.localeCompare(b)
    );
  }

  findAllWords(node: TrieNode, array: string[]): void {
    if (node.val) {
      array.unshift(node.val);
    }

    Object.values(node.children).forEach((child) => {
      this.findAllWords(node.children[child.char], array);
    });
  }
}
