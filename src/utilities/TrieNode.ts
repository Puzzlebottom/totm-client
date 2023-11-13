export default class TrieNode {
  children: Record<string, TrieNode>;

  val: string;

  char: string;

  constructor(val = '', char = '') {
    this.val = val;
    this.children = {};
    this.char = char;
  }
}
